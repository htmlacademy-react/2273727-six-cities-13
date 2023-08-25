import { render, screen } from '@testing-library/react';
import { RandomCityButton } from './random-city-button';
import { withHistory, withStore } from '../../store/mocks/mock-component';

describe('Component: Random City Button', () => {
  it('should render correctly', () => {
    const {withStoreComponent} = withStore(<RandomCityButton />);

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByTestId('random-city-button')).toBeInTheDocument();
  });
});
