import { stringify } from "query-string";
import merge from "lodash/merge";
import { apiUrl } from "../../config";

export const checkStatus = response => {
  console.log("checkStatus", response);
  if (response.ok) {
    return response;
  }
  const error = new Error(`${response.status} ${response.statusText}`);
  error.response = response;
  throw error;
};

export const parseJSON = response => response.json();

export const parseSettings = ({
  method = "get",
  data,
  locale,
  ...otherSettings
} = {}) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
    // "Accept-Language": locale
  };
  const settings = merge(
    {
      body: data ? JSON.stringify(data) : undefined,
      method,
      headers,

      //TODO: should remove to enforce cors
      mode: "no-cors"
    },
    otherSettings
  );
  return settings;
};

export const parseEndpoint = (endpoint, params) => {
  const url = endpoint.indexOf("http") === 0 ? endpoint : apiUrl + endpoint;
  const querystring = params ? `?${stringify(params)}` : "";
  return `${url}${querystring}`;
};

const TIMEFRAME = 300;
export const getRefreshAfter = (createdAt, expiresIn, timeframe = TIMEFRAME) =>
  createdAt + expiresIn - timeframe;

const api = {};

api.request = (endpoint, { params, ...settings } = {}) => {
  console.log("api.request");
  console.log("endpoint", endpoint);
  console.log("endpoint(parsed)", parseEndpoint(endpoint, params));
  console.log("params", params);
  console.log("settings", settings);
  console.log("settings(parsed)", parseSettings(settings));

  return fetch(parseEndpoint(endpoint, params), parseSettings(settings))
    .then(checkStatus)
    .then(parseJSON);
};

api.requestNewToken = (refreshToken, settings) =>
  api.request(
    `/oauth/token/`,
    merge({}, settings, {
      grant_type: "refresh_token",
      refresh_token: refreshToken
    })
  );

["delete", "get"].forEach(method => {
  api[method] = (endpoint, settings) =>
    api.request(endpoint, { method, ...settings });
});

["post", "put", "patch"].forEach(method => {
  api[method] = (endpoint, data, settings) =>
    api.request(endpoint, { method, data, ...settings });
});

api.create = (settings = {}) => ({
  settings,

  setToken(token) {
    this.settings.headers = {
      ...this.settings.headers,
      Authorization: `Bearer ${token}`
    };
  },

  unsetToken() {
    this.settings.headers = {
      ...this.settings.headers,
      Authorization: undefined
    };
    this.authentication = undefined;
  },

  setRefreshToken(refreshToken, refreshAfter) {
    this.authentication = {
      refreshToken,
      refreshAfter
    };
  },

  async request(endpoint, settings) {
    const checkIfShouldFetchNewToken = async () => {
      const shouldFetchNewToken =
        parseInt(Date.now() / 1000) > this.authentication.refreshAfter;
      if (!shouldFetchNewToken) return;

      const {
        access_token,
        refresh_token,
        created_at,
        expires_in
      } = await api.requestNewToken(
        this.settings,
        this.authentication.refreshToken
      );
      console.log("new token received", {
        access_token,
        refresh_token,
        created_at,
        expires_in
      });

      const refreshAfter = getRefreshAfter(created_at, expires_in);
      console.log("refreshAfter", refreshAfter);

      this.setToken(access_token);
      this.setRefreshToken(refresh_token, refreshAfter);
    };

    try {
      if (this.authentication) await checkIfShouldFetchNewToken();
      return api.request(endpoint, merge({}, this.settings, settings));
    } catch (e) {
      return e;
    }
  },

  post(endpoint, data, settings) {
    return this.request(endpoint, { method: "post", data, ...settings });
  },

  get(endpoint, settings) {
    return this.request(endpoint, { method: "get", ...settings });
  },

  put(endpoint, data, settings) {
    return this.request(endpoint, { method: "put", data, ...settings });
  },

  patch(endpoint, data, settings) {
    return this.request(endpoint, { method: "patch", data, ...settings });
  },

  delete(endpoint, settings) {
    return this.request(endpoint, { method: "delete", ...settings });
  }
});

export default api;
