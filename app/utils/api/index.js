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

  //async funcs receive { endpoint, body }
  requestInterceptors: [],

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
  },

  async request(endpoint, body) {
    try {
      const bodyComplete = { ...this.settings, ...body };
      await this.interceptRequest(endpoint, bodyComplete);
      return api.request(endpoint, bodyComplete);
    } catch (e) {
      return e;
    }
  },

  async requestNewToken(refreshToken) {
    return api.requestNewToken(refreshToken, this.settings);
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
  },

  attachRequestInterceptor(handler) {
    this.requestInterceptors.push(handler);
  },

  async interceptRequest(endpoint, body) {
    await Promise.all(
      this.requestInterceptors.map(interceptor =>
        interceptor({ endpoint, body })
      )
    );
  }
});

export default api;
