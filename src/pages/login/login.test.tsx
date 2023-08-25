import { render, screen } from '@testing-library/react';
import { Login } from './login';
import { withHistory, withStore } from '../../store/mocks/mock-component';

describe('Component: Login', () => {
  it('should render correctly', () => {
    const {withStoreComponent} = withStore(<Login />);

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByTestId('login')).toBeInTheDocument();
  });
});
