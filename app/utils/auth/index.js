import { client_id } from "config";

const TIMEFRAME = 300;
const STORAGE_KEY = "session";

export const getRefreshAfter = (createdAt, expiresIn, timeframe = TIMEFRAME) =>
  createdAt + expiresIn - timeframe;

export const mapSessionResponse = ({
  access_token,
  refresh_token,
  created_at,
  expires_in
}) => ({
  accessToken: access_token,
  refreshToken: refresh_token,
  createdAt: created_at,
  expiresIn: expires_in
});

export const checkIfShouldFetchNewToken = auth => async ({
  endpoint,
  body
}) => {
  const { createdAt, expiresIn, refreshToken } = auth.getSession();

  const refreshAfter =
    createdAt !== undefined && expiresIn !== undefined
      ? getRefreshAfter(createdAt, expiresIn)
      : false;
  if (!refreshAfter) return;

  const shouldFetchNewToken = parseInt(Date.now() / 1000) > refreshAfter;
  if (!shouldFetchNewToken) return;

  const newSession = await api.requestNewToken(refreshToken);
  auth.newSession(newSession);
};

const Auth = {};

Auth.create = ({ api }) => {
  const auth = {
    async newSession(username, password) {
      const body = {
        grant_type: "password",
        client_id,
        username,
        password
      };

      console.log("fetching token...");
      // const session = mapSessionResponse(await api.post(`/oauth/token/`, body));
      const session = {
        accessToken: "abc-" + Date.now(),
        refreshToken: undefined,
        createdAt: Date.now(),
        expiresIn: undefined
      };

      await this.setSession(session);
    },

    endSession() {
      localStorage.removeItem(STORAGE_KEY);
      api.unsetToken();
    },

    importSession() {
      console.log("importSession");

      const session = this.getSession();
      if (!session) return false;
      if (session.expiresIn < Date.now()) {
        this.endSession();
      } else {
        this.setSession(session);
      }
    },

    getSession() {
      return JSON.parse(localStorage.getItem(STORAGE_KEY));
    },

    async setSession(session) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
      console.log("session set", this.getSession());

      await api.setToken(session.accessToken);
      console.log("token set", api.settings.headers);
    }
  };

  api.attachRequestInterceptor(checkIfShouldFetchNewToken(auth));

  return auth;
};

export default Auth;
