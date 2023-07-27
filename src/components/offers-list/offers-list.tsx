import { OfferCard } from '../offer-card/offer-card';
import { OfferType } from '../types/offer';
import { MouseEvent } from 'react';

type OffersListProps = {
  offers: OfferType[];
  onCardHover: (id: string | undefined) => void;
  id?: string;
  cityName?: string;
}

export function OffersList({ offers, onCardHover, id, cityName }: OffersListProps) {
  const handleCardEnter = (event: MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    onCardHover(event.currentTarget.id);
  };

  const handleCardLeave = (event: MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    onCardHover(undefined);
  };

  const filteredOffers = (cityName) ? offers.filter((offer) => offer.city.name === cityName && offer.id !== id) : offers;

  const className = (cityName) ? 'near-places__list places__list' : 'cities__places-list places__list tabs__content';

  return (
    <div className={className}>
      {filteredOffers.map((offer) => (
        <OfferCard
          key={offer.id}
          id={offer.id}
          isFavorite={offer.isFavorite}
          isMain={!cityName}
          isPremium={offer.isPremium}
          price={offer.price}
          previewImage={offer.previewImage}
          rating={offer.rating}
          title={offer.title}
          type={offer.type}
          handleCardEnter={handleCardEnter}
          handleCardLeave={handleCardLeave}
        />
      )
      )}
    </div>
  );
}
