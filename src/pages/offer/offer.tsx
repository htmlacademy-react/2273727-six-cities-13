import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Header } from '../../components/header/header';
import { ImgContainer } from '../../components/img-container/img-container';
import { Goods } from '../../components/goods/goods';
import { Host } from '../../components/host/host';
import { Reviews } from '../../components/reviews/reviews';
import { OffersList } from '../../components/offers-list/offers-list';
import { OfferType } from '../../components/types/offer';
import { Map } from '../../components/map/map';
import { useAppSelector } from '../../hooks/useAppSelector/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch';
import { fetchNearbyOffers, fetchOffer, fetchReviews } from '../../store/api-actions';
import { useEffect } from 'react';
import { LoadingScreen } from '../loading-screen/loading-screen';
import * as selectors from '../../store/selectors';

export function Offer() {
  const [selectedCard, setSelectedCard] = useState<OfferType | undefined>(undefined);
  const dispatch = useAppDispatch();
  const offerId = useParams().id;


  useEffect(() => {
    dispatch(fetchOffer({ id: offerId }));
    dispatch(fetchNearbyOffers({ id: offerId }));
    dispatch(fetchReviews({ id: offerId }));
  }, [offerId, dispatch]
  );

  const offers = useAppSelector(selectors.offers);

  const offer = useAppSelector(selectors.fullOffer);
  const nearbyOffers = useAppSelector(selectors.nearbyOffers);
  const reviews = useAppSelector(selectors.reviews);

  const isOfferLoading = useAppSelector(selectors.isOfferLoading);
  const isNearbyOfferLoading = useAppSelector(selectors.isNearbyOffersLoading);
  const isReviewsLoading = useAppSelector(selectors.isReviewsLoading);

  const isPageLoading = isOfferLoading || isNearbyOfferLoading || isReviewsLoading;
  const isSomethingMissingFromServer = offer === null || offers === null || nearbyOffers === null || reviews === null;

  if (isPageLoading || isSomethingMissingFromServer) {
    return (
      <LoadingScreen />
    );
  }

  const { bedrooms, city, description, goods, id, host, images, isFavorite, isPremium, maxAdults, price, rating, title, type } = offer;

  const getFavoriteStyles = (isFav: boolean) => {
    if (isFav) {
      return { fill: '#4481c3', stroke: '#4481c3' };
    }
  };

  const currentCity = nearbyOffers[0].city;

  const handleCardHover = (ids: string | undefined) => {
    if (!ids) {
      setSelectedCard(undefined);
    }
    const currentCard = offers.find((item) => item.id === ids);
    setSelectedCard(currentCard);
  };

  return (
    <div className="page">
      <Helmet>
        <title>Offer</title>
      </Helmet>

      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              <ImgContainer images={images} />
            </div>
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
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width={31} height={33} style={getFavoriteStyles(isFavorite)}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${rating * 20}%` }} />
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

              <Reviews reviews={reviews} />

            </div>
          </div>

          <Map isMain={false} city={currentCity} offers={nearbyOffers} selectedCard={selectedCard} />

        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <OffersList id={id} cityName={city.name} offers={nearbyOffers} onCardHover={handleCardHover} />
          </section>
        </div>
      </main>
    </div>
  );
}
