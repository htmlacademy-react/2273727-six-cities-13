import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { OfferType } from '../../components/types/offer';

type NearbyOffersProcessType = {
  nearbyOffers: OfferType[] | null;
  isNearbyOffersLoading: boolean;
};

const initialState: NearbyOffersProcessType = {
  nearbyOffers: null,
  isNearbyOffersLoading: false,
};

export const nearbyOffersProcessSlice = createSlice({
  name: NameSpace.NearbyOffers,
  initialState,
  reducers: {
    setNearbyOffers: (state, action: PayloadAction<OfferType[]>) => {
      state.nearbyOffers = action.payload;
    },
    setNearbyOffersLoadStatus: (state, action: PayloadAction<boolean>) => {
      state.isNearbyOffersLoading = action.payload;
    }
  }
});

export const {setNearbyOffers, setNearbyOffersLoadStatus} = nearbyOffersProcessSlice.actions;
