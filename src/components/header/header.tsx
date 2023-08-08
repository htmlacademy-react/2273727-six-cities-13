import { Link, NavLink } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch';
import { logout } from '../../store/api-actions';

const getStyleForNavLink = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? {
      cursor: 'default',
    }
    : {
      cursor: 'pointer',
    };

export function Header() {
  const dispatch = useAppDispatch();

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <NavLink className="header__logo-link" to={AppRoute.Root} style={getStyleForNavLink}>
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width={81}
                height={41}
              />
            </NavLink>
          </div>
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
                    Oliver.conner@gmail.com
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
        </div>
      </div>
    </header>
  );
}
