import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Header } from '../../components/header/header';
import { FullOfferType } from '../../components/types/full-offer';
import { ImgContainer } from '../../components/img-container/img-container';
import { Goods } from '../../components/goods/goods';
import { Host } from '../../components/host/host';
import { Reviews } from '../../components/reviews/reviews';
import { reviews } from '../../mocks/reviews';
import { AppRoute } from '../../const';
import { NearPlacesList } from '../../components/near-places-list/near-places-list';
import { OfferType } from '../../components/types/offer';

type OfferProps = {
  fullOffers: FullOfferType[];
  offers: OfferType[];
}

export function Offer({ fullOffers, offers }: OfferProps) {
  const idContainer = useParams();
  const offer = fullOffers.find((item) => item.id === idContainer.id);
  if (offer === undefined) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  const { bedrooms, city, description, goods, host, images, isFavorite, isPremium, maxAdults, price, rating, title, type } = offer;

  const getFavoriteStyles = (isFav: boolean) => {
    if (isFav) {
      return { fill: '#4481c3', stroke: '#4481c3' };
    }
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
          <section className="offer__map map" />
        </section>
        <div className="container">
          <NearPlacesList id={idContainer.id} cityName={city.name} offers={offers} />
        </div>
      </main>
    </div>
  );
}
