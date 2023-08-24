import { describe, expect } from 'vitest';
import { withStore } from '../../store/mocks/mock-component.tsx';
import { ErrorScreen } from './error-screen.tsx';
import { render, screen } from '@testing-library/react';
import { APIRoute } from '../../const.ts';
import userEvent from '@testing-library/user-event';
import { extractActionsTypes } from '../../store/mocks/mock-utils.ts';
import { fetchOffers } from '../../store/api-actions.ts';
import { setOffers, sortOffers, initialState, setOffersLoadStatus, setOffersBackup, setError } from '../../store/offers-process/offers-process.ts';

describe('Component: ServerErrorScreen', () => {
  it('should render correctly and have dispatches when click on button', () => {
    const firstExpectedText = 'Server is not available';
    const { withStoreComponent } = withStore(<ErrorScreen />, {});

    render(withStoreComponent);

    expect(screen.getByText(firstExpectedText)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should dispatch "fetchOffersAction" when user clicked reloadButton', async () => {
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(<ErrorScreen />, { OFFERS: initialState });
    mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, []);

    render(withStoreComponent);
    await userEvent.click(screen.getByRole('button'));
    const actions = extractActionsTypes(mockStore.getActions());
    expect(actions).toEqual([
      fetchOffers.pending.type,
      setOffersLoadStatus.type,
      setOffers.type,
      setOffersBackup.type,
      sortOffers.type,
      setError.type,
      setOffersLoadStatus.type,
      fetchOffers.fulfilled.type,
    ]);
  });
});
