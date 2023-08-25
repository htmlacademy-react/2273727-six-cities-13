import { nearbyOffersProcessSlice, initialState } from './nearby-offers-process';
import { mockOffers } from '../mocks/mock-offers';

describe('Nearby Offers Process Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const result = nearbyOffersProcessSlice.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };

    const result = nearbyOffersProcessSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should set nearby offers', () => {
    const action = nearbyOffersProcessSlice.actions.setNearbyOffers(mockOffers);

    const result = nearbyOffersProcessSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      nearbyOffers: mockOffers,
    };

    expect(result).toEqual(expectedState);
  });

  it('should set nearby offers load status', () => {
    const action = nearbyOffersProcessSlice.actions.setNearbyOffersLoadStatus(true);

    const result = nearbyOffersProcessSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      isNearbyOffersLoading: true,
    };

    expect(result).toEqual(expectedState);
  });
});
