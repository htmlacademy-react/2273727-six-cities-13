import { OfferType } from '../components/types/offer';


export const offers: OfferType[] = [
  {
    id: 'cc86c284-5f68-4393-94f1-888b054e31d2',
    title: 'The Joshua Tree House',
    type: 'hotel',
    price: 288,
    previewImage: 'https://13.design.pages.academy/static/hotel/16.jpg',
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
    isFavorite: true,
    isPremium: false,
    rating: 3.1
  },
  {
    id: 'c01e7763-6d71-422f-9a42-ec802cbee4c3',
    title: 'Perfectly located Castro',
    type: 'hotel',
    price: 460,
    previewImage: 'https://13.design.pages.academy/static/hotel/15.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 50.938361,
        longitude: 6.959974,
        zoom: 13
      }
    },
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 16
    },
    isFavorite: true,
    isPremium: true,
    rating: 4.5
  },
  {
    id: 'a23d8b94-a7e3-487b-ad86-813b4ff3ace1',
    title: 'The Pondhouse - A Magical Place',
    type: 'house',
    price: 728,
    previewImage: 'https://13.design.pages.academy/static/hotel/14.jpg',
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
      longitude: 4.929309666406198,
      zoom: 16
    },
    isFavorite: false,
    isPremium: false,
    rating: 3.4
  },
  {
    id: '72276101-e585-4bce-aa52-84e2e4907400',
    title: 'Nice, cozy, warm big bed apartment',
    type: 'room',
    price: 173,
    previewImage: 'https://13.design.pages.academy/static/hotel/20.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 50.938361,
        longitude: 6.959974,
        zoom: 13
      }
    },
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 16
    },
    isFavorite: false,
    isPremium: true,
    rating: 2.3
  },
];
