import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '../hooks/useAppDispatch/useAppDispatch';
import { State } from '../hooks/useAppSelector/useAppSelector';
import { OfferType } from '../components/types/offer';
import { FullOfferType } from '../components/types/full-offer';
import { redirectToRoute } from './actions';
import {
  setOffers, setOffersBackup, setOffersLoadStatus, setFullOffer,
  setFullOfferLoadStatus, setFavOffers, setFavOffersLoadStatus, sortOffers, setError
} from './offers-process/offers-process';
import { setNearbyOffers, setNearbyOffersLoadStatus } from './nearby-offers-process/nearby-offers-process';
import { setReviews, setReviewsLoadStatus, setCommentPostStatus } from './comments-process/comments-process';
import { setUserData } from './user-process.ts/user-process';
import { APIRoute, AppRoute } from '../const';
import { ReviewType } from '../components/types/review';
import { saveToken, dropToken } from '../services/token';
import { getRandomUniqueValuesFromArray } from '../utils';
import { NUMBER_OF_NEARBY_OFFERS, SHOWABLE_COMMENTS } from '../const';
import { toast } from 'react-toastify';

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

export type FavData = {
  id: string;
  status: 0 | 1;
};

export type UserData = {
  avatarUrl: string;
  email: string;
  token: string;
  password: string;
};

export const fetchOffers = createAsyncThunk<void, undefined, thunkObjType>(
  'offers/fetchOffers',
  async (_arg, { dispatch, getState, extra: api }) => {
    try {
      dispatch(setOffersLoadStatus(true));
      const { data } = await api.get<OfferType[]>(APIRoute.Offers);
      dispatch(setOffers(data));
      dispatch(setOffersBackup(data));
      const sortType = getState().OFFERS.activeSortType;
      dispatch(sortOffers(sortType));
      dispatch(setError(false));
    } catch {
      dispatch(setError(true));
    } finally {
      dispatch(setOffersLoadStatus(false));
    }
  }
);

export const fetchFullOffer = createAsyncThunk<void, { id: string | undefined }, thunkObjType>(
  'offers/fetchOffer',
  async ({ id }, { dispatch, extra: api }) => {
    try {
      dispatch(setFullOfferLoadStatus(true));
      const url = id !== undefined ? `${APIRoute.Offers}/${id}` : '';
      const { data } = await api.get<FullOfferType>(url);
      dispatch(setFullOffer(data));
      dispatch(setFullOfferLoadStatus(false));
    } catch {
      toast.error('Offer is not available, please try again');
    }
  }
);

export const fetchNearbyOffers = createAsyncThunk<void, { id: string | undefined }, thunkObjType>(
  'offers/fetchNearbyOffers',
  async ({ id }, { dispatch, extra: api }) => {
    try {
      dispatch(setNearbyOffersLoadStatus(true));
      const url = id !== undefined ? `${APIRoute.Offers}/${id}/nearby` : '';
      const { data } = await api.get<OfferType[]>(url);
      const nearbyOffers = getRandomUniqueValuesFromArray(data, NUMBER_OF_NEARBY_OFFERS);
      dispatch(setNearbyOffers(nearbyOffers));
      dispatch(setNearbyOffersLoadStatus(false));
    } catch {
      toast.error('Nearby offers are not available, please try again');
    }
  }
);

export const fetchReviews = createAsyncThunk<void, { id: string | undefined }, thunkObjType>(
  'comments/fetchReviews',
  async ({ id }, { dispatch, extra: api }) => {
    try {
      dispatch(setReviewsLoadStatus(true));
      const url = id !== undefined ? `${APIRoute.Comments}/${id}` : '';
      const { data } = await api.get<ReviewType[]>(url);
      const filteredReviews = data.slice(SHOWABLE_COMMENTS).reverse();
      dispatch(setReviews(filteredReviews));
      dispatch(setReviewsLoadStatus(false));
    } catch {
      toast.error('Reviews are not available, please try again');
    }
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
    dispatch(checkAuth());
    dispatch(fetchOffers());
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
  'comments/postComment',
  async ({ id, comment, rating }, { dispatch, extra: api }) => {
    try {
      dispatch(setCommentPostStatus(true));
      const url = `${APIRoute.Comments}/${id}`;
      await api.post<CommentData>(url, { comment, rating });
    } catch {
      toast.error('You can\'t post comment now, please try again later');
    } finally {
      dispatch(setCommentPostStatus(false));
    }
  }
);

export const changeFavStatus = createAsyncThunk<void, FavData, thunkObjType>(
  'offers/changeFavStatus',
  async ({ id, status }, { dispatch, extra: api }) => {
    try {
      const url = `${APIRoute.Favorite}/${id}/${status}`;
      await api.post(url);
      dispatch(fetchOffers());
    } catch {
      toast.error('You can\'t change status now, please try again later');
    }
  }
);

export const fetchFavOffers = createAsyncThunk<void, undefined, thunkObjType>(
  'offers/fetchFavOffers',
  async (_arg, { dispatch, extra: api }) => {
    try {
      dispatch(setFavOffersLoadStatus(true));
      const { data: favoriteOffers } = await api.get<OfferType[]>(APIRoute.Favorite);
      dispatch(setFavOffers(favoriteOffers));
    } catch {
      toast.error('Favorite places are not available, please try again later');
    } finally {
      dispatch(setFavOffersLoadStatus(false));
    }
  }
);
