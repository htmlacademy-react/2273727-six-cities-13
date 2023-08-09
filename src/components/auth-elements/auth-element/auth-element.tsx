import { NavLink, Link } from 'react-router-dom';
import { getStyleForNavLink } from '../../../utils';
import { AppRoute } from '../../../const';
import { useAppDispatch } from '../../../hooks/useAppDispatch/useAppDispatch';
import { logout } from '../../../store/api-actions';

export function AuthElement() {
  const dispatch = useAppDispatch();

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
              egorpestov2012@yandex.ru
            </span>
            <span className="header__favorite-count">3</span>
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
}
