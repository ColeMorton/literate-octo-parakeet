import { call, take, put, select, takeLatest, fork } from "redux-saga/effects";
import { INIT, LOG_IN, LOG_OUT } from "containers/App/constants";
import {
  logInSuccess,
  logInError,
  startSession as startSessionAction
} from "containers/App/actions";

export function* init({ auth }) {
  const user = auth.importSession();
  if (user) yield fork(startSession, { auth, user });
}

export function* watchInit({ api, auth }) {
  yield takeLatest(INIT, init, { api, auth });
}

export function* logIn({ api, auth }, { email, password }) {
  try {
    //TODO: remove
    const user = {
      name: "John Smith"
    };

    yield call([auth, auth.newSession], { email, password });
    if (!user) throw new Error("No user returned");

    yield put(logInSuccess());
    yield call(startSession, { auth, user });
  } catch (err) {
    yield put(logInError(err));
  }
}

export function* watchLogIn({ api, auth }) {
  yield takeLatest(LOG_IN, logIn, { api, auth });
}

export function* startSession({ auth, user }) {
  yield put(startSessionAction(user));
  yield take(LOG_OUT);
  yield call([auth, auth.endSession]);
}

export default function* root(services) {
  yield fork(watchInit, services);
  yield fork(watchLogIn, services);
}
