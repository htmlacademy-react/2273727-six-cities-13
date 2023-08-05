import { createAction } from '@reduxjs/toolkit';
import { OfferType } from '../components/types/offer';
import { FullOfferType } from '../components/types/full-offer';
import { AuthorizationStatus } from '../const';

export const setActiveCity = createAction('setActiveCity', (city: string | undefined) => ({ payload: city }));

export const setSortType = createAction('setSortType', (sortType: string) => ({ payload: sortType }));

export const setOffers = createAction('setOffers', (offers: OfferType[]) => ({ payload: offers }));

export const setFullOffer = createAction('setFullOffer', (fullOffer: FullOfferType) => ({ payload: fullOffer }));

export const setActiveId = createAction('setActiveId', (activeId: string) => ({ payload: activeId }));

export const loadOffers = createAction('loadOffers', (offers: OfferType[]) => ({ payload: offers }));

export const loadOffer = createAction('loadOffer', (offer: FullOfferType | null) => ({ payload: offer }));

export const requireAuthorization = createAction('requireAuthorization', (authorizationStatus: AuthorizationStatus) => ({ payload: authorizationStatus }));

export const setOfferLoadingStatus = createAction('setOfferLoadingStatus', (status: boolean) => ({ payload: status }));

export const setOffersLoadingStatus = createAction('setOffersLoadingStatus', (status: boolean) => ({ payload: status }));
