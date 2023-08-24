import {beforeAll, beforeEach, describe, expect} from 'vitest';
import {createMemoryHistory, MemoryHistory} from 'history';
import { AuthStatus, AppRoute } from '../../../const.ts';
import { withHistory } from '../../../store/mocks/mock-component.tsx';
import {Route, Routes} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import { PrivateLoginRoute } from './private-login-route.tsx';

describe('Component: Private Login Route', () => {
  let mockHistory: MemoryHistory;

  beforeAll(() => {
    mockHistory = createMemoryHistory();
  });

  beforeEach(() => {
    mockHistory.push(AppRoute.Login);
  });

  it('should render component for private route, when user authorized', () => {
    const expectedText = 'private route';
    const notExpectedText = 'public route';
    const preparedComponent = withHistory(
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<span>{expectedText}</span>}
        />
        <Route path={AppRoute.Login} element={(
          <PrivateLoginRoute authorizationStatus={AuthStatus.Auth}>
            <span>{notExpectedText}</span>
          </PrivateLoginRoute>
        )}
        />
      </Routes>,
      mockHistory
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });

  it('should render component for public route, when user not authorized', () => {
    const expectedText = 'public route';
    const notExpectedText = 'private route';
    const preparedComponent = withHistory(
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<span>{notExpectedText}</span>}
        />
        <Route path={AppRoute.Login} element={(
          <PrivateLoginRoute authorizationStatus={AuthStatus.NoAuth}>
            <span>{expectedText}</span>
          </PrivateLoginRoute>
        )}
        />
      </Routes>,
      mockHistory
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });

});
