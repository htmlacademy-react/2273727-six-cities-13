import { render, screen } from '@testing-library/react';
import { AuthStatus } from '../../const';
import { FavoritesList } from './favorites-list';
import { withHistory, withStore } from '../../store/mocks/mock-component';
import { mockOffers } from '../../store/mocks/mock-offers';

describe('Component: Favorites List', () => {
  it('should render correctly', () => {
    const {withStoreComponent} = withStore(<FavoritesList favorites={mockOffers}/>, {
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
        favOffers: mockOffers,
        isFavOffersLoading: true,
        hasError: false,
      },
    });

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByTestId('favorites-list')).toBeInTheDocument();
  });
});
