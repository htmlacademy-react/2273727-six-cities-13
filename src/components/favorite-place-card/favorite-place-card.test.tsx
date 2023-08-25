import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../store/mocks/mock-component';
import { AuthStatus } from '../../const';
import { FavoritePlaceCard } from './favorite-place-card';
import { mockOffers } from '../../store/mocks/mock-offers';

const mockOffer = mockOffers[0];

describe('Component: Favorite Place Card', () => {
  it('should render correctly with all information inside', () => {
    const { withStoreComponent } = withStore(
      <FavoritePlaceCard cardByCity={mockOffer} />, {
        USER: {
          authorizationStatus: AuthStatus.Auth,
          userData: null,
        },
      });

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByTestId('fav-place-card')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByText(`€${mockOffer.price}`)).toBeInTheDocument();
    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
    expect(screen.getByText(mockOffer.type.charAt(0).toUpperCase() + mockOffer.type.slice(1))).toBeInTheDocument();
  });
});

