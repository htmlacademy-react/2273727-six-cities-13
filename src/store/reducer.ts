import { createReducer } from '@reduxjs/toolkit';
import { changeCity, getOffers } from './action';
import { OfferType } from '../components/types/offer';
import { offers } from '../mocks/offers';

export type InitialStateType = {
  city: string | undefined;
  offers: OfferType[];
}

const initialState: InitialStateType = {
  city: 'Paris',
  offers: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(getOffers, (state) => {
      state.offers = offers;
    });
});
