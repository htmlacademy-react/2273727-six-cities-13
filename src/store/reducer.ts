import { createReducer } from '@reduxjs/toolkit';
import { setActiveCity, setSortType, setOffers, setFullOffer, loadOffers, loadOffer, requireAuthorization, setActiveId, setOfferLoadingStatus, setOffersLoadingStatus } from './action';
import { OfferType } from '../components/types/offer';
import { FullOfferType } from '../components/types/full-offer';
import { AuthorizationStatus } from '../const';

export type InitialStateType = {
  activeCity: string | undefined;
  offers: OfferType[] | null;
  fullOffer: FullOfferType | null;
  activeId: string | null;
  activeSortType: string;
  authorizationStatus: AuthorizationStatus;
  isOfferLoading: boolean;
  isOffersLoading: boolean;
}

const initialState: InitialStateType = {
  activeCity: 'Paris',
  offers: null,
  fullOffer: null,
  activeId: null,
  activeSortType: 'Popular',
  authorizationStatus: AuthorizationStatus.Unknown,
  isOfferLoading: false,
  isOffersLoading: false,
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
    })
    .addCase(setFullOffer, (state, action) => {
      state.fullOffer = action.payload;
    })
    .addCase(setActiveId, (state, action) => {
      state.activeId = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(loadOffer, (state, action) => {
      state.fullOffer = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setOfferLoadingStatus, (state, action) => {
      state.isOfferLoading = action.payload;
    })
    .addCase(setOffersLoadingStatus, (state, action) => {
      state.isOffersLoading = action.payload;
    });
});
