import { OfferType } from '../components/types/offer';


export const offers: OfferType[] = [
  {
    id: 'cc86c284-5f68-4393-94f1-888b054e31d2',
    title: 'The Joshua Tree House',
    type: 'hotel',
    price: 288,
    previewImage: 'https://13.design.pages.academy/static/hotel/16.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.868610000000004,
      longitude: 2.342499,
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
      latitude: 50.950361,
      longitude: 6.961974,
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
      name: 'Cologne',
      location: {
        latitude: 50.846557,
        longitude: 4.351697,
        zoom: 13
      }
    },
    location: {
      latitude: 50.854557,
      longitude: 4.364697,
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
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    location: {
      latitude: 52.36554,
      longitude: 4.911976,
      zoom: 16
    },
    isFavorite: false,
    isPremium: true,
    rating: 2.3
  },
];
