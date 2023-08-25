import { render, screen } from '@testing-library/react';
import { Offer } from './offer';
import { withHistory, withStore } from '../../store/mocks/mock-component';
import { AuthStatus } from '../../const';
import { mockOffers } from '../../store/mocks/mock-offers';
import { mockFullOffer } from '../../store/mocks/mock-full-offer';
import { mockReviews } from '../../store/mocks/mock-reviews';

describe('Component: Offer', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<Offer />, {
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
        activeCity: mockFullOffer.city.name,
        activeId: mockFullOffer.id,
        activeSortType: 'Popular',
        currentOffer: mockOffers[0],
        offers: mockOffers,
        offersBackup: mockOffers,
        fullOffer: mockFullOffer,
        isFullOfferLoading: false,
        isOffersLoading: true,
        favOffers: mockOffers,
        isFavOffersLoading: false,
        hasError: false,
      },
      NEARBY_OFFERS: {
        nearbyOffers: mockOffers,
        isNearbyOffersLoading: false,
      },
      COMMENTS: {
        reviews: mockReviews,
        isCommentPosting: false,
        isReviewsLoading: false,
      }
    });

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByTestId('offer')).toBeInTheDocument();
  });
});
