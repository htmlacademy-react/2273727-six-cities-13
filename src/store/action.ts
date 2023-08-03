import { createAction } from '@reduxjs/toolkit';
import { OfferType } from '../components/types/offer';
import { FullOfferType } from '../components/types/full-offer';
import { AuthorizationStatus } from '../const';

export const setActiveCity = createAction('setActiveCity', (city: string | undefined) => ({ payload: city }));

export const setSortType = createAction('setSortType', (sortType: string) => ({ payload: sortType }));

export const setOffers = createAction('getOffers', (offers: OfferType[]) => ({ payload: offers }));

export const setFullOffers = createAction('getFullOffers', (fullOffers: FullOfferType[]) => ({ payload: fullOffers }));

export const loadOffers = createAction('loadOffers', (offers: OfferType[]) => ({ payload: offers }));

export const requireAuthorization = createAction('requireAuthorization', (authorizationStatus: AuthorizationStatus) => ({ payload: authorizationStatus }));
