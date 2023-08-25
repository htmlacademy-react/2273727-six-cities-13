import { screen, render } from '@testing-library/react';
import { useMap } from './useMap';
import { mockOffers } from '../../store/mocks/mock-offers';

describe('useMap', () => {
  it('returns a Map instance when called', () => {
    const mapRef = {
      current: document.createElement('div'),
    } as React.MutableRefObject<HTMLElement | null>;

    const TestComponent = () => {
      const { city } = mockOffers[0];
      const map = useMap(mapRef, city);
      return (
        <div data-testid="map">{map ? 'Map is ready' : 'Map is not ready'}</div>
      );
    };

    render(<TestComponent />);
    const mapElement = screen.getByTestId('map');

    expect(mapElement.textContent).toBe('Map is ready');
  });
});
