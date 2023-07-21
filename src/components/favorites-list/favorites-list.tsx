import { FavoritePlaceCard } from '../favorite-place-card/favorite-place-card';
import { OfferType } from '../types/offer';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type FavoritesListType = {
  favorites: OfferType[];
}

export function FavoritesList({ favorites }: FavoritesListType) {
  const favoriteCities = favorites.reduce<string[]>((acc, item) => {
    const cityName = item.city.name;
    if (!acc.includes(cityName)) {
      acc.push(cityName);
    }
    return acc;
  }, []);

  return (
    <>
      {favoriteCities.map((cityName, i) => (
        <li className="favorites__locations-items" key={favorites[i].id}>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.Root}>
                <span>{cityName}</span>
              </Link>
            </div>
          </div>
          <div className="favorites__places">
            {favorites.filter((item) => item.city.name === cityName).map((item) => (
              <FavoritePlaceCard key={item.id} cardByCity={item} />
            ))}
          </div>
        </li>
      ))}
    </>
  );
}
