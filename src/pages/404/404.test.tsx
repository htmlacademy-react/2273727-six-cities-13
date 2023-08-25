import { render, screen } from '@testing-library/react';
import { NotFound } from './404';
import { withHistory, withStore } from '../../store/mocks/mock-component';

describe('Component: 404', () => {
  it('should render correctly', () => {
    const {withStoreComponent} = withStore(<NotFound />);

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
  });
});
