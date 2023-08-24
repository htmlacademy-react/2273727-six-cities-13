import { Host } from './host';
import { render, screen } from '@testing-library/react';
import { mockFullOffer } from '../../store/mocks/mock-full-offer';

describe('Component: Host', () => {
  it('should render correctly with all information in it', () => {
    render(
      <Host host={mockFullOffer.host} description={mockFullOffer.description} />
    );

    expect(screen.getByText('Meet the host')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByAltText(/Host avatar/i)).toBeInTheDocument();
    expect(screen.getByText(mockFullOffer.host.name)).toBeInTheDocument();
    expect(screen.getByText(mockFullOffer.description)).toBeInTheDocument();
  });
});
