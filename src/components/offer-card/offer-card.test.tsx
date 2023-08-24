import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../store/mocks/mock-component';
import { AuthStatus } from '../../const';
import { OfferCard } from './offer-card';
import { mockOffers } from '../../store/mocks/offers';

const mockOffer = mockOffers[0];

describe('Component: Offer Card', () => {
  it('should render correctly with all information inside', () => {
    const { withStoreComponent } = withStore(
      <OfferCard
        id={mockOffer.id}
        isFavorite={mockOffer.isFavorite}
        isMain
        isPremium={mockOffer.isPremium}
        previewImage={mockOffer.previewImage}
        price={mockOffer.price}
        rating={mockOffer.rating}
        title={mockOffer.title}
        type={mockOffer.type}
      />, {
        USER: {
          authorizationStatus: AuthStatus.Auth,
          userData: null,
        },
      });

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByTestId('offer-card')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByText(`€${mockOffer.price}`)).toBeInTheDocument();
    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
    expect(screen.getByText(mockOffer.type.charAt(0).toUpperCase() + mockOffer.type.slice(1))).toBeInTheDocument();
  });
});
