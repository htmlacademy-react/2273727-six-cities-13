import { createAction } from '@reduxjs/toolkit';
import { OfferType } from '../components/types/offer';

export const setActiveCity = createAction('setActiveCity', (city: string | undefined) => ({payload: city}));

export const setSortType = createAction('setSortType', (sortType: string) => ({payload: sortType}));

export const setOffers = createAction('getOffers', (offers: OfferType[]) => ({payload: offers}));
