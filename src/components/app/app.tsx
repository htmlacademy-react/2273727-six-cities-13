import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import MainPage from '../../pages/main/main';
import Favorites from '../../pages/favorites/favorites';
// import FavoritesEmpty from '../../pages/favorites/favorites-empty';
import Login from '../../pages/login/login';
import Offer from '../../pages/offer/offer';
// import OfferNotLogged from '../../pages/offer/offer-not-logged';
import { NotFound } from '../../pages/404/404';


type AppProps = {
  cardsCount: number;
}

function App({ cardsCount }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<MainPage cardsCount={cardsCount} />}
        />
        <Route
          path={AppRoute.Favorites}
          element={<Favorites />}
        />
        <Route
          path={AppRoute.Login}
          element={<Login />}
        />
        <Route
          path={AppRoute.Offer}
          element={<Offer />}
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
