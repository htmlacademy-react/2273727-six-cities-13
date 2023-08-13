import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '../hooks/useAppDispatch/useAppDispatch';
import { State } from '../hooks/useAppSelector/useAppSelector';
import { OfferType } from '../components/types/offer';
import { FullOfferType } from '../components/types/full-offer';
import { redirectToRoute } from './actions';
import { setOffers, setOffersBackup, setOffersLoadStatus, setFullOffer, setFullOfferLoadStatus } from './offers-process/offers-process';
import { setNearbyOffers, setNearbyOffersLoadStatus } from './nearby-offers-process/nearby-offers-process';
import { setReviews, setReviewsLoadStatus, setCommentPostStatus } from './comments-process/comments-process';
import { setUserData } from './user-process.ts/user-process';
import { APIRoute, AppRoute } from '../const';
import { ReviewType } from '../components/types/review';
import { saveToken, dropToken } from '../services/token';
import { getRandomUniqueValuesFromArray } from '../utils';
import { NUMBER_OF_NEARBY_OFFERS } from '../const';

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
  'offers/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersLoadStatus(true));
    const { data } = await api.get<OfferType[]>(APIRoute.Offers);
    dispatch(setOffers(data));
    dispatch(setOffersBackup(data));
    dispatch(setOffersLoadStatus(false));
  }
);

export const fetchFullOffer = createAsyncThunk<void, { id: string | undefined }, thunkObjType>(
  'offers/fetchOffer',
  async ({ id }, { dispatch, extra: api }) => {
    dispatch(setFullOfferLoadStatus(true));
    const url = id !== undefined ? `${APIRoute.Offers}/${id}` : '';
    const { data } = await api.get<FullOfferType>(url);
    dispatch(setFullOffer(data));
    dispatch(setFullOfferLoadStatus(false));
  }
);

export const fetchNearbyOffers = createAsyncThunk<void, { id: string | undefined }, thunkObjType>(
  'fetchNearbyOffers',
  async ({ id }, { dispatch, extra: api }) => {
    dispatch(setNearbyOffersLoadStatus(true));
    const url = id !== undefined ? `${APIRoute.Offers}/${id}/nearby` : '';
    const { data } = await api.get<OfferType[]>(url);
    const nearbyOffers = getRandomUniqueValuesFromArray(data, NUMBER_OF_NEARBY_OFFERS);
    dispatch(setNearbyOffers(nearbyOffers));
    dispatch(setNearbyOffersLoadStatus(false));
  }
);

export const fetchReviews = createAsyncThunk<void, { id: string | undefined }, thunkObjType>(
  'fetchReviews',
  async ({ id }, { dispatch, extra: api }) => {
    dispatch(setReviewsLoadStatus(true));
    const url = id !== undefined ? `${APIRoute.Comments}/${id}` : '';
    const { data } = await api.get<ReviewType[]>(url);
    dispatch(setReviews(data));
    dispatch(setReviewsLoadStatus(false));
  }
);

export const checkAuth = createAsyncThunk<void, undefined, thunkObjType>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<UserData>(APIRoute.Login);
    dispatch(setUserData(data));
  }
);

export const login = createAsyncThunk<void, AuthData, thunkObjType>(
  'user/login',
  async ({ email, password }, { dispatch, extra: api }) => {
    const { data: { token } } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(token);
    dispatch(redirectToRoute(AppRoute.Root));
  }
);

export const logout = createAsyncThunk<void, undefined, thunkObjType>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
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
