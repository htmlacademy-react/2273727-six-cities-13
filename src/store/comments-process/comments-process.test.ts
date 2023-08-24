import { commentsProcessSlice, initialState } from './comments-process';
import { mockReviews } from '../mocks/mock-reviews';

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

  it('should set reviews', () => {
    const action = commentsProcessSlice.actions.setReviews(mockReviews);

    const result = commentsProcessSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      reviews: mockReviews,
    };

    expect(result).toEqual(expectedState);
  });

  it('should set reviews load status', () => {
    const action = commentsProcessSlice.actions.setReviewsLoadStatus(true);

    const result = commentsProcessSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      isReviewsLoading: true,
    };

    expect(result).toEqual(expectedState);
  });

  it('should set comment posting status', () => {
    const action = commentsProcessSlice.actions.setCommentPostStatus(true);

    const result = commentsProcessSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      isCommentPosting: true,
    };

    expect(result).toEqual(expectedState);
  });

});

