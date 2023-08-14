import { NameSpace } from '../../const';
import { State } from '../../hooks/useAppSelector/useAppSelector';
import { OfferType } from '../../components/types/offer';
import { FullOfferType } from '../../components/types/full-offer';

export const getActiveCity = (state: State): string => state[NameSpace.Offers].activeCity;
export const getActiveId = (state: State): string | null => state[NameSpace.Offers].activeId;
export const getActiveSortType = (state: State): string => state[NameSpace.Offers].activeSortType;
export const getCurrentOffer = (state: State): OfferType | null => state[NameSpace.Offers].currentOffer;
export const getOffers = (state: State): OfferType[] => state[NameSpace.Offers].offers;
export const getOffersBackup = (state: State): OfferType[] | null => state[NameSpace.Offers].offersBackup;
export const getFullOffer = (state: State): FullOfferType | null => state[NameSpace.Offers].fullOffer;
export const getOffersLoadStatus = (state: State): boolean => state[NameSpace.Offers].isOffersLoading;
export const getFullOfferLoadStatus = (state: State): boolean => state[NameSpace.Offers].isFullOfferLoading;
