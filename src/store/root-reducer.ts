import { userProcessSlice } from './user-process.ts/user-process';
import { offersProcessSlice } from './offers-process/offers-process';
import { nearbyOffersProcessSlice } from './nearby-offers-process/nearby-offers-process';
import { commentsProcessSlice } from './comments-process/comments-process';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  [userProcessSlice.name]: userProcessSlice.reducer,
  [offersProcessSlice.name]: offersProcessSlice.reducer,
  [nearbyOffersProcessSlice.name]: nearbyOffersProcessSlice.reducer,
  [commentsProcessSlice.name]: commentsProcessSlice.reducer,
});
