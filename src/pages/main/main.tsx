import { OffersList } from '../../components/offers-list/offers-list';
import { Helmet } from 'react-helmet-async';
import { Header } from '../../components/header/header';
import { SortOptions } from '../../components/sort-options/sort-options';
import { OfferType } from '../../components/types/offer';
import { Map } from '../../components/map/map';
import { useState, memo, useCallback } from 'react';
import { CititesList } from '../../components/cities-list/cities-list';
import { useAppSelector } from '../../hooks/useAppSelector/useAppSelector';
import { LoadingScreen } from '../loading-screen/loading-screen';
import * as selectors from '../../store/selectors';
import { createSelector } from '@reduxjs/toolkit';
import { AuthStatus } from '../../const';

function MainPageComponent() {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  const handleCardHover = useCallback((id: string | undefined) => {
    setSelectedId(id);
  }, []);

  const activeCityName = useAppSelector(selectors.activeCity);
  const offers = useAppSelector(selectors.offers);
  const isOffersLoading = useAppSelector(selectors.isOfferLoading);
  const filteredOffers = createSelector(selectors.offers, (state) => state?.filter((offer) => offer.city.name === activeCityName));

  const offersByCity = useAppSelector(filteredOffers) as OfferType[];
  const authStatus = useAppSelector(selectors.authorizationStatus);

  if (isOffersLoading || authStatus === AuthStatus.Unknown || offers === null) {
    return (
      <LoadingScreen />
    );
  }

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
              <Map isMain city={currentCity} offers={offersByCity} selectedId={selectedId} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export const MainPage = memo(MainPageComponent);
