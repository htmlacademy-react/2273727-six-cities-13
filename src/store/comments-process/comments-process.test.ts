import { commentsProcessSlice, initialState } from './comments-process';

describe('Comments Process Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const result = commentsProcessSlice.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };

    const result = commentsProcessSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should set nearby offers', () => {
    const action = commentsProcessSlice.actions.setReviews();

    const result = commentsProcessSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      nearbyOffers: mockOffers,
    };

    expect(result).toEqual(expectedState);
  });


});

