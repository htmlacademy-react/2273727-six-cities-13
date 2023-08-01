import { OffersList } from '../../components/offers-list/offers-list';
import { Helmet } from 'react-helmet-async';
import { Header } from '../../components/header/header';
import { OfferType } from '../../components/types/offer';
import { Map } from '../../components/map/map';
import { CITY } from '../../const';
import { useState } from 'react';
import { CititesList } from '../../components/cities-list/cities-list';
import { useAppSelector } from '../../hooks/useAppSelector/useAppSelector';

export function MainPage() {
  const [selectedCard, setSelectedCard] = useState<OfferType | undefined>(undefined);

  const activeCityName = useAppSelector((state) => state.activeCity);
  const offers: OfferType[] = useAppSelector((state) => state.offers);
  const offersByCity = offers.filter((item) => item.city.name === activeCityName);

  const handleCardHover = (id: string | undefined) => {
    if (!id) {
      setSelectedCard(undefined);
    }
    const currentCard = offers.find((offer) => offer.id === id);
    setSelectedCard(currentCard);
  };

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>

      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CititesList />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersByCity.length} places to stay in {activeCityName}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <OffersList offers={offersByCity} onCardHover={handleCardHover} />
            </section>
            <div className="cities__right-section">
              <Map isMain city={CITY} offers={offersByCity} selectedCard={selectedCard} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
