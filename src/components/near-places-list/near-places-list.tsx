import { OfferCard } from '../offer-card/offer-card';
import { OfferType } from '../types/offer';
import { MouseEvent } from 'react';

type NearPlacesListProps = {
  id: string | undefined;
  cityName: string;
  offers: OfferType[];
  onCardHover: (id: string | undefined) => void;
}

export function NearPlacesList({ id, cityName, offers, onCardHover }: NearPlacesListProps) {
  const handleCardEnter = (event: MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    onCardHover(event.currentTarget.id);
  };

  const handleCardLeave = (event: MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    onCardHover(undefined);
  };

  const filteredOffers = offers.filter((offer) => offer.city.name === cityName && offer.id !== id);
  if (filteredOffers.length === 0) {
    return;
  }

  return (
    <section className="near-places places">
      <h2 className="near-places__title">
        Other places in the neighbourhood
      </h2>
      <div className="near-places__list places__list">
        {filteredOffers.map((filteredOffer) => (
          <OfferCard
            key={filteredOffer.id}
            id={filteredOffer.id}
            isFavorite={filteredOffer.isFavorite}
            isMain={false}
            isPremium={filteredOffer.isPremium}
            price={filteredOffer.price}
            previewImage={filteredOffer.previewImage}
            rating={filteredOffer.rating}
            title={filteredOffer.title}
            type={filteredOffer.type}
            handleCardEnter={handleCardEnter}
            handleCardLeave={handleCardLeave}
          />
        )
        )}
      </div>
    </section>
  );
}
