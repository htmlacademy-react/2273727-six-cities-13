import { offersProcessSlice, OffersProcessType } from './offers-process';
import { initialState } from './offers-process';
import { offers } from '../mocks/offers';

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
      activeCity: 'Paris',
      activeId: 'abc123',
      activeSortType: 'Popular',
      currentOffer: null,
      offers: offers,
      offersBackup: [],
      fullOffer: null,
      isFullOfferLoading: false,
      isOffersLoading: true,
      favOffers: [],
      isFavOffersLoading: true,
      hasError: false,
    };
    const action = offersProcessSlice.actions.setCurrentOffer();

    const result = offersProcessSlice.reducer(startState, action);

    const expectedState = {
      ...initialState,
      currentOffer: initialState.offers[0],
    };

    expect(result).toEqual(expectedState);
  });

  it('should set offers', () => {
    const newOffers = offers;
    const action = offersProcessSlice.actions.setOffers(newOffers);

    const result = offersProcessSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      offers: newOffers,
    };

    expect(result).toEqual(expectedState);
  });

  it('should set offers backup', () => {

    const newOffersBackup = offers;
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

    const newFullOffer = { id: 'abc123', /* ... */ };
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
    const newFavOffers = [
      { id: 'abc123', /* ... */ },
      { id: 'def456', /* ... */ },
    ];
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
    const initialState = {
      activeCity: 'Paris',
      activeId: null,
      activeSortType: 'PriceToHigh',
      currentOffer: null,
      offers: [
        { id: 'abc123', price: 100, /* ... */ },
        { id: 'def456', price: 200, /* ... */ },
      ],
      offersBackup: [
        { id: 'abc123', price: 100, /* ... */ },
        { id: 'def456', price: 200, /* ... */ },
      ],
      fullOffer: null,
      isFullOfferLoading: false,
      isOffersLoading: true,
      favOffers: [],
      isFavOffersLoading: true,
      hasError: false,
    };
    const action = offersProcessSlice.actions.sortOffers('Popular');

    const result = offersProcessSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      activeSortType: 'Popular',
      offers: initialState.offersBackup,
    };

    expect(result).toEqual(expectedState);
  });

  it('should sort offers by price to high', () => {
    const initialState = {
      activeCity: 'Paris',
      activeId: null,
      activeSortType: 'Popular',
      currentOffer: null,
      offers: [
        { id: 'abc123', price: 200, /* ... */ },
        { id: 'def456', price: 100, /* ... */ },
      ],
      offersBackup: [
        { id: 'abc123', price: 200, /* ... */ },
        { id: 'def456', price: 100, /* ... */ },
      ],
      fullOffer: null,
      isFullOfferLoading: false,
      isOffersLoading: true,
      favOffers: [],
      isFavOffersLoading: true,
      hasError: false,
    };
    const action = offersProcessSlice.actions.sortOffers('PriceToHigh');

    const result = offersProcessSlice.reducer(initialState, action);

    const sortedOffers = [...initialState.offersBackup].sort((a, b) => a.price - b.price);
    const expectedState = {
      ...initialState,
      activeSortType: 'PriceToHigh',
      offers: sortedOffers,
    };

    expect(result).toEqual(expectedState);
  });

  it('should sort offers by price to low', () => {
    const initialState = {
      activeCity: 'Paris',
      activeId: null,
      activeSortType: 'Popular',
      currentOffer: null,
      offers: [
        { id: 'abc123', price: 100, /* ... */ },
        { id: 'def456', price: 200, /* ... */ },
      ],
      offersBackup: [
        { id: 'abc123', price: 100, /* ... */ },
        { id: 'def456', price: 200, /* ... */ },
      ],
      fullOffer: null,
      isFullOfferLoading: false,
      isOffersLoading: true,
      favOffers: [],
      isFavOffersLoading: true,
      hasError: false,
    };
    const action = offersProcessSlice.actions.sortOffers('PriceToLow');

    const result = offersProcessSlice.reducer(initialState, action);

    const sortedOffers = [...initialState.offersBackup].sort((a, b) => b.price - a.price);
    const expectedState = {
      ...initialState,
      activeSortType: 'PriceToLow',
      offers: sortedOffers,
    };

    expect(result).toEqual(expectedState);
  });

  it('should sort offers by top rated', () => {
    const initialState = {
      activeCity: 'Paris',
      activeId: null,
      activeSortType: 'Popular',
      currentOffer: null,
      offers: [
        { id: 'abc123', rating: 4.5, /* ... */ },
        { id: 'def456', rating: 3.8, /* ... */ },
      ],
      offersBackup: [
        { id: 'abc123', rating: 4.5, /* ... */ },
        { id: 'def456', rating: 3.8, /* ... */ },
      ],
      fullOffer: null,
      isFullOfferLoading: false,
      isOffersLoading: true,
      favOffers: [],
      isFavOffersLoading: true,
      hasError: false,
    };
    const action = offersProcessSlice.actions.sortOffers('TopRated');

    const result = offersProcessSlice.reducer(initialState, action);

    const sortedOffers = [...initialState.offersBackup].sort((a, b) => b.rating - a.rating);
    const expectedState = {
      ...initialState,
      activeSortType: 'TopRated',
      offers: sortedOffers,
    };

    expect(result).toEqual(expectedState);
  });
});
