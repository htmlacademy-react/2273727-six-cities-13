import { render, screen } from '@testing-library/react';
import { Favorites } from './favorites';
import { withHistory, withStore } from '../../store/mocks/mock-component';
import { AuthStatus } from '../../const';
import { mockOffers } from '../../store/mocks/mock-offers';

describe('Component: Favorites', () => {
  it('should render correctly and not displaying message of empty page', () => {
    const { withStoreComponent } = withStore(<Favorites />, {
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
        activeSortType: 'Popular',
        currentOffer: null,
        offers: mockOffers,
        offersBackup: [],
        fullOffer: null,
        isFullOfferLoading: false,
        isOffersLoading: false,
        favOffers: mockOffers,
        isFavOffersLoading: false,
        hasError: false,
      },
    });

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByTestId('favorites')).toBeInTheDocument();
    expect(screen.queryByText('Nothing yet saved.')).not.toBeInTheDocument();
  });
});
