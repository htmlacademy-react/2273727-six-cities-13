import { render, screen } from '@testing-library/react';
import { AuthStatus } from '../../const';
import { Reviews } from './reviews';
import { withHistory, withStore } from '../../store/mocks/mock-component';
import { mockReviews } from '../../store/mocks/mock-reviews';

describe('Component: Reviews', () => {
  it('should render correctly', () => {
    const {withStoreComponent} = withStore(<Reviews />, {
      USER: {
        authorizationStatus: AuthStatus.Auth,
        userData: null,
      },
      OFFERS: {
        activeCity: 'Paris',
        activeId: null,
        activeSortType: 'Top rated first',
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
        isCommentPosting: false,
        isReviewsLoading: false,
        reviews: mockReviews,
      }
    });

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByTestId('reviews')).toBeInTheDocument();
  });

  it('should render comment form when AuthStatus is Auth', () => {
    const {withStoreComponent} = withStore(<Reviews />, {
      USER: {
        authorizationStatus: AuthStatus.Auth,
        userData: {
          token: '123123',
          email: 'test@test.com',
          avatarUrl: 'asdsadsad',
          password: 's1',
        },
      },
      OFFERS: {
        activeCity: 'Paris',
        activeId: null,
        activeSortType: 'Top rated first',
        currentOffer: null,
        offers: [],
        offersBackup: [],
        fullOffer: null,
        isFullOfferLoading: false,
        isOffersLoading: false,
        favOffers: [],
        isFavOffersLoading: false,
        hasError: false,
      },
      COMMENTS: {
        isCommentPosting: false,
        isReviewsLoading: false,
        reviews: mockReviews,
      }
    });

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('should not render comment form when AuthStatus is NoAuth', () => {
    const {withStoreComponent} = withStore(<Reviews />, {
      USER: {
        authorizationStatus: AuthStatus.NoAuth,
        userData: null,
      },
      OFFERS: {
        activeCity: 'Paris',
        activeId: null,
        activeSortType: 'Top rated first',
        currentOffer: null,
        offers: [],
        offersBackup: [],
        fullOffer: null,
        isFullOfferLoading: false,
        isOffersLoading: false,
        favOffers: [],
        isFavOffersLoading: false,
        hasError: false,
      },
      COMMENTS: {
        isCommentPosting: false,
        isReviewsLoading: false,
        reviews: mockReviews,
      }
    });

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.queryByText('Submit')).not.toBeInTheDocument();
  });
});
