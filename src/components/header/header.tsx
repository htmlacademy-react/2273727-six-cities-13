import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../const';
import { useAppSelector } from '../../hooks/useAppSelector/useAppSelector';
import { getStyleForNavLink } from '../../utils';
import { AuthElement } from '../auth-elements/auth-element/auth-element';
import { NoAuthElement } from '../auth-elements/no-auth-element/no-auth-element';
import { getAuthStatus } from '../../store/user-process.ts/selectors';

const HeaderComponent = () => {
  const authStatus = useAppSelector(getAuthStatus);

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
};

export const Header = memo(HeaderComponent);
