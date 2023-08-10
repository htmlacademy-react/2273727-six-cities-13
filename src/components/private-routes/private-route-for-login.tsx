import { Navigate } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../const';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

export function PrivateRouteForLogin({authorizationStatus, children}: PrivateRouteProps) {
  if (authorizationStatus === AuthStatus.Unknown) {
    return;
  }
  return (
    authorizationStatus === AuthStatus.NoAuth
      ? children
      : <Navigate to={AppRoute.Root} />
  );
}
