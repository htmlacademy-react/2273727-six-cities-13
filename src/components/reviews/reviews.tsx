import { CommentForm } from '../comment-form/comment-form';
import { ReviewType } from '../types/review';
import { formatDateToHuman, formatDateToServer } from '../../utils';
import * as selectors from '../../store/selectors';
import { useAppSelector } from '../../hooks/useAppSelector/useAppSelector';
import { AuthStatus } from '../../const';
import { RATING_COEFFICIENT } from '../../const';

type ReviewsProps = {
  reviews: ReviewType[];
}

export function Reviews({ reviews }: ReviewsProps) {
  const authStatus = useAppSelector(selectors.authorizationStatus);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {Array.from({ length: reviews.length }, (_, i) => {
          const {comment, date, id, rating, user} = reviews[i];
          const {avatarUrl, name } = user;

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
