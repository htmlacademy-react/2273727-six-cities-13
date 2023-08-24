import { render, screen } from '@testing-library/react';
import { NoAuthElement } from './no-auth-element';
import { withHistory, withStore } from '../../../store/mocks/mock-component';
import { AuthStatus } from '../../../const';

describe('NoAuthElement', () => {
  it('should render correctly with AuthorizationStatus.NoAuth', () => {
    const { withStoreComponent } = withStore(<NoAuthElement />, {
      USER: {
        authorizationStatus: AuthStatus.NoAuth,
        userData: null,
      },
    });

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });
});
