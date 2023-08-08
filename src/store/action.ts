import { createAction } from '@reduxjs/toolkit';
import { OfferType } from '../components/types/offer';
import { FullOfferType } from '../components/types/full-offer';
import { AuthorizationStatus } from '../const';
import { ReviewType } from '../components/types/review';

export const setActiveCity = createAction('setActiveCity', (city: string) => ({ payload: city }));

export const setSortType = createAction('setSortType', (sortType: string) => ({ payload: sortType }));

export const setOffers = createAction('setOffers', (offers: OfferType[]) => ({ payload: offers }));

export const setActiveId = createAction('setActiveId', (activeId: string) => ({ payload: activeId }));

export const loadOffers = createAction('loadOffers', (offers: OfferType[]) => ({ payload: offers }));

export const loadOffer = createAction('loadOffer', (offer: FullOfferType | null) => ({ payload: offer }));

export const setAuthorization = createAction('requireAuthorization', (authorizationStatus: AuthorizationStatus) => ({ payload: authorizationStatus }));

export const setOfferLoadStatus = createAction('setOfferLoadingStatus', (status: boolean) => ({ payload: status }));

export const setOffersLoadStatus = createAction('setOffersLoadingStatus', (status: boolean) => ({ payload: status }));

export const loadNearbyOffers = createAction('loadNearbyOfffers', (nearbyOffers: OfferType[]) => ({ payload: nearbyOffers }));

export const setNearbyOffersLoadStatus = createAction('setNearbyOffersLoadingStatus', (status: boolean) => ({ payload: status }));

export const loadReviews = createAction('loadReviews', (reviews: ReviewType[]) => ({ payload: reviews }));

export const setReviewsLoadStatus = createAction('setReviewsLoadStatus', (status: boolean) => ({ payload: status }));

export const sortOffersByLowPrice = createAction('sortOffersByLowPrice');

export const sortOffersByHighPrice = createAction('sortOffersByHighPrice');

export const sortOffersByTopRated = createAction('sortOffersByTopRated');

export const setError = createAction('setError', (error: string | null) => ({ payload: error }));
