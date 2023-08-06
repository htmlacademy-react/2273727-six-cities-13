import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '../hooks/useAppDispatch/useAppDispatch';
import { State } from '../hooks/useAppSelector/useAppSelector';
import { OfferType } from '../components/types/offer';
import { FullOfferType } from '../components/types/full-offer';
import { loadOffers, loadOffer, setOfferLoadStatus, setOffersLoadStatus, setNearbyOffersLoadStatus, loadNearbyOffers, setReviewsLoadStatus, loadReviews } from './action';
import { APIRoute } from '../const';
import { ReviewType } from '../components/types/review';

export const fetchOffers = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersLoadStatus(true));
    const { data } = await api.get<OfferType[]>(APIRoute.Offers);
    dispatch(loadOffers(data));
    dispatch(setOffersLoadStatus(false));
  }
);

export const fetchOffer = createAsyncThunk<void, { id: string | undefined }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchOffer',
  async ({ id }, { dispatch, extra: api }) => {
    dispatch(setOfferLoadStatus(true));
    const url = id !== undefined ? `${APIRoute.Offers}/${id}` : '';
    const { data } = await api.get<FullOfferType>(url);
    dispatch(loadOffer(data));
    dispatch(setOfferLoadStatus(false));
  }
);

export const fetchNearbyOffers = createAsyncThunk<void, { id: string | undefined }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchNearbyOffers',
  async ({ id }, { dispatch, extra: api }) => {
    dispatch(setNearbyOffersLoadStatus(true));
    const url = id !== undefined ? `${APIRoute.Offers}/${id}/nearby` : '';
    const { data } = await api.get<OfferType[]>(url);
    dispatch(loadNearbyOffers(data));
    dispatch(setNearbyOffersLoadStatus(false));
  }
);

export const fetchReviews = createAsyncThunk<void, { id: string | undefined }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchReviews',
  async ({ id }, { dispatch, extra: api }) => {
    dispatch(setReviewsLoadStatus(true));
    const url = id !== undefined ? `${APIRoute.Comments}/${id}` : '';
    const { data } = await api.get<ReviewType[]>(url);
    dispatch(loadReviews(data));
    dispatch(setReviewsLoadStatus(false));
  }
);
