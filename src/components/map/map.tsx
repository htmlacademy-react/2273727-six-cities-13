import { Icon, Marker, layerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRef, useEffect } from 'react';
import { useMap } from '../../hooks/useMap/useMap';
import { CityType } from '../types/full-offer';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../const';
import { OfferType } from '../types/offer';

type MapProps = {
  isMain: boolean;
  city: CityType;
  offers: OfferType[];
  selectedCard: OfferType | undefined;
}

const defaultIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const offersMapStyle = {
  width: '1144px',
  height: '579px',
  margin: '0px auto 50px',
};

export function Map({ isMain, city, offers, selectedCard }: MapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  const cityLocation = city.location;

  useEffect(() => {
    if (map) {
      const { latitude, longitude, zoom } = cityLocation;
      map.flyTo([latitude, longitude], zoom);
    }
  }, [map, cityLocation]);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker
          .setIcon(
            selectedCard !== undefined && offer.id === selectedCard.id
              ? currentIcon
              : defaultIcon
          ).addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedCard]);

  return (
    <section
      className={isMain ? 'cities__map map' : 'offer__map map'}
      ref={mapRef}
      style={isMain ? {} : offersMapStyle}
    >
    </section>
  );
}
