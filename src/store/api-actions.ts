import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '../hooks/useAppDispatch/useAppDispatch';
import { State } from '../hooks/useAppSelector/useAppSelector';
import { OfferType } from '../components/types/offer';
import { FullOfferType } from '../components/types/full-offer';
import {
  loadOffers, loadOffersBackup, loadOffer, setOfferLoadStatus, setOffersLoadStatus,
  setNearbyOffersLoadStatus, loadNearbyOffers, setReviewsLoadStatus,
  loadReviews, setAuthorization, redirectToRoute, setCommentPostStatus
} from './actions';
import { APIRoute, AuthStatus, AppRoute } from '../const';
import { ReviewType } from '../components/types/review';
import { saveToken, dropToken } from '../services/token';

type thunkObjType = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}

export type AuthData = {
  email: string;
  password: string;
};

export type CommentData = {
  id: string;
  comment: string;
  rating: number;
};


export type UserData = {
  password: string;
  email: string;
  token: string;
};

export const fetchOffers = createAsyncThunk<void, undefined, thunkObjType>(
  'fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersLoadStatus(true));
    const { data } = await api.get<OfferType[]>(APIRoute.Offers);
    dispatch(loadOffers(data));
    dispatch(loadOffersBackup(data));
    dispatch(setOffersLoadStatus(false));
  }
);

export const fetchOffer = createAsyncThunk<void, { id: string | undefined }, thunkObjType>(
  'fetchOffer',
  async ({ id }, { dispatch, extra: api }) => {
    dispatch(setOfferLoadStatus(true));
    const url = id !== undefined ? `${APIRoute.Offers}/${id}` : '';
    const { data } = await api.get<FullOfferType>(url);
    dispatch(loadOffer(data));
    dispatch(setOfferLoadStatus(false));
  }
);

export const fetchNearbyOffers = createAsyncThunk<void, { id: string | undefined }, thunkObjType>(
  'fetchNearbyOffers',
  async ({ id }, { dispatch, extra: api }) => {
    dispatch(setNearbyOffersLoadStatus(true));
    const url = id !== undefined ? `${APIRoute.Offers}/${id}/nearby` : '';
    const { data } = await api.get<OfferType[]>(url);
    dispatch(loadNearbyOffers(data));
    dispatch(setNearbyOffersLoadStatus(false));
  }
);

export const fetchReviews = createAsyncThunk<void, { id: string | undefined }, thunkObjType>(
  'fetchReviews',
  async ({ id }, { dispatch, extra: api }) => {
    dispatch(setReviewsLoadStatus(true));
    const url = id !== undefined ? `${APIRoute.Comments}/${id}` : '';
    const { data } = await api.get<ReviewType[]>(url);
    dispatch(loadReviews(data));
    dispatch(setReviewsLoadStatus(false));
  }
);

export const checkAuth = createAsyncThunk<void, undefined, thunkObjType>(
  'checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(setAuthorization(AuthStatus.Auth));
    } catch {
      dispatch(setAuthorization(AuthStatus.NoAuth));
    }
  }
);

export const login = createAsyncThunk<void, AuthData, thunkObjType>(
  'user/login',
  async ({ email, password }, { dispatch, extra: api }) => {
    const { data: { token } } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(token);
    dispatch(setAuthorization(AuthStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Root));
  }
);

export const logout = createAsyncThunk<void, undefined, thunkObjType>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(setAuthorization(AuthStatus.NoAuth));
  }
);

export const postComment = createAsyncThunk<void, CommentData, thunkObjType>(
  'comment',
  async ({ id, comment, rating }, { dispatch, extra: api }) => {
    dispatch(setCommentPostStatus(true));
    const url = `${APIRoute.Comments}/${id}`;
    await api.post<CommentData>(url, { comment, rating });
    dispatch(setCommentPostStatus(false));
  }
);
