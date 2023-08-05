import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '../hooks/useAppDispatch/useAppDispatch';
import { State } from '../hooks/useAppSelector/useAppSelector';
import { OfferType } from '../components/types/offer';
import { FullOfferType } from '../components/types/full-offer';
import { loadOffers, loadOffer, requireAuthorization, setOfferLoadingStatus } from './action';
import { APIRoute, AuthorizationStatus } from '../const';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<OfferType[]>(APIRoute.Offers);
    dispatch(loadOffers(data));
  }
);

export const fetchOfferAction = createAsyncThunk<void, { id: string | undefined }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchOffer',
  async ({ id }, { dispatch, extra: api }) => {
    dispatch(setOfferLoadingStatus(true));
    const url = id !== undefined ? `${APIRoute.Offers}/${id}` : '';
    const { data } = await api.get<FullOfferType>(url);
    dispatch(setOfferLoadingStatus(false));
    dispatch(loadOffer(data));
  }
);
