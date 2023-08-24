import { render, screen } from '@testing-library/react';
import { CititesList } from './cities-list';
import { withHistory, withStore } from '../../store/mocks/mock-component';

describe('Component: Cities List', () => {
  it('should render correctly', () => {
    const {withStoreComponent} = withStore(<CititesList />, {
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
    });

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByTestId('cities-list')).toBeInTheDocument();
  });
});
