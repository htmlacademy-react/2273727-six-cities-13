import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Header } from '../../components/header/header';
import { ImgContainer } from '../../components/img-container/img-container';
import { Goods } from '../../components/goods/goods';
import { Host } from '../../components/host/host';
import { Reviews } from '../../components/reviews/reviews';
import { OffersList } from '../../components/offers-list/offers-list';
import { Map } from '../../components/map/map';
import { useAppSelector } from '../../hooks/useAppSelector/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch';
import { fetchNearbyOffers, fetchFullOffer, changeFavStatus } from '../../store/api-actions';
import { LoadingScreen } from '../loading-screen/loading-screen';
import { NotFound } from '../404/404';
import { setActiveId, setCurrentOffer } from '../../store/offers-process/offers-process';
import { getOffers, getCurrentOffer, getOffersLoadStatus, getFullOffer, getFullOfferLoadStatus } from '../../store/offers-process/selectors';
import { getNearbyOffers, getNearbyOffersLoadStatus } from '../../store/nearby-offers-process/selectors';
import { getAuthStatus } from '../../store/user-process.ts/selectors';
import { AuthStatus, AppRoute, RATING_COEFFICIENT } from '../../const';
import { redirectToRoute } from '../../store/actions';

export const Offer = () => {
  const dispatch = useAppDispatch();
  const offerId = useParams().id;
  const offers = useAppSelector(getOffers);
  const authStatus = useAppSelector(getAuthStatus);
  const isOffersLoading = useAppSelector(getOffersLoadStatus);
  const isIdExist = offers?.some((offer) => offer.id === offerId);

  useEffect(() => {
    if (!isIdExist || offerId === undefined) {
      return;
    }
    dispatch(fetchFullOffer({ id: offerId }));
    dispatch(fetchNearbyOffers({ id: offerId }));
    dispatch(setActiveId(offerId));
    dispatch(setCurrentOffer());
  }, [isIdExist, offerId, dispatch, authStatus]
  );

  const offer = useAppSelector(getFullOffer);
  const loadedNearbyOffers = useAppSelector(getNearbyOffers);
  const currentOffer = useAppSelector(getCurrentOffer);
  const nearbyOffers = useMemo(() => {
    if (currentOffer === null) {
      return;
    }
    return [...loadedNearbyOffers, currentOffer];
  }, [loadedNearbyOffers, currentOffer]);

  const isOfferLoading = useAppSelector(getFullOfferLoadStatus);
  const isNearbyOfferLoading = useAppSelector(getNearbyOffersLoadStatus);

  const isPageLoading = isOfferLoading || isNearbyOfferLoading;

  if (!isIdExist && !isOffersLoading) {
    return (
      <NotFound />
    );
  }

  if (isPageLoading || offer === null || nearbyOffers === undefined) {
    return (
      <LoadingScreen />
    );
  }

  const { bedrooms, city, description, goods, id, host, images, isFavorite, isPremium, maxAdults, price, rating, title, type } = offer;

  const setFav = () => {
    if (authStatus !== AuthStatus.Auth) {
      dispatch(redirectToRoute(AppRoute.Login));
      return;
    }

    (async () => {
      try {
        await dispatch(changeFavStatus(
          {
            id,
            status: isFavorite ? 0 : 1,
          }));
      } finally {
        await dispatch(fetchFullOffer({ id: offerId }));
        await dispatch(fetchNearbyOffers({ id: offerId }));
      }
    })();
  };

  const onButtonClick = () => {
    setFav();
  };

  return (
    <div className="page" data-testid="offer">
      <Helmet>
        <title>Offer</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <ImgContainer images={images} />
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium ? (
                <div className="offer__mark" >
                  <span>Premium</span>
                </div>) : null}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {title}
                </h1>
                <button className={`offer__bookmark-button ${isFavorite ? 'offer__bookmark-button--active' : ''}  button`} type="button" onClick={onButtonClick} >
                  <svg className="offer__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${Math.ceil(rating) * RATING_COEFFICIENT}%` }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{type.charAt(0).toUpperCase() + type.slice(1)}</li>
                <li className="offer__feature offer__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">€{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <Goods goods={goods} />
              <Host host={host} description={description} />
              <Reviews />
            </div>
          </div>
          <Map isMain={false} city={city} offers={nearbyOffers} selectedId={offerId} />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <OffersList id={id} cityName={city.name} offers={loadedNearbyOffers} />
          </section>
        </div>
      </main>
    </div>
  );
};
