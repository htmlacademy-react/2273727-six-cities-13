import { render, screen } from '@testing-library/react';
import { Map } from './map';
import { withHistory, withStore } from '../../store/mocks/mock-component';
import { mockFullOffer } from '../../store/mocks/mock-full-offer';
import { mockOffers } from '../../store/mocks/mock-offers';


describe('Component: Map', () => {
  it('should render correctly', () => {
    const {withStoreComponent} = withStore(<Map isMain city={mockFullOffer.city} offers={mockOffers} selectedId={mockFullOffer.id} />);

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByTestId('map')).toBeInTheDocument();
  });
});
