import { Link } from 'react-router-dom';
import { MouseEvent, memo, useState } from 'react';
import { changeFavStatus } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector/useAppSelector';
import { getAuthStatus } from '../../store/user-process.ts/selectors';
import { AuthStatus, AppRoute, RATING_COEFFICIENT } from '../../const';
import { redirectToRoute } from '../../store/actions';

type OfferCardProps = {
  id: string;
  isFavorite: boolean;
  isMain: boolean;
  isPremium: boolean;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: string;
  handleCardEnter?: (event: MouseEvent<HTMLLIElement>) => void;
  handleCardLeave?: (event: MouseEvent<HTMLLIElement>) => void;
}

const OfferCardComponent = (
  {
    id,
    isFavorite,
    isMain,
    isPremium,
    previewImage,
    price,
    rating,
    title,
    type,
    handleCardEnter,
    handleCardLeave,
  }: OfferCardProps) => {

  const [isFav, setIsFav] = useState(isFavorite);
  const authStatus = useAppSelector(getAuthStatus);

  const dispatch = useAppDispatch();
  const setFavStatus = () => {
    if (authStatus !== AuthStatus.Auth) {
      dispatch(redirectToRoute(AppRoute.Login));
      return;
    }

    try {
      dispatch(changeFavStatus(
        {
          id,
          status: isFav ? 0 : 1,
        }));
    } finally {
      setIsFav(!isFav);
    }
  };

  const onButtonClick = () => {
    setFavStatus();
  };

  return (
    <article className={isMain ? 'cities__card place-card' : 'near-places__card place-card'} id={id} onMouseEnter={handleCardEnter} onMouseLeave={handleCardLeave} data-testid="offer-card" >
      <div className={`place-card__mark ${isPremium ? '' : 'visually-hidden'}`}>
        <span>Premium</span>
      </div>
      <div className={isMain ? 'cities__image-wrapper place-card__image-wrapper' : 'near-places__image-wrapper place-card__image-wrapper'} >
        <Link to={`${AppRoute.Offer}/${id}`}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button ${authStatus === AuthStatus.Auth && isFav ? 'place-card__bookmark-button--active' : ''}  button`} type="button" onClick={onButtonClick}>
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark" />
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

export const OfferCard = memo(OfferCardComponent);
