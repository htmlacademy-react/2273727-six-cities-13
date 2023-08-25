import { render, screen } from '@testing-library/react';
import { Header } from './header';
import { AuthStatus } from '../../const';
import { withHistory, withStore } from '../../store/mocks/mock-component';

describe('Component: Header', () => {
  it('should render correctly when AuthorizationStatus.NoAuth', () => {
    const { withStoreComponent } = withStore(<Header />, {
      USER: {
        authorizationStatus: AuthStatus.NoAuth,
        userData: null,
      },
    });

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getAllByRole('img').length).toBe(1);
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });

  it('should render correctly when AuthorizationStatus.Auth', () => {
    const { withStoreComponent } = withStore(<Header />, {
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
        offers: [],
        offersBackup: [],
        fullOffer: null,
        isFullOfferLoading: false,
        isOffersLoading: false,
        favOffers: [],
        isFavOffersLoading: false,
        hasError: false,
      },
    });

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getAllByRole('img').length).toBe(2);
    expect(screen.getByAltText('avatar')).toBeInTheDocument();
    expect(screen.getByText('test@test.com')).toBeInTheDocument();
    expect(screen.getByText(/sign out/i)).toBeInTheDocument();
  });
});
