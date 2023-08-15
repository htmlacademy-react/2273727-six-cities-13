import { NavLink, Link } from 'react-router-dom';
import { getStyleForNavLink } from '../../../utils';
import { AppRoute } from '../../../const';
import { useAppDispatch } from '../../../hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector/useAppSelector';
import { logout } from '../../../store/api-actions';
import { getFavOffersNumber } from '../../../store/offers-process/selectors';
import { getEmail } from '../../../store/user-process.ts/selectors';

export const AuthElement = () => {
  const dispatch = useAppDispatch();
  const userEmail = useAppSelector(getEmail);
  const favOffersNumber = useAppSelector(getFavOffersNumber);

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <NavLink
            className="header__nav-link header__nav-link--profile"
            to={AppRoute.Favorites}
            style={getStyleForNavLink}
          >
            <div className="header__avatar-wrapper user__avatar-wrapper"></div>
            <span className="header__user-name user__name">
              {userEmail}
            </span>
            <span className="header__favorite-count">{favOffersNumber}</span>
          </NavLink>
        </li>
        <li className="header__nav-item">
          <Link
            className="header__nav-link"
            to={AppRoute.Root}
            onClick={(evt) => {
              evt.preventDefault();
              dispatch(logout());
            }}
          >
            <span className="header__signout">Sign out</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
