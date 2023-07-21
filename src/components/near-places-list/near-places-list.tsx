import { NearPlaceCard } from '../near-place-card/near-place-card';
import { OfferType } from '../types/offer';

type NearPlacesListProps = {
  id: string | undefined;
  cityName: string;
  offers: OfferType[];
}

export function NearPlacesList({ id, cityName, offers }: NearPlacesListProps) {
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
          <NearPlaceCard
            key={filteredOffer.id}
            id={filteredOffer.id}
            isFavorite={filteredOffer.isFavorite}
            isPremium={filteredOffer.isPremium}
            price={filteredOffer.price}
            previewImage={filteredOffer.previewImage}
            rating={filteredOffer.rating}
            title={filteredOffer.title}
            type={filteredOffer.type}
          />
        )
        )}
      </div>
    </section>
  );
}
