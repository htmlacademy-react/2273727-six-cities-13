import { createAction } from '@reduxjs/toolkit';
import { OfferType } from '../components/types/offer';

export const changeCity = createAction<{city: string}>('changeCity');

export const getOffers = createAction<{offers: OfferType[]}>('getOffers');
