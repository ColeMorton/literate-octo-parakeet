import { call, put, select, takeLatest, fork } from "redux-saga/effects";
import { LOGIN, LOGOUT } from "containers/App/constants";
import { loginSuccess, loginError } from "containers/App/actions";
import { client_id } from "config";

export function* login({ api }, { email, password }) {
  console.log("login");
  console.log("api", api);

  try {
    const body = {
      grant_type: "password",
      client_id,
      username: email,
      password
    };

    // console.log("fetching token...");
    // const { access_token, refresh_token, created_at, expires_in } = yield call(
    //   [api, api.post],
    //   `/oauth/token/`,
    //   body
    // );

    //TODO: remove mock
    const [access_token, refresh_token, created_at, expires_in] = [
      "abc123",
      undefined,
      Date.now(),
      undefined
    ];
    console.log("token received", access_token);

    yield call([api, api.setToken], access_token);
    console.log("token set", api.settings.headers);

    // const refreshAfter = yield call(getRefreshAfter, created_at, expires_in);
    // console.log("refreshAfter", refreshAfter);

    // yield call([api, api.setRefreshToken], refresh_token, refreshAfter);
    // console.log("refreshtoken set", api.authentication);

    yield put(loginSuccess());
  } catch (err) {
    yield put(loginError(err));
  }
  return true;
}

export function* watchLogin({ api }) {
  yield takeLatest(LOGIN, login, { api });
}

export function* logout({ api }) {
  console.log("logout");
  console.log("api", api);

  try {
    yield call([api, api.unsetToken]);
    console.log("token unset", api.settings.headers);
  } catch (e) {}
}

export function* watchLogout({ api }) {
  yield takeLatest(LOGOUT, logout, { api });
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* root(services) {
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield fork(watchLogin, services);
  yield fork(watchLogout, services);
}
