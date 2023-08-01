import { createAction } from '@reduxjs/toolkit';

export const changeCity = createAction('changeCity', (city: string | undefined) => ({payload: city}));

export const getOffers = createAction('getOffers');
