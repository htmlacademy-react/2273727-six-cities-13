import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Header } from '../../components/header/header';
import { AppRoute } from '../../const';
import { OfferType } from '../../components/types/offer';
import { FavoritesList } from '../../components/favorites-list/favorites-list';
import { NotFound } from '../404/404';

type FavoritesProps = {
  offers: OfferType[];
}

export function Favorites({offers}: FavoritesProps) {
  const favorites = offers.filter((offer) => offer.isFavorite);
  console.log(favorites);
  if (favorites === null) {
    return (<NotFound />);
  }
  return (
    <div className="page">
      <Helmet>
        <title>Favorites</title>
      </Helmet>

      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <FavoritesList favorites={favorites}/>
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Root}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}
