import { FullOfferType } from '../components/types/full-offer';

export const fullOffers: FullOfferType[] = [
  {
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
  },
  {
    id: 'c01e7763-6d71-422f-9a42-ec802cbee4c3',
    title: 'Perfectly located Castro',
    description: 'I am happy to welcome you to my apartment in the city center! Three words: location, cosy and chic!',
    type: 'hotel',
    price: 460,
    images: [
      'https://13.design.pages.academy/static/hotel/18.jpg',
      'https://13.design.pages.academy/static/hotel/19.jpg',
      'https://13.design.pages.academy/static/hotel/4.jpg',
      'https://13.design.pages.academy/static/hotel/11.jpg',
      'https://13.design.pages.academy/static/hotel/9.jpg',
      'https://13.design.pages.academy/static/hotel/16.jpg'
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
      latitude: 50.950361,
      longitude: 6.961974,
      zoom: 16
    },
    goods: [
      'Coffee machine',
      'Towels',
      'Dishwasher',
      'Kitchen',
      'Wi-Fi',
      'Fridge',
      'Laptop friendly workspace',
      'Washing machine',
      'Heating',
      'Cable TV',
      'Air conditioning'
    ],
    host: {
      isPro: false,
      name: 'Maximus',
      avatarUrl: 'https://13.design.pages.academy/static/host/avatar-angelina.jpg'
    },
    isPremium: true,
    isFavorite: true,
    rating: 4.5,
    bedrooms: 2,
    maxAdults: 9
  },
  {
    id: 'a23d8b94-a7e3-487b-ad86-813b4ff3ace1',
    title: 'The Pondhouse - A Magical Place',
    description: 'Discover daily local life in city center, friendly neighborhood, clandestine casino, karaoke, old-style artisans, art gallery and artist studio downstairs.',
    type: 'house',
    price: 728,
    images: [
      'https://13.design.pages.academy/static/hotel/20.jpg',
      'https://13.design.pages.academy/static/hotel/6.jpg',
      'https://13.design.pages.academy/static/hotel/3.jpg',
      'https://13.design.pages.academy/static/hotel/15.jpg',
      'https://13.design.pages.academy/static/hotel/5.jpg',
      'https://13.design.pages.academy/static/hotel/1.jpg'
    ],
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
    goods: [
      'Dishwasher',
      'Wi-Fi',
      'Kitchen',
      'Coffee machine',
      'Laptop friendly workspace',
      'Washer'
    ],
    host: {
      isPro: true,
      name: 'Angelina',
      avatarUrl: 'https://13.design.pages.academy/static/host/avatar-angelina.jpg'
    },
    isPremium: false,
    isFavorite: false,
    rating: 3.4,
    bedrooms: 2,
    maxAdults: 1
  },
  {
    id: '72276101-e585-4bce-aa52-84e2e4907400',
    title: 'Nice, cozy, warm big bed apartment',
    description: 'A new spacious villa, one floor. All commodities, jacuzzi and beautiful scenery. Ideal for families or friends.',
    type: 'room',
    price: 173,
    images: [
      'https://13.design.pages.academy/static/hotel/6.jpg',
      'https://13.design.pages.academy/static/hotel/15.jpg',
      'https://13.design.pages.academy/static/hotel/3.jpg',
      'https://13.design.pages.academy/static/hotel/7.jpg',
      'https://13.design.pages.academy/static/hotel/4.jpg',
      'https://13.design.pages.academy/static/hotel/18.jpg'
    ],
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
    goods: [
      'Towels',
      'Baby seat',
      'Kitchen'
    ],
    host: {
      isPro: true,
      name: 'Oliver Conner',
      avatarUrl: 'https://13.design.pages.academy/static/host/avatar-angelina.jpg'
    },
    isPremium: true,
    isFavorite: false,
    rating: 2.3,
    bedrooms: 1,
    maxAdults: 1
  }
];
