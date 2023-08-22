import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { ReviewType } from '../../components/types/review';

type CommentsProcessType = {
  reviews: ReviewType[] | null;
  isReviewsLoading: boolean;
  isCommentPosting: boolean;
};

export const initialState: CommentsProcessType = {
  reviews: null,
  isReviewsLoading: false,
  isCommentPosting: false,
};

export const commentsProcessSlice = createSlice({
  name: NameSpace.Comments,
  initialState,
  reducers: {
    setReviews: (state, action: PayloadAction<ReviewType[]>) => {
      state.reviews = action.payload;
    },
    setReviewsLoadStatus: (state, action: PayloadAction<boolean>) => {
      state.isReviewsLoading = action.payload;
    },
    setCommentPostStatus: (state, action: PayloadAction<boolean>) => {
      state.isCommentPosting = action.payload;
    },
  }
});

export const {setReviews, setReviewsLoadStatus, setCommentPostStatus} = commentsProcessSlice.actions;

