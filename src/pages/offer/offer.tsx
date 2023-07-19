import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Header } from '../../components/header/header';
import { TFullOffer } from '../../components/types/full-offer';
import { ImgContainer } from '../../components/img-container/img-container';
import { NotFound } from '../404/404';
import { Goods } from '../../components/goods/goods';
import { Host } from '../../components/host/host';
import { Reviews } from '../../components/reviews/reviews';


type OfferProps = {
  fullOffers: TFullOffer[];
}

export function Offer({ fullOffers }: OfferProps) {
  const idContainer = useParams();
  const offer = fullOffers.find((item) => item.id === idContainer.id);
  if (offer === undefined) {
    return <NotFound />;
  }

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
              <ImgContainer images={offer.images} />
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              <div className={`offer__mark ${offer.isPremium ? '' : 'visually-hidden'}`} >
                <span>Premium</span>
              </div>
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offer.title}
                </h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${offer.rating * 20}%` }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{offer.type.charAt(0).toUpperCase() + offer.type.slice(1)}</li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">€{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>

              <Goods goods={offer.goods}/>

              <Host offer={offer} />

              <Reviews />

            </div>
          </div>
          <section className="offer__map map" />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              <article className="near-places__card place-card">
                <div className="near-places__image-wrapper place-card__image-wrapper">
                  <Link to="#">
                    <img
                      className="place-card__image"
                      src="img/room.jpg"
                      width={260}
                      height={200}
                      alt="Place image"
                    />
                  </Link>
                </div>
                <div className="place-card__info">
                  <div className="place-card__price-wrapper">
                    <div className="place-card__price">
                      <b className="place-card__price-value">€80</b>
                      <span className="place-card__price-text">/&nbsp;night</span>
                    </div>
                    <button
                      className="place-card__bookmark-button place-card__bookmark-button--active button"
                      type="button"
                    >
                      <svg
                        className="place-card__bookmark-icon"
                        width={18}
                        height={19}
                      >
                        <use xlinkHref="#icon-bookmark" />
                      </svg>
                      <span className="visually-hidden">In bookmarks</span>
                    </button>
                  </div>
                  <div className="place-card__rating rating">
                    <div className="place-card__stars rating__stars">
                      <span style={{ width: '80%' }} />
                      <span className="visually-hidden">Rating</span>
                    </div>
                  </div>
                  <h2 className="place-card__name">
                    <Link to="#">Wood and stone place</Link>
                  </h2>
                  <p className="place-card__type">Private room</p>
                </div>
              </article>
              <article className="near-places__card place-card">
                <div className="near-places__image-wrapper place-card__image-wrapper">
                  <Link to="#">
                    <img
                      className="place-card__image"
                      src="img/apartment-02.jpg"
                      width={260}
                      height={200}
                      alt="Place image"
                    />
                  </Link>
                </div>
                <div className="place-card__info">
                  <div className="place-card__price-wrapper">
                    <div className="place-card__price">
                      <b className="place-card__price-value">€132</b>
                      <span className="place-card__price-text">/&nbsp;night</span>
                    </div>
                    <button
                      className="place-card__bookmark-button button"
                      type="button"
                    >
                      <svg
                        className="place-card__bookmark-icon"
                        width={18}
                        height={19}
                      >
                        <use xlinkHref="#icon-bookmark" />
                      </svg>
                      <span className="visually-hidden">To bookmarks</span>
                    </button>
                  </div>
                  <div className="place-card__rating rating">
                    <div className="place-card__stars rating__stars">
                      <span style={{ width: '80%' }} />
                      <span className="visually-hidden">Rating</span>
                    </div>
                  </div>
                  <h2 className="place-card__name">
                    <Link to="#">Canal View Prinsengracht</Link>
                  </h2>
                  <p className="place-card__type">Apartment</p>
                </div>
              </article>
              <article className="near-places__card place-card">
                <div className="place-card__mark">
                  <span>Premium</span>
                </div>
                <div className="near-places__image-wrapper place-card__image-wrapper">
                  <Link to="#">
                    <img
                      className="place-card__image"
                      src="img/apartment-03.jpg"
                      width={260}
                      height={200}
                      alt="Place image"
                    />
                  </Link>
                </div>
                <div className="place-card__info">
                  <div className="place-card__price-wrapper">
                    <div className="place-card__price">
                      <b className="place-card__price-value">€180</b>
                      <span className="place-card__price-text">/&nbsp;night</span>
                    </div>
                    <button
                      className="place-card__bookmark-button button"
                      type="button"
                    >
                      <svg
                        className="place-card__bookmark-icon"
                        width={18}
                        height={19}
                      >
                        <use xlinkHref="#icon-bookmark" />
                      </svg>
                      <span className="visually-hidden">To bookmarks</span>
                    </button>
                  </div>
                  <div className="place-card__rating rating">
                    <div className="place-card__stars rating__stars">
                      <span style={{ width: '100%' }} />
                      <span className="visually-hidden">Rating</span>
                    </div>
                  </div>
                  <h2 className="place-card__name">
                    <Link to="#">Nice, cozy, warm big bed apartment</Link>
                  </h2>
                  <p className="place-card__type">Apartment</p>
                </div>
              </article>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
