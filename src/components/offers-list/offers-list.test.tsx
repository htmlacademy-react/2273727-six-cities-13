import { render, screen } from '@testing-library/react';
import { AuthStatus } from '../../const';
import { OffersList } from './offers-list';
import { withHistory, withStore } from '../../store/mocks/mock-component';
import { mockOffers } from '../../store/mocks/offers';


describe('Component: Offer List', () => {
  it('should render correctly', () => {
    const {withStoreComponent} = withStore(<OffersList offers={mockOffers}/>, {
      USER: {
        authorizationStatus: AuthStatus.Auth,
        userData: null,
      },
    });

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByTestId('offers-list')).toBeInTheDocument();
  });
});
