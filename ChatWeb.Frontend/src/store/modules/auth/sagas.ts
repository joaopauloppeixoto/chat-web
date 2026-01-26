import { takeLatest, call, put, all } from 'redux-saga/effects';
import { signInRequest, signInSuccess, signInFailure } from './actions';
import api from '../../../services/api';

function* signIn({ payload }: ReturnType<typeof signInRequest>) {
  try {
    const { email, password } = payload;

    const response: { data: { token: string } } = yield call(api.post, 'auth/login', { email, password });

    const { token } = response.data;

    yield put(signInSuccess({ token }));

    // history.push('/dashboard');

  } catch (err) {
    yield put(signInFailure());
    alert('Erro no login, verifique seus dados!');
  }
}

export default all([
  takeLatest(signInRequest.type, signIn),
]);