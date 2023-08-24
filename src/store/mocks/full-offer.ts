import { FullOfferType } from '../../components/types/full-offer';

export const mockFullOffer: FullOfferType = {
  id: 'cc86c284-5f68-4393-94f1-888b054e31d2',
  title: 'The Joshua Tree House',
  description: 'Design interior in most sympathetic area! Complitely renovated, well-equipped, cosy studio in idyllic, over 100 years old wooden house. Calm street, fast connection to center and airport.',
  type: 'hotel',
  price: 288,
  images: [
    'https://13.design.pages.academy/static/hotel/20.jpg',
    'https://13.design.pages.academy/static/hotel/8.jpg',
    'https://13.design.pages.academy/static/hotel/3.jpg',
    'https://13.design.pages.academy/static/hotel/19.jpg',
    'https://13.design.pages.academy/static/hotel/13.jpg',
    'https://13.design.pages.academy/static/hotel/15.jpg'
  ],
  city: {
    name: 'Amsterdam',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13
    }
  },
  location: {
    latitude: 52.3909553943508,
    longitude: 4.85309666406198,
    zoom: 16
  },
  goods: [
    'Breakfast',
    'Towels',
    'Washing machine',
    'Air conditioning',
    'Cable TV'
  ],
  host: {
    isPro: true,
    name: 'Angelina',
    avatarUrl: 'https://13.design.pages.academy/static/host/avatar-angelina.jpg'
  },
  isPremium: false,
  isFavorite: true,
  rating: 3.1,
  bedrooms: 5,
  maxAdults: 7
};
