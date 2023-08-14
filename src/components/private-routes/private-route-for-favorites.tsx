import { Navigate } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../const';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

export function PrivateRouteForFavorites({authorizationStatus, children}: PrivateRouteProps) {
  return (
    authorizationStatus === AuthStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}
