import { call, put, select, takeLatest, fork } from "redux-saga/effects";
import { INIT, LOGIN, LOGOUT } from "containers/App/constants";
import { loginSuccess, loginError } from "containers/App/actions";

export function* init({ auth }) {
  console.log("init", auth);

  const user = auth.importSession();
  console.log("session imported", user);

  if (user) yield put(loginSuccess(user));
}

export function* watchInit({ api, auth }) {
  yield takeLatest(INIT, init, { api, auth });
}

export function* login({ api, auth }, { email, password }) {
  console.log("login");
  console.log("api", api);

  try {
    yield call([auth, auth.newSession], { email, password });
    const user = {
      name: "John Smith"
    };

    yield put(loginSuccess(user));
  } catch (err) {
    yield put(loginError(err));
  }
}

export function* watchLogin({ api, auth }) {
  yield takeLatest(LOGIN, login, { api, auth });
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
  yield fork(watchInit, services);
  yield fork(watchLogin, services);
  yield fork(watchLogout, services);
}
