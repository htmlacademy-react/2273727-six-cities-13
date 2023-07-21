import { OfferCard } from '../offer-card/offer-card';
import { OfferType } from '../types/offer';

type OffersListProps = {
  offers: OfferType[];
}

export function OffersList({ offers }: OffersListProps) {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) =>
        (
          <OfferCard
            key={offer.id}
            id={offer.id}
            isFavorite={offer.isFavorite}
            isPremium={offer.isPremium}
            price={offer.price}
            previewImage={offer.previewImage}
            rating={offer.rating}
            title={offer.title}
            type={offer.type}
          />
        )
      )}
    </div>
  );
}
