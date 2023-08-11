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
import * as selectors from '../../store/selectors';
import { HistoryRouter } from '../history-route/history-route';
import { browserHistory } from '../../browser-history';

export function App() {

  const authStatus = useAppSelector(selectors.authorizationStatus);

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
