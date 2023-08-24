import { State } from '../../hooks/useAppSelector/useAppSelector';
import { AuthStatus } from '../../const';

export const mockStore = (initialState?: Partial<State>): State => ({
  USER: {
    authorizationStatus: AuthStatus.NoAuth,
    userData: null,
  },
  OFFERS: {
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
    hasError: false,
  },
  COMMENTS: {
    reviews: null,
    isReviewsLoading: false,
    isCommentPosting: false,
  },
  NEARBY_OFFERS: {
    nearbyOffers: [],
    isNearbyOffersLoading: false,
  },
  ...initialState ?? {},
});
