import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from '../../const';
import { MainPage } from '../../pages/main/main';
import { Favorites } from '../../pages/favorites/favorites';
import { Login } from '../../pages/login/login';
import { Offer } from '../../pages/offer/offer';
import { NotFound } from '../../pages/404/404';
import { PrivateRoute } from '../private-route/private-route';
import { OfferType } from '../types/offer';
import { FullOfferType } from '../types/full-offer';


type AppProps = {
  offers: OfferType[];
  fullOffers: FullOfferType[];
}

export function App({ offers, fullOffers }: AppProps) {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={
              <MainPage
                offers={offers}
              />
            }
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
                <Favorites offers={offers} />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Login}
            element={<Login />}
          />
          <Route
            path={`${AppRoute.Offer}/:id`}
            element={<Offer fullOffers={fullOffers} offers={offers} />}
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
