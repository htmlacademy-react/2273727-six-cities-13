import { render, screen } from '@testing-library/react';
import { MainEmpty } from './main-empty';
import { withHistory, withStore } from '../../store/mocks/mock-component';
import { AuthStatus } from '../../const';

describe('Component: Main Empty', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<MainEmpty />, {
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

    expect(screen.getByTestId('main-empty')).toBeInTheDocument();
    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
  });
});
