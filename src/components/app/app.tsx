import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute } from '../../const';
import { MainPage } from '../../pages/main/main';
import { Favorites } from '../../pages/favorites/favorites';
import { Login } from '../../pages/login/login';
import { Offer } from '../../pages/offer/offer';
import { NotFound } from '../../pages/404/404';
import { PrivateRouteForFavorites } from '../private-routes/private-route-for-favorites';
import { PrivateRouteForLogin } from '../private-routes/private-route-for-login';
import { useAppSelector } from '../../hooks/useAppSelector/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch';
import { fetchOffers, checkAuth } from '../../store/api-actions';
import { getAuthStatus } from '../../store/user-process.ts/selectors';
import { HistoryRouter } from '../history-route/history-route';
import { browserHistory } from '../../browser-history';
import { LoadingScreen } from '../../pages/loading-screen/loading-screen';

export function App() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      dispatch(fetchOffers()),
      dispatch(checkAuth())
    ]).then(() => setIsLoading(false));
  }, [dispatch]);

  const authStatus = useAppSelector(getAuthStatus);

  if (isLoading) {
    return <LoadingScreen />;
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
              <PrivateRouteForFavorites authorizationStatus={authStatus}>
                <Favorites />
              </PrivateRouteForFavorites>
            }
          />
          <Route
            path={AppRoute.Login}
            element={
              <PrivateRouteForLogin authorizationStatus={authStatus}>
                <Login />
              </PrivateRouteForLogin>
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
}
