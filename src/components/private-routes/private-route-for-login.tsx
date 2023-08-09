import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

export function PrivateRouteForLogin({authorizationStatus, children}: PrivateRouteProps) {
  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return;
  }
  return (
    authorizationStatus === AuthorizationStatus.NoAuth
      ? children
      : <Navigate to={AppRoute.Root} />
  );
}
