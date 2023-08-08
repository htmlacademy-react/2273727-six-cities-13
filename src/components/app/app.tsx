import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute } from '../../const';
import { MainPage } from '../../pages/main/main';
import { Favorites } from '../../pages/favorites/favorites';
import { Login } from '../../pages/login/login';
import { Offer } from '../../pages/offer/offer';
import { NotFound } from '../../pages/404/404';
import { PrivateRoute } from '../private-route/private-route';
import { store } from '../../store';
import { fetchOffers } from '../../store/api-actions';
import { checkAuth } from '../../store/api-actions';
import { useAppSelector } from '../../hooks/useAppSelector/useAppSelector';
import * as selectors from '../../store/selectors';

store.dispatch(checkAuth());
store.dispatch(fetchOffers()).then(() => {
  const offers = store.getState().offers;
  if (offers) {
    localStorage.setItem('offers', JSON.stringify(offers));
  }
});

export function App() {
  const authStatus = useAppSelector(selectors.authorizationStatus);

  return (
    <HelmetProvider>
      <BrowserRouter>
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
      </BrowserRouter>
    </HelmetProvider>
  );
}
