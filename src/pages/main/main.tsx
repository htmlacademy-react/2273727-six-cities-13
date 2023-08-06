import { OffersList } from '../../components/offers-list/offers-list';
import { Helmet } from 'react-helmet-async';
import { Header } from '../../components/header/header';
import { SortOptions } from '../../components/sort-options/sort-options';
import { OfferType } from '../../components/types/offer';
import { Map } from '../../components/map/map';
import { useState } from 'react';
import { CititesList } from '../../components/cities-list/cities-list';
import { useAppSelector } from '../../hooks/useAppSelector/useAppSelector';
import { LoadingScreen } from '../loading-screen/loading-screen';

export function MainPage() {
  const [selectedCard, setSelectedCard] = useState<OfferType | undefined>(undefined);

  const activeCityName = useAppSelector((state) => state.activeCity);
  const offers = useAppSelector((state) => state.offers);
  const isOffersLoading = useAppSelector((state) => state.isOffersLoading);

  if (isOffersLoading || offers === null) {
    return (
      <LoadingScreen />
    );
  }
  const offersByCity = offers.filter((item) => item.city.name === activeCityName);

  const handleCardHover = (id: string | undefined) => {
    if (!id) {
      setSelectedCard(undefined);
    }
    const currentCard = offers.find((offer) => offer.id === id);
    setSelectedCard(currentCard);
  };

  const currentCity = offersByCity[0].city;

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
              <SortOptions />
              <OffersList offers={offersByCity} onCardHover={handleCardHover} />
            </section>
            <div className="cities__right-section">
              <Map isMain city={currentCity} offers={offersByCity} selectedCard={selectedCard} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
