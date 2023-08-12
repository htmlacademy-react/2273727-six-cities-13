import { OfferCard } from '../offer-card/offer-card';
import { OfferType } from '../types/offer';
import { MouseEvent, memo, useCallback } from 'react';

type OffersListProps = {
  offers: OfferType[];
  onCardHover?: (id: string | undefined) => void;
  id?: string;
  cityName?: string;
}

const OffersListComponent = ({ offers, onCardHover, id, cityName }: OffersListProps) => {
  const handleCardEnter = useCallback((event: MouseEvent<HTMLLIElement>) => {
    if (onCardHover === undefined) {
      return;
    }
    event.preventDefault();
    onCardHover(event.currentTarget.id);
  }, [onCardHover]);

  const handleCardLeave = useCallback((event: MouseEvent<HTMLLIElement>) => {
    if (onCardHover === undefined) {
      return;
    }
    event.preventDefault();
    onCardHover(undefined);
  }, [onCardHover]);

  const filteredOffers = cityName
    ? offers.filter((offer) => offer.id !== id)
    : offers;

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
          {...(!cityName && { handleCardEnter, handleCardLeave })}
        />
      )
      )}
    </div>
  );
};

export const OffersList = memo(OffersListComponent);
