import authReducer from './authSlice';
import type { AuthState, User } from '../../types/types';

describe('authSlice', () => {
  const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    accessToken: null,
    status: 'idle',
    error: null,
  };

  it('должен возвращать начальное состояние', () => {
    expect(authReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('должен обрабатывать успешный вход', () => {
    const user: User = { name: 'Тест', email: 'test@test.ru' };
    const action = {
      type: 'auth/login/fulfilled',
      payload: { user, accessToken: 'token' },
    };
    const state = authReducer(initialState, action);
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual(user);
    expect(state.accessToken).toBe('token');
    expect(state.status).toBe('succeeded');
    expect(state.error).toBeNull();
  });

  it('должен обрабатывать ошибку входа', () => {
    const action = {
      type: 'auth/login/rejected',
      payload: 'Ошибка авторизации',
    };
    const state = authReducer(initialState, action);
    expect(state.isAuthenticated).toBe(false);
    expect(state.error).toBe('Ошибка авторизации');
  });

  it('должен обрабатывать выход', () => {
    const loggedState = { ...initialState, isAuthenticated: true, user: { name: 'Тест', email: 'test@test.ru' }, accessToken: 'token' };
    const action = { type: 'auth/logout/fulfilled' };
    const state = authReducer(loggedState, action);
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
    expect(state.accessToken).toBeNull();
  });
});
