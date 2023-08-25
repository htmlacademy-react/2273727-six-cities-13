import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute } from '../../const';
import { MainPage } from '../../pages/main/main';
import { Favorites } from '../../pages/favorites/favorites';
import { Login } from '../../pages/login/login';
import { Offer } from '../../pages/offer/offer';
import { NotFound } from '../../pages/404/404';
import { PrivateFavRoute } from '../private-routes/private-fav-route/private-fav-route';
import { PrivateLoginRoute } from '../private-routes/private-login-route/private-login-route';
import { useAppSelector } from '../../hooks/useAppSelector/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch';
import { fetchOffers, checkAuth } from '../../store/api-actions';
import { getAuthStatus } from '../../store/user-process.ts/selectors';
import { HistoryRouter } from '../history-route/history-route';
import { browserHistory } from '../../browser-history';
import { hasError } from '../../store/offers-process/selectors';
import { ErrorScreen } from '../error-screen/error-screen';

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOffers());
    dispatch(checkAuth());
  }, [dispatch]);

  const authStatus = useAppSelector(getAuthStatus);
  const isError = useAppSelector(hasError);

  if (isError) {
    return (
      <ErrorScreen />);
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={
              <MainPage />
            }
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateFavRoute authorizationStatus={authStatus}>
                <Favorites />
              </PrivateFavRoute>
            }
          />
          <Route
            path={AppRoute.Login}
            element={
              <PrivateLoginRoute authorizationStatus={authStatus}>
                <Login />
              </PrivateLoginRoute>
            }
          />
          <Route
            path={`${AppRoute.Offer}/:id`}
            element={<Offer />}
          />
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
};
