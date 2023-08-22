import { userProcessSlice, initialState } from './user-process';
import { AuthStatus } from '../../const';
import { internet } from 'faker';
import { checkAuth, login, logout } from '../api-actions';

describe('Users Process Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const result = userProcessSlice.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };

    const result = userProcessSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should set active city', () => {
    const userData = {
      avatarUrl: internet.avatar(),
      email: internet.email(),
      token: internet.password(),
      password: internet.password(),
    };

    const action = userProcessSlice.actions.setUserData(userData);

    const result = userProcessSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      userData,
    };

    expect(result).toEqual(expectedState);
  });

  it('should set AuthStatus to "Auth" when checkAuth.fulfilled', () => {
    const expectedState = {
      ...initialState,
      authorizationStatus: AuthStatus.Auth,
    };

    const result = userProcessSlice.reducer(undefined, checkAuth.fulfilled);

    expect(result).toEqual(expectedState);
  });

  it('should set AuthStatus to "NoAuth" when checkAuth.rejected', () => {
    const expectedState = {
      ...initialState,
      authorizationStatus: AuthStatus.NoAuth,
    };

    const result = userProcessSlice.reducer(undefined, checkAuth.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set AuthStatus to "Auth" when login.fulfilled', () => {
    const expectedState = {
      ...initialState,
      authorizationStatus: AuthStatus.Auth,
    };

    const result = userProcessSlice.reducer(undefined, login.fulfilled);

    expect(result).toEqual(expectedState);
  });

  it('should set AuthStatus to "NoAuth" when login.rejected', () => {
    const expectedState = {
      ...initialState,
      authorizationStatus: AuthStatus.NoAuth,
    };

    const result = userProcessSlice.reducer(undefined, login.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set AuthStatus to "NoAuth" when logout.fulfilled', () => {
    const expectedState = {
      ...initialState,
      authorizationStatus: AuthStatus.NoAuth,
    };

    const result = userProcessSlice.reducer(undefined, logout.fulfilled);

    expect(result).toEqual(expectedState);
  });
});
