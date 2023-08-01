import { createReducer } from '@reduxjs/toolkit';
import { changeCity, getOffers } from './action';
import { OfferType } from '../components/types/offer';
import { offers } from '../mocks/offers';

export type InitialStateType = {
  activeCity: string | undefined;
  offers: OfferType[];
}

const initialState: InitialStateType = {
  activeCity: 'Paris',
  offers: offers,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.activeCity = action.payload;
    })
    .addCase(getOffers, (state) => {
      state.offers = offers;
    });
});
