import { render, screen } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute } from '../../const';
import { App } from './app';
import { withStore } from '../../store/mocks/mock-component';
import { mockStore } from '../../store/mocks/mock-store';

describe('App', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "MainScreen" when user navigate to "/"', () => {
    const { withStoreComponent } = withStore(<App />, mockStore());
    mockHistory.push(AppRoute.Root);

    render(withStoreComponent);

    expect(screen.getByTestId('main-empty')).toBeInTheDocument();
    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
  });
});
