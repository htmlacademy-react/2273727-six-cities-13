import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthStatusValuesType, AuthStatus, NameSpace } from '../../const';
import { UserData, checkAuth, login, logout } from '../api-actions';


type UserProcessType = {
  authorizationStatus: AuthStatusValuesType;
  userData: UserData | null;
}

export const initialState: UserProcessType = {
  authorizationStatus: AuthStatus.Unknown,
  userData: null,
};

export const userProcessSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserData>) => {
      state.userData = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuth.fulfilled, (state) => {
        state.authorizationStatus = AuthStatus.Auth;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authorizationStatus = AuthStatus.NoAuth;
      })
      .addCase(login.fulfilled, (state) => {
        state.authorizationStatus = AuthStatus.Auth;
      })
      .addCase(login.rejected, (state) => {
        state.authorizationStatus = AuthStatus.NoAuth;
      })
      .addCase(logout.fulfilled, (state) => {
        state.authorizationStatus = AuthStatus.NoAuth;
      });
  }
});

export const { setUserData } = userProcessSlice.actions;
