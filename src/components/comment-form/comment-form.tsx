import { useState, Fragment, ChangeEvent, FormEvent } from 'react';
import { MIN_COMMENT_LENGTH, MAX_COMMENT_LENGTH } from '../../const';
import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch';
import { postComment } from '../../store/api-actions';
import { useAppSelector } from '../../hooks/useAppSelector/useAppSelector';
import { getActiveId } from '../../store/offers-process/selectors';
import { getCommentPostStatus } from '../../store/comments-process/selectors';

type CommentFormProps = {
  scrollToReviewsTitle: () => void;
}

export const CommentForm = ({ scrollToReviewsTitle }: CommentFormProps) => {
  const dispatch = useAppDispatch();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');
  const offerId = useAppSelector(getActiveId);
  const isCommentPosting = useAppSelector(getCommentPostStatus);

  const resetForm = () => {
    setComment('');
    setRating('');
  };

  const ratingMap = {
    '5': 'perfect',
    '4': 'good',
    '3': 'not bad',
    '2': 'badly',
    '1': 'terribly',
  };

  const handleTextareaChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.target.value);
  };

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRating(evt.target.value);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    (async () => {
      if (offerId !== null) {
        await dispatch(postComment({
          id: offerId,
          comment: comment,
          rating: Number(rating),
        }));
        resetForm();
        scrollToReviewsTitle();
      }
    })();
  };

  const isValid =
    comment.length >= MIN_COMMENT_LENGTH &&
    comment.length <= MAX_COMMENT_LENGTH &&
    rating !== '' &&
    !isCommentPosting;

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {Object.entries(ratingMap)
          .reverse()
          .map(([score, title]) => (
            <Fragment key={score}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={score}
                id={`${score}-stars`}
                type="radio"
                checked={rating === score}
                onChange={handleInputChange}
              />
              <label
                htmlFor={`${score}-stars`}
                className="reviews__rating-label form__rating-label"
                title={title}
              >
                <svg className="form__star-image" width={37} height={33}>
                  <use xlinkHref="#icon-star" />
                </svg>
              </label>
            </Fragment>
          ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={handleTextareaChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe
          your stay with at least{' '}
          <b className="reviews__text-amount">{MIN_COMMENT_LENGTH} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isValid}
        >
          {isCommentPosting ? 'Posting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};
