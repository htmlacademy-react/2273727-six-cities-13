import { InitialStateType } from './reducer';

export const activeCity = (state: InitialStateType) => state.activeCity;

export const offers = (state: InitialStateType) => state.offers;

export const fullOffer = (state: InitialStateType) => state.fullOffer;

export const activeId = (state: InitialStateType) => state.activeId;

export const activeSortType = (state: InitialStateType) => state.activeSortType;

export const authorizationStatus = (state: InitialStateType) => state.authorizationStatus;

export const isOfferLoading = (state: InitialStateType) => state.isOfferLoading;

export const isOffersLoading = (state: InitialStateType) => state.isOffersLoading;

export const nearbyOffers = (state: InitialStateType) => state.nearbyOffers;

export const isNearbyOffersLoading = (state: InitialStateType) => state.isNearbyOffersLoading;

export const reviews = (state: InitialStateType) => state.reviews;

export const isReviewsLoading = (state: InitialStateType) => state.isReviewsLoading;

export const isCommentPosting = (state: InitialStateType) => state.isCommentPosting;
