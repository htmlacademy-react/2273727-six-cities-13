import { OfferCard } from '../offer-card/offer-card';
import { OfferType } from '../types/offer';
import { MouseEvent } from 'react';

type OffersListProps = {
  offers: OfferType[];
  onCardHover: (id: string | undefined) => void;
}

export function OffersList({ offers, onCardHover }: OffersListProps) {
  const handleCardEnter = (event: MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    onCardHover(event.currentTarget.id);
  };

  const handleCardLeave = (event: MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    onCardHover(undefined);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          id={offer.id}
          isFavorite={offer.isFavorite}
          isMain
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
