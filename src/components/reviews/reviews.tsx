import { CommentForm } from '../comment-form/comment-form';
import { formatDateToHuman, formatDateToServer } from '../../utils';
import * as selectors from '../../store/selectors';
import { useAppSelector } from '../../hooks/useAppSelector/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch';
import { AuthStatus } from '../../const';
import { useEffect } from 'react';
import { RATING_COEFFICIENT } from '../../const';
import { fetchReviews } from '../../store/api-actions';


export const Reviews = () => {
  const dispatch = useAppDispatch();
  const offerId = useAppSelector(selectors.activeId) as string;
  const authStatus = useAppSelector(selectors.authorizationStatus);
  const isCommentPosting = useAppSelector(selectors.isCommentPosting);
  const isOffersLoading = useAppSelector(selectors.isOffersLoading);

  useEffect(() => {
    dispatch(fetchReviews({ id: offerId }));
  }, [offerId, dispatch, isCommentPosting, isOffersLoading]
  );

  const reviews = useAppSelector(selectors.reviews);

  if (reviews !== null) {
    return (
      <section className="offer__reviews reviews">
        <h2 className="reviews__title">
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
        {authStatus === AuthStatus.Auth && <CommentForm />}
      </section>
    );
  }
};
