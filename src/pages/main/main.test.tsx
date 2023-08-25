import { render, screen } from '@testing-library/react';
import { MainPage } from './main';
import { withHistory, withStore } from '../../store/mocks/mock-component';
import { AuthStatus } from '../../const';
import { mockOffers } from '../../store/mocks/mock-offers';

describe('Component: Main', () => {
  it('should render correctly and not render empty component if there are offers by active city', () => {
    const { withStoreComponent } = withStore(<MainPage />, {
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
        activeCity: 'Amsterdam',
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

    expect(screen.getByTestId('main')).toBeInTheDocument();
    expect(screen.queryByText('No places to stay available')).not.toBeInTheDocument();
  });

  it('should render correctly and display empty component if there are no offers by active city', () => {
    const { withStoreComponent } = withStore(<MainPage />, {
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

    expect(screen.getByTestId('main-empty')).toBeInTheDocument();
    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
  });
});
