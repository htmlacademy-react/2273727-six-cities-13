import { render, screen } from '@testing-library/react';
import { AuthStatus } from '../../const';
import { SortOptions } from './sort-options';
import { withHistory, withStore } from '../../store/mocks/mock-component';

describe('Component: Sort Options', () => {
  it('should render correctly', () => {
    const {withStoreComponent} = withStore(<SortOptions />, {
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
    });

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByTestId('Top rated first')).toBeInTheDocument();
  });
});
