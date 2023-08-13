import { NameSpace } from '../../const';
import { State } from '../../hooks/useAppSelector/useAppSelector';
import { ReviewType } from '../../components/types/review';

export const getReviews = (state: State): ReviewType[] | null => state[NameSpace.Comments].reviews;
export const getReviewsLoadStatus = (state: State): boolean => state[NameSpace.Comments].isReviewsLoading;
export const getCommentPostStatus = (state: State): boolean => state[NameSpace.Comments].isCommentPosting;

