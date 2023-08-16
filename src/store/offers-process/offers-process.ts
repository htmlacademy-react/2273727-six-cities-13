import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, SortType, SortTypeValues } from '../../const';
import { OfferType } from '../../components/types/offer';
import { FullOfferType } from '../../components/types/full-offer';

type OffersProcessType = {
  activeCity: string;
  activeId: string | null;
  activeSortType: SortTypeValues;
  currentOffer: OfferType | null;
  offers: OfferType[];
  offersBackup: OfferType[];
  fullOffer: FullOfferType | null;
  isFullOfferLoading: boolean;
  isOffersLoading: boolean;
  favOffers: OfferType[];
  isFavOffersLoading: boolean;
}

const initialState: OffersProcessType = {
  activeCity: 'Paris',
  activeId: null,
  activeSortType: 'Popular',
  currentOffer: null,
  offers: [],
  offersBackup: [],
  fullOffer: null,
  isFullOfferLoading: false,
  isOffersLoading: true,
  favOffers: [],
  isFavOffersLoading: true,
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
    setCurrentOffer: (state) => {
      const foundOffer = state.offers.find((item) => item.id === state.activeId);
      state.currentOffer = foundOffer !== undefined ? foundOffer : null;
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
    setFavOffers: (state, action: PayloadAction<OfferType[]>) => {
      state.favOffers = action.payload;
    },
    setFavOffersLoadStatus: (state, action: PayloadAction<boolean>) => {
      state.isFavOffersLoading = action.payload;
    },
    sortOffers: (state, action: PayloadAction<SortTypeValues>) => {
      state.activeSortType = action.payload;
      switch (state.activeSortType) {
        case SortType.Popular:
          state.offers = state.offersBackup;
          break;
        case SortType.PriceToHigh:
          state.offers = state.offers.sort((a, b) => a.price - b.price);
          break;
        case SortType.PriceToLow:
          state.offers = state.offers.sort((a, b) => b.price - a.price);
          break;
        case SortType.TopRated:
          state.offers = state.offers.sort((a, b) => b.rating - a.rating);
          break;
      }
    },
  }
});

export const { setActiveCity, setActiveId, setCurrentOffer,
  setOffers, setOffersBackup, setOffersLoadStatus, setFullOffer,
  setFullOfferLoadStatus, setFavOffers, sortOffers, setFavOffersLoadStatus } = offersProcessSlice.actions;
