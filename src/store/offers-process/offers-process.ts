import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { OfferType } from '../../components/types/offer';
import { FullOfferType } from '../../components/types/full-offer';

type OffersProcessType = {
  activeCity: string;
  activeId: string | null;
  activeSortType: string;
  currentOffer: OfferType | null;
  offers: OfferType[];
  offersBackup: OfferType[] | null;
  fullOffer: FullOfferType | null;
  isFullOfferLoading: boolean;
  isOffersLoading: boolean;
}

const initialState: OffersProcessType = {
  activeCity: 'Paris',
  activeId: null,
  activeSortType: 'Popular',
  currentOffer: null,
  offers: [],
  offersBackup: null,
  fullOffer: null,
  isFullOfferLoading: false,
  isOffersLoading: false,
};

export const offersProcessSlice = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    setActiveCity: (state, action: PayloadAction<string>) => {
      state.activeCity = action.payload;
    },
    setActiveId: (state, action: PayloadAction<string | null>) => {
      state.activeId = action.payload;
    },
    setSortType: (state, action: PayloadAction<string>) => {
      state.activeSortType = action.payload;
    },
    setCurrentOffer: (state) => {
      if (state.offers !== null) {
        const foundOffer = state.offers.find((item) => item.id === state.activeId);
        state.currentOffer = foundOffer !== undefined ? foundOffer : null;
      }
    },
    setOffers: (state, action: PayloadAction<OfferType[]>) => {
      state.offers = action.payload;
    },
    setOffersBackup: (state, action: PayloadAction<OfferType[]>) => {
      state.offersBackup = action.payload;
    },
    setOffersLoadStatus: (state, action: PayloadAction<boolean>) => {
      state.isOffersLoading = action.payload;
    },
    setFullOffer: (state, action: PayloadAction<FullOfferType | null>) => {
      state.fullOffer = action.payload;
    },
    setFullOfferLoadStatus: (state, action: PayloadAction<boolean>) => {
      state.isFullOfferLoading = action.payload;
    },
    sortOffersByLowPrice: (state) => {
      if (state.offers === null) {
        return;
      }
      state.offers = state.offers.sort((a, b) => a.price - b.price);
    },
    sortOffersByHighPrice: (state) => {
      if (state.offers === null) {
        return;
      }
      state.offers = state.offers.sort((a, b) => b.price - a.price);
    },
    sortOffersByTopRated: (state) => {
      if (state.offers === null) {
        return;
      }
      state.offers = state.offers.sort((a, b) => b.rating - a.rating);
    }
  }
});

export const {setActiveCity, setActiveId, setSortType, setCurrentOffer,
  setOffers, setOffersBackup, setOffersLoadStatus, setFullOffer,
  setFullOfferLoadStatus, sortOffersByHighPrice,
  sortOffersByLowPrice, sortOffersByTopRated} = offersProcessSlice.actions;
