import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { AppThunkDispatch, extractActionsTypes } from './mocks/mock-utils';
import { mockOffers } from './mocks/mock-offers';
import { mockFullOffer } from './mocks/mock-full-offer';
import { mockReviews } from './mocks/mock-reviews';
import { State } from '../hooks/useAppSelector/useAppSelector';
import { checkAuth, fetchOffers, fetchFullOffer, fetchFavOffers, fetchNearbyOffers, fetchReviews, changeFavStatus, login, logout, AuthData, postComment } from './api-actions';
import { APIRoute } from '../const';
import { redirectToRoute } from './actions';
import * as tokenStorage from '../services/token';
import { setUserData } from './user-process.ts/user-process';
import { setError, setFavOffers, setFavOffersLoadStatus, setFullOffer, setFullOfferLoadStatus, setOffers, setOffersBackup, setOffersLoadStatus, sortOffers } from './offers-process/offers-process';
import { setCommentPostStatus, setReviews, setReviewsLoadStatus } from './comments-process/comments-process';
import { setNearbyOffers, setNearbyOffersLoadStatus } from './nearby-offers-process/nearby-offers-process';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ OFFERS: { offers: [] } });
  });

  describe('"checkAuthAction" action works correct', () => {
    it('correct work of dispatches with "login" action when server responce 200', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200);

      await store.dispatch(checkAuth());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuth.pending.type,
        setUserData.type,
        checkAuth.fulfilled.type,
      ]);
    });

    it('correct work of dispatches with "login" action when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(400);

      await store.dispatch(checkAuth());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuth.pending.type,
        checkAuth.rejected.type,
      ]);
    });
  });

  describe('"fetchOffers" action works correct', () => {
    it('correct work of dispatches with "fetchOffers" action when server response 200', async () => {
      const responseOffers = [...mockOffers];
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, responseOffers);

      await store.dispatch(fetchOffers());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchQuestionsActionFulfilled = emittedActions.at(2) as ReturnType<typeof fetchOffers.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOffers.pending.type,
        setOffersLoadStatus.type,
        setOffers.type,
        setOffersBackup.type,
        sortOffers.type,
        setError.type,
        setOffersLoadStatus.type,
        fetchOffers.fulfilled.type,
      ]);

      expect(fetchQuestionsActionFulfilled.payload)
        .toEqual(responseOffers);
    });

    it('correct work of dispatches with "fetchOffers" action when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(400, []);

      await store.dispatch(fetchOffers());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffers.pending.type,
        setOffersLoadStatus.type,
        setError.type,
        setOffersLoadStatus.type,
        fetchOffers.rejected.type,
      ]);
    });
  });

  describe('"login" action works correct', () => {
    it('correct work of dispatches with "login" action', async () => {
      const fakeUser: AuthData = { email: 'test@test.ru', password: '123456' };
      const fakeServerReplay = { token: 'secret' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);

      await store.dispatch(login(fakeUser));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        login.pending.type,
        redirectToRoute.type,
        checkAuth.pending.type,
        fetchOffers.pending.type,
        setOffersLoadStatus.type,
        login.fulfilled.type,
      ]);
    });

    it('should call "saveToken" once with the received token', async () => {
      const fakeUser: AuthData = { email: 'test@test.ru', password: '123456' };
      const fakeServerReplay = { token: 'secret' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(login(fakeUser));

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(fakeServerReplay.token);
    });

  });

  describe('"logout" action works correct', () => {
    it('correct work of dispatches with "logout" action', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

      await store.dispatch(logout());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logout.pending.type,
        logout.fulfilled.type,
      ]);
    });

    it('should one call "dropToken" with "logoutAction"', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(logout());

      expect(mockDropToken).toBeCalledTimes(1);
    });
  });

  describe('"fetchFullOffer" action works correct', () => {
    it('correct work of dispatches with "fetchFullOffer" action when server response 200', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${mockFullOffer.id}`).reply(200, mockFullOffer);

      await store.dispatch(fetchFullOffer({ id: mockFullOffer.id }));
      const dispatchedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(dispatchedActions);
      const fetchFullOfferFulfilled = dispatchedActions.at(2) as ReturnType<typeof fetchFullOffer.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchFullOffer.pending.type,
        setFullOfferLoadStatus.type,
        setFullOffer.type,
        setFullOfferLoadStatus.type,
        fetchFullOffer.fulfilled.type,
      ]);

      expect(fetchFullOfferFulfilled.payload).toEqual(mockFullOffer);
    });

    it('correct work of dispatches with "fetchFullOffer" action when server response 400', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${mockFullOffer.id}`).reply(400);

      await store.dispatch(fetchFullOffer({ id: mockFullOffer.id }));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFullOffer.pending.type,
        setFullOfferLoadStatus.type,
        fetchFullOffer.rejected.type,
      ]);
    });
  });

  describe('"fetchFavOffers" action works correct', () => {
    it('correct work of dispatches with "fetchFavOffers" action when server response 200', async () => {
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(200, mockOffers);

      await store.dispatch(fetchFavOffers());
      const dispatchedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(dispatchedActions);
      const fetchFavOffersFulfilled = dispatchedActions.at(2) as ReturnType<typeof fetchFavOffers.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchFavOffers.pending.type,
        setFavOffersLoadStatus.type,
        setFavOffers.type,
        setFavOffersLoadStatus.type,
        fetchFavOffers.fulfilled.type,
      ]);

      expect(fetchFavOffersFulfilled.payload).toEqual(mockOffers);
    });

    it('correct work of dispatches with "fetchFavOffers" action when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(400);

      await store.dispatch(fetchFavOffers());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFavOffers.pending.type,
        setFavOffersLoadStatus.type,
        setFavOffersLoadStatus.type,
        fetchFavOffers.rejected.type,
      ]);
    });
  });

  describe('"fetchReviews" action works correct', () => {
    it('correct work of dispatches with "fetchReviews" action when server response 200', async () => {
      const offerId = mockFullOffer.id;
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${offerId}`).reply(200, mockReviews);

      await store.dispatch(fetchReviews({ id: offerId }));
      const dispatchedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(dispatchedActions);
      const fetchReviewsFulfilled = dispatchedActions.at(2) as ReturnType<typeof fetchReviews.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchReviews.pending.type,
        setReviewsLoadStatus.type,
        setReviews.type,
        setReviewsLoadStatus.type,
        fetchReviews.fulfilled.type,
      ]);

      expect(fetchReviewsFulfilled.payload).toEqual(mockReviews.reverse());
    });

    it('correct work of dispatches with "fetchReviews" action when server response 400', async () => {
      const offerId = mockFullOffer.id;
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${offerId}`).reply(400);

      await store.dispatch(fetchReviews({ id: offerId }));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchReviews.pending.type,
        setReviewsLoadStatus.type,
        fetchReviews.fulfilled.type,
      ]);
    });
  });

  describe('"fetchNearbyOffers" action works correct', () => {
    it('correct work of dispatches with "fetchNearbyOffers" action when server response 200', async () => {
      const offerId = mockOffers[0].id;
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${offerId}/nearby`).reply(200, mockOffers);

      await store.dispatch(fetchNearbyOffers({ id: offerId }));
      const dispatchedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(dispatchedActions);
      const fetchNearbyOffersFulfilled = dispatchedActions.at(2) as ReturnType<typeof fetchNearbyOffers.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchNearbyOffers.pending.type,
        setNearbyOffersLoadStatus.type,
        setNearbyOffers.type,
        setNearbyOffersLoadStatus.type,
        fetchNearbyOffers.fulfilled.type,
      ]);

      expect(fetchNearbyOffersFulfilled.payload).not.toBe(undefined);
    });

    it('correct work of dispatches with "fetchNearbyOffers" action when server response 400', async () => {
      const offerId = mockOffers[0].id;
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${offerId}/nearby`).reply(400);

      await store.dispatch(fetchNearbyOffers({ id: offerId }));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchNearbyOffers.pending.type,
        setNearbyOffersLoadStatus.type,
        fetchNearbyOffers.rejected.type,
      ]);
    });
  });

  describe('"changeFavStatus" action works correct', () => {
    it('correct work of dispatches with "changeFavStatus" action when server response 200', async () => {
      const { id, isFavorite } = mockOffers[0];
      mockAxiosAdapter.onPost(`${APIRoute.Favorite}/${id}/${Number(isFavorite)}`).reply(200);
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(200);
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(200);

      await store.dispatch(changeFavStatus({ id, status: Number(isFavorite) }));
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        changeFavStatus.pending.type,
        fetchOffers.pending.type,
        setOffersLoadStatus.type,
        changeFavStatus.fulfilled.type,
      ]);
    });

    it('correct work of dispatches with "changeFavStatus" action when server response 400', async () => {
      const { id, isFavorite } = mockOffers[0];
      mockAxiosAdapter.onPost(`${APIRoute.Favorite}/${id}/${Number(isFavorite)}`).reply(400);

      await store.dispatch(changeFavStatus({ id, status: Number(isFavorite) }));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        changeFavStatus.pending.type,
        fetchOffers.pending.type,
        setOffersLoadStatus.type,
        changeFavStatus.rejected.type,
      ]);
    });
  });

  describe('"postComment" action works correct', () => {
    it('correct work of dispatches with "postComment" action when server response 200', async () => {
      const mockComment = { rating: 5, comment: 'test', id: '12345' };
      mockAxiosAdapter.onPost(`${APIRoute.Comments}/${mockComment.id}`).reply(200);

      await store.dispatch(postComment(mockComment));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postComment.pending.type,
        setCommentPostStatus.type,
        setCommentPostStatus.type,
        postComment.fulfilled.type,
      ]);
    });

    it('correct work of dispatches with "postComment" action when server response 400', async () => {
      const mockComment = { rating: 5, comment: 'test', id: '12345' };
      mockAxiosAdapter.onPost(`${APIRoute.Comments}/${mockComment.id}`).reply(400);

      await store.dispatch(postComment(mockComment));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postComment.pending.type,
        setCommentPostStatus.type,
        setCommentPostStatus.type,
        postComment.rejected.type,
      ]);
    });
  });

});
