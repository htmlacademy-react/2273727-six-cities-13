import { createReducer } from '@reduxjs/toolkit';
import {
  setActiveCity, setSortType, setOffers, loadOffers, loadOffer, setAuthorization,
  setActiveId, setOfferLoadStatus, setOffersLoadStatus, loadNearbyOffers,
  loadReviews, setNearbyOffersLoadStatus, setReviewsLoadStatus, sortOffersByHighPrice,
  sortOffersByLowPrice, sortOffersByTopRated, setCommentPostStatus, loadOffersBackup
} from './actions';
import { OfferType } from '../components/types/offer';
import { FullOfferType } from '../components/types/full-offer';
import { AuthorizationStatus } from '../const';
import { ReviewType } from '../components/types/review';

export type InitialStateType = {
  activeCity: string;
  offers: OfferType[] | null;
  offersBackup: OfferType[] | null;
  fullOffer: FullOfferType | null;
  activeId: string | null;
  activeSortType: string;
  authorizationStatus: AuthorizationStatus;
  isOfferLoading: boolean;
  isOffersLoading: boolean;
  nearbyOffers: OfferType[] | null;
  isNearbyOffersLoading: boolean;
  reviews: ReviewType[] | null;
  isReviewsLoading: boolean;
  isCommentPosting: boolean;
}

const initialState: InitialStateType = {
  activeCity: 'Paris',
  offers: null,
  offersBackup: null,
  fullOffer: null,
  activeId: null,
  activeSortType: 'Popular',
  authorizationStatus: AuthorizationStatus.Unknown,
  isOfferLoading: false,
  isOffersLoading: false,
  nearbyOffers: null,
  isNearbyOffersLoading: false,
  reviews: null,
  isReviewsLoading: false,
  isCommentPosting: false,
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
    .addCase(setActiveId, (state, action) => {
      state.activeId = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(loadOffersBackup, (state, action) => {
      state.offersBackup = action.payload;
    })
    .addCase(loadOffer, (state, action) => {
      state.fullOffer = action.payload;
    })
    .addCase(setAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setOfferLoadStatus, (state, action) => {
      state.isOfferLoading = action.payload;
    })
    .addCase(setOffersLoadStatus, (state, action) => {
      state.isOffersLoading = action.payload;
    })
    .addCase(loadNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(setNearbyOffersLoadStatus, (state, action) => {
      state.isNearbyOffersLoading = action.payload;
    })
    .addCase(sortOffersByLowPrice, (state) => {
      if (state.offers === null) {
        return;
      }
      state.offers = state.offers.sort((a, b) => a.price - b.price);
    })
    .addCase(sortOffersByHighPrice, (state) => {
      if (state.offers === null) {
        return;
      }
      state.offers = state.offers.sort((a, b) => b.price - a.price);
    })
    .addCase(sortOffersByTopRated, (state) => {
      if (state.offers === null) {
        return;
      }
      state.offers = state.offers.sort((a, b) => b.rating - a.rating);
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(setReviewsLoadStatus, (state, action) => {
      state.isReviewsLoading = action.payload;
    })
    .addCase(setCommentPostStatus, (state, action) => {
      state.isCommentPosting = action.payload;
    });
});
