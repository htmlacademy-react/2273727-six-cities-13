import { offersProcessSlice, OffersProcessType } from './offers-process';
import { initialState } from './offers-process';
import { mockOffers } from '../mocks/offers';


describe('Offers Process Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const result = offersProcessSlice.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };

    const result = offersProcessSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should set active city', () => {
    const action = offersProcessSlice.actions.setActiveCity('New York');

    const result = offersProcessSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      activeCity: 'New York',
    };

    expect(result).toEqual(expectedState);
  });

  it('should set active ID', () => {
    const action = offersProcessSlice.actions.setActiveId('abc123');

    const result = offersProcessSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      activeId: 'abc123',
    };

    expect(result).toEqual(expectedState);
  });

  it('should set current offer', () => {
    const startState: OffersProcessType = {
      ...initialState,
      activeId: 'c01e7763-6d71-422f-9a42-ec802cbee4c3',
      offers: mockOffers,
    };
    const action = offersProcessSlice.actions.setCurrentOffer();

    const result = offersProcessSlice.reducer(startState, action);

    const expectedState = {
      ...startState,
      currentOffer: mockOffers[1],
    };

    expect(result).toEqual(expectedState);
  });

  it('should set offers', () => {
    const newOffers = mockOffers;
    const action = offersProcessSlice.actions.setOffers(newOffers);

    const result = offersProcessSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      offers: newOffers,
    };

    expect(result).toEqual(expectedState);
  });

  it('should set offers backup', () => {

    const newOffersBackup = mockOffers;
    const action = offersProcessSlice.actions.setOffersBackup(newOffersBackup);

    const result = offersProcessSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      offersBackup: newOffersBackup,
    };

    expect(result).toEqual(expectedState);
  });

  it('should set offers load status', () => {

    const action = offersProcessSlice.actions.setOffersLoadStatus(false);

    const result = offersProcessSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      isOffersLoading: false,
    };

    expect(result).toEqual(expectedState);
  });

  it('should set full offer', () => {

    const newFullOffer = {
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
    const action = offersProcessSlice.actions.setFullOffer(newFullOffer);

    const result = offersProcessSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      fullOffer: newFullOffer,
    };

    expect(result).toEqual(expectedState);
  });

  it('should set full offer load status', () => {
    const action = offersProcessSlice.actions.setFullOfferLoadStatus(false);

    const result = offersProcessSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      isFullOfferLoading: false,
    };

    expect(result).toEqual(expectedState);
  });

  it('should set favorite offers', () => {
    const newFavOffers = mockOffers;
    const action = offersProcessSlice.actions.setFavOffers(newFavOffers);

    const result = offersProcessSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      favOffers: newFavOffers,
    };

    expect(result).toEqual(expectedState);
  });

  it('should set favorite offers load status', () => {

    const action = offersProcessSlice.actions.setFavOffersLoadStatus(false);

    const result = offersProcessSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      isFavOffersLoading: false,
    };

    expect(result).toEqual(expectedState);
  });

  it('should sort offers by popularity', () => {
    const startState: OffersProcessType = {
      ...initialState,
      offers: mockOffers,
      offersBackup: mockOffers,
    };
    const action = offersProcessSlice.actions.sortOffers('Popular');

    const result = offersProcessSlice.reducer(startState, action);

    const expectedState = {
      ...startState,
      activeSortType: 'Popular',
      offers: startState.offersBackup,
    };

    expect(result).toEqual(expectedState);
  });

  it('should sort offers by price to high', () => {
    const startState = {
      ...initialState,
      offers: mockOffers,
    };

    const action = offersProcessSlice.actions.sortOffers('Price: low to high');

    const result = offersProcessSlice.reducer(startState, action);

    const expectedOffers = [
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
    ];

    const expectedState = {
      ...startState,
      activeSortType: 'Price: low to high',
      offers: expectedOffers,
    };

    expect(result).toEqual(expectedState);
  });

  it('should sort offers by price to low', () => {
    const startState = {
      ...initialState,
      offers: mockOffers,
    };
    const action = offersProcessSlice.actions.sortOffers('Price: high to low');

    const result = offersProcessSlice.reducer(startState, action);

    const expectedOffers = [
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

    const expectedState = {
      ...initialState,
      activeSortType: 'Price: high to low',
      offers: expectedOffers,
    };

    expect(result).toEqual(expectedState);
  });

  it('should sort offers by top rated', () => {
    const startState = {
      ...initialState,
      offers: mockOffers,
    };

    const action = offersProcessSlice.actions.sortOffers('Top rated first');

    const result = offersProcessSlice.reducer(startState, action);

    const expectedOffers = [
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

    const expectedState = {
      ...startState,
      activeSortType: 'Top rated first',
      offers: expectedOffers,
    };

    expect(result).toEqual(expectedState);
  });
});
