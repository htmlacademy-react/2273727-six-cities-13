import { OfferType } from '../components/types/offer';


export const offers: OfferType[] = [
  {
    id: self.crypto.randomUUID(),
    title: 'Beautiful & luxurious studio at great location',
    type: 'apartment',
    price: 120,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8
      }
    },
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8
    },
    isFavorite: false,
    isPremium: false,
    rating: 4,
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    bedrooms: 3,
    goods: [
      'Heating'
    ],
    host: {
      name: 'Oliver Conner',
      avatarUrl: 'https://url-to-image/image.png',
      isPro: false
    },
    images: [
      'https://url-to-image/image.png'
    ],
    maxAdults: 4
  },
  {
    id: self.crypto.randomUUID(),
    title: 'Small studio at great location',
    type: 'studio',
    price: 80,
    city: {
      name: 'Paris',
      location: {
        latitude: 13.21514348496378,
        longitude: 34.673877537499948,
        zoom: 8
      }
    },
    location: {
      latitude: 13.21514348496378,
      longitude: 34.673877537499948,
      zoom: 8
    },
    isFavorite: false,
    isPremium: false,
    rating: 5,
    description: 'A studio in Paris',
    bedrooms: 1,
    goods: [
      'Heating'
    ],
    host: {
      name: 'Mad Max',
      avatarUrl: 'https://url-to-image/image.png',
      isPro: false
    },
    images: [
      'https://url-to-image/image.png'
    ],
    maxAdults: 2
  },
  {
    id: self.crypto.randomUUID(),
    title: 'Big house at Red Square',
    type: 'house',
    price: 800,
    city: {
      name: 'Moscow',
      location: {
        latitude: 13.35514938496378,
        longitude: 7.673877537499948,
        zoom: 8
      }
    },
    location: {
      latitude: 13.35514938496378,
      longitude: 7.673877537499948,
      zoom: 8
    },
    isFavorite: false,
    isPremium: false,
    rating: 3,
    description: 'A big house on Red Square',
    bedrooms: 14,
    goods: [
      'Heating'
    ],
    host: {
      name: 'Ivan Petrov',
      avatarUrl: 'https://url-to-image/image.png',
      isPro: false
    },
    images: [
      'https://url-to-image/image.png'
    ],
    maxAdults: 20
  },
  {
    id: self.crypto.randomUUID(),
    title: 'Cozy apartment at New York',
    type: 'apartment',
    price: 200,
    city: {
      name: 'New York',
      location: {
        latitude: 66.35514938496378,
        longitude: 24.673877537499948,
        zoom: 8
      }
    },
    location: {
      latitude: 66.35514938496378,
      longitude: 24.673877537499948,
      zoom: 8
    },
    isFavorite: true,
    isPremium: true,
    rating: 5,
    description: 'A cozy apartment near Central Park',
    bedrooms: 2,
    goods: [
      'Heating'
    ],
    host: {
      name: 'Jane Doe',
      avatarUrl: 'https://url-to-image/image.png',
      isPro: true
    },
    images: [
      'https://url-to-image/image.png'
    ],
    maxAdults: 5
  },
];
