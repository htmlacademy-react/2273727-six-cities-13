import { OfferType } from '../types/offer';
import { Link } from 'react-router-dom';
import { AppRoute, RATING_COEFFICIENT } from '../../const';
import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch';
import { changeFavStatus, fetchFavOffers } from '../../store/api-actions';

type FavoritePlaceCardType = {
  cardByCity: OfferType;
}

export const FavoritePlaceCard = ({ cardByCity }: FavoritePlaceCardType) => {
  const { id, isFavorite, isPremium, previewImage, price, rating, title, type } = cardByCity;
  const dispatch = useAppDispatch();
  const deleteFavStatus = () => {
    (async () => {
      try {
        await dispatch(changeFavStatus(
          {
            id,
            status: 0,
          }));
      } finally {
        await dispatch(fetchFavOffers());
      }
    })();
  };

  const onButtonClick = () => {
    deleteFavStatus();
  };

  return (
    <article className="favorites__card place-card" data-testid="fav-place-card">
      {isPremium ? (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>) : null}
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoute.Offer}/${id}`}>
          <img className="place-card__image" src={previewImage} width="150" height="110" alt="Place image" />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button ${isFavorite ? 'place-card__bookmark-button--active' : ''} button`} type="button" onClick={onButtonClick}>
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${Math.ceil(rating) * RATING_COEFFICIENT}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${id}`}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{type.charAt(0).toUpperCase() + type.slice(1)}</p>
      </div>
    </article>
  );
};
