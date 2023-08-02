import { createReducer } from '@reduxjs/toolkit';
import { setActiveCity, setSortType, setOffers } from './action';
import { OfferType } from '../components/types/offer';
import { offers } from '../mocks/offers';

export type InitialStateType = {
  activeCity: string | undefined;
  offers: OfferType[];
  activeSortType: string;
}

const initialState: InitialStateType = {
  activeCity: 'Paris',
  offers: offers,
  activeSortType: 'Popular'
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setActiveCity, (state, action) => {
      state.activeCity = action.payload;
    })
    .addCase(setSortType, (state, action) => {
      state.activeSortType = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    });
});
