import { Navigate } from 'react-router-dom';
import { AppRoute, AuthStatus, AuthStatusValuesType} from '../../const';

type PrivateRouteProps = {
  authorizationStatus: AuthStatusValuesType;
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
