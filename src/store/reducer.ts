import { createReducer } from '@reduxjs/toolkit';
import { changeCity, getOffers } from './action';
import { OfferType } from '../components/types/offer';

export type InitialStateType = {
  city: string;
  offers: OfferType[];
}

const initialState: InitialStateType = {
  city: '',
  offers: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state) => {
      state.city = changeCity.payload;
    })
    .addCase(getOffers, (state) => {
      state.offers = getOffers.payload;
    });
});
