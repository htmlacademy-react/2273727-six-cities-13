import { NameSpace } from '../../const';
import { State } from '../../hooks/useAppSelector/useAppSelector';
import { OfferType } from '../../components/types/offer';

export const getNearbyOffers = (state: State): OfferType[] => state[NameSpace.NearbyOffers].nearbyOffers;
export const getNearbyOffersLoadStatus = (state: State): boolean => state[NameSpace.NearbyOffers].isNearbyOffersLoading;
