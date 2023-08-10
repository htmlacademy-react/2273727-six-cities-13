import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../const';
import * as selectors from '../../store/selectors';
import { useAppSelector } from '../../hooks/useAppSelector/useAppSelector';
import { AuthStatus } from '../../const';
import { getStyleForNavLink } from '../../utils';
import { AuthElement } from '../auth-elements/auth-element/auth-element';
import { NoAuthElement } from '../auth-elements/no-auth-element/no-auth-element';

export function Header() {
  const authStatus = useAppSelector(selectors.authorizationStatus);

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
          {authStatus === AuthStatus.Auth ? <AuthElement /> : <NoAuthElement />}

        </div>
      </div>
    </header>
  );
}
