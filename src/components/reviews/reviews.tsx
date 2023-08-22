import { CommentForm } from '../comment-form/comment-form';
import { formatDateToHuman, formatDateToServer } from '../../utils';
import { useAppSelector } from '../../hooks/useAppSelector/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch';
import { AuthStatus, RATING_COEFFICIENT } from '../../const';
import { useEffect, useRef } from 'react';
import { fetchReviews } from '../../store/api-actions';
import { getActiveId } from '../../store/offers-process/selectors';
import { getAuthStatus } from '../../store/user-process.ts/selectors';
import { getReviews, getCommentPostStatus } from '../../store/comments-process/selectors';


export const Reviews = () => {
  const dispatch = useAppDispatch();
  const offerId = useAppSelector(getActiveId);
  const authStatus = useAppSelector(getAuthStatus);
  const isCommentPosting = useAppSelector(getCommentPostStatus);
  const reviewsTitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (offerId === null) {
      return;
    }
    dispatch(fetchReviews({ id: offerId }));
  }, [offerId, dispatch, isCommentPosting]
  );

  const reviews = useAppSelector(getReviews);

  const scrollToReviewsTitle = () => {
    reviewsTitleRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (reviews !== null) {
    return (
      <section className="offer__reviews reviews">
        <h2 className="reviews__title" ref={reviewsTitleRef} >
          Reviews · <span className="reviews__amount">{reviews.length}</span>
        </h2>
        <ul className="reviews__list">
          {Array.from({ length: reviews.length }, (_, i) => {
            const { comment, date, id, rating, user } = reviews[i];
            const { avatarUrl, name } = user;

            return (
              <li className="reviews__item" key={id}>
                <div className="reviews__user user">
                  <div className="reviews__avatar-wrapper  user__avatar-wrapper">
                    <img
                      className="reviews__avatar user__avatar"
                      src={avatarUrl}
                      width={54}
                      height={54}
                      alt="Reviews avatar"
                    />
                  </div>
                  <span className="reviews__user-name">{name}</span>
                </div>
                <div className="reviews__info">
                  <div className="reviews__rating rating">
                    <div className="reviews__stars rating__stars">
                      <span style={{ width: `${rating * RATING_COEFFICIENT}%` }} />
                      <span className="visually-hidden">Rating</span>
                    </div>
                  </div>
                  <p className="reviews__text">
                    {comment}
                  </p>
                  <time className="reviews__time" dateTime={formatDateToServer(date)}>
                    {formatDateToHuman(date)}
                  </time>
                </div>
              </li>
            );
          }
          )}
        </ul>
        {authStatus === AuthStatus.Auth && <CommentForm scrollToReviewsTitle={scrollToReviewsTitle} />}
      </section>
    );
  }
};
