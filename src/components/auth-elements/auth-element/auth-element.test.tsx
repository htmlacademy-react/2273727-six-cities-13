import { render, screen } from '@testing-library/react';
import { AuthElement } from './auth-element';
import { withHistory, withStore } from '../../../store/mocks/mock-component';
import { APIRoute, AuthStatus } from '../../../const';
import userEvent from '@testing-library/user-event';
import { BACKEND_URL } from '../../../services/api';
import { extractActionsTypes } from '../../../store/mocks/mock-utils';
import { logout } from '../../../store/api-actions';

describe('AuthElement', () => {
  it('should render correctly with AuthorizationStatus.Auth', () => {
    const { withStoreComponent } = withStore(<AuthElement />, {
      USER: {
        authorizationStatus: AuthStatus.Auth,
        userData: {
          token: '123123',
          email: 'test@test.com',
          avatarUrl: 'asdsadsad',
          password: 's1',
        },
      },
      OFFERS: {
        activeCity: 'Paris',
        activeId: null,
        activeSortType: 'Popular',
        currentOffer: null,
        offers: [],
        offersBackup: [],
        fullOffer: null,
        isFullOfferLoading: false,
        isOffersLoading: true,
        favOffers: [],
        isFavOffersLoading: true,
        hasError: false,
      },
    });

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByAltText('avatar'));
    expect(screen.getByText('test@test.com')).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });

  it('should render correctly with action click "Sign out"', async () => {
    const { withStoreComponent, mockAxiosAdapter, mockStore } = withStore(<AuthElement />, {
      USER: {
        authorizationStatus: AuthStatus.Auth,
        userData: {
          token: '123123',
          email: 'test@test.com',
          avatarUrl: 'asdsadsad',
          password: 's1',
        },
      },
      OFFERS: {
        activeCity: 'Paris',
        activeId: null,
        activeSortType: 'Popular',
        currentOffer: null,
        offers: [],
        offersBackup: [],
        fullOffer: null,
        isFullOfferLoading: false,
        isOffersLoading: true,
        favOffers: [],
        isFavOffersLoading: true,
        hasError: false,
      },
    });

    mockAxiosAdapter
      .onDelete(`${BACKEND_URL + APIRoute.Logout}`)
      .reply(204);
    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    const elemToClick = screen.getByText('Sign out');

    await userEvent.click(elemToClick);

    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      logout.pending.type,
      logout.fulfilled.type,
    ]);
  });
});
