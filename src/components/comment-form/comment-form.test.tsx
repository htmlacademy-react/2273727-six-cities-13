import { render, screen } from '@testing-library/react';
import { AuthStatus } from '../../const';
import { CommentForm } from './comment-form';
import { withHistory, withStore } from '../../store/mocks/mock-component';
import { mockReviews } from '../../store/mocks/reviews';

describe('Component: Comment Form', () => {
  it('should render comment form when AuthStatus is Auth', () => {
    const { withStoreComponent } = withStore(<CommentForm scrollToReviewsTitle={() => null} />, {
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

    expect(screen.getByTestId('comment-form')).toBeInTheDocument();
  });
});
