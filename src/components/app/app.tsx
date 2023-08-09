import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute } from '../../const';
import { MainPage } from '../../pages/main/main';
import { Favorites } from '../../pages/favorites/favorites';
import { Login } from '../../pages/login/login';
import { Offer } from '../../pages/offer/offer';
import { NotFound } from '../../pages/404/404';
import { PrivateRoute } from '../private-route/private-route';
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
              <PrivateRoute authorizationStatus={authStatus}>
                <Favorites />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Login}
            element={<Login />}
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
