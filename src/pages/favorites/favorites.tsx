import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch';
import { Header } from '../../components/header/header';
import { AppRoute } from '../../const';
import { FavoritesList } from '../../components/favorites-list/favorites-list';
import { getFavOffers, getFavOffersLoadStatus } from '../../store/offers-process/selectors';
import { fetchFavOffers } from '../../store/api-actions';
import { FavoritesEmpty } from './favorites-empty';
import { LoadingScreen } from '../loading-screen/loading-screen';

export function Favorites() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchFavOffers());
  }, [dispatch]);
  const favorites = useAppSelector(getFavOffers);
  const isFavOffersLoading = useAppSelector(getFavOffersLoadStatus);

  if (isFavOffersLoading) {
    return <LoadingScreen />;
  } else if (favorites.length === 0 && !isFavOffersLoading) {
    return <FavoritesEmpty />;
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
              <FavoritesList favorites={favorites} />
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
