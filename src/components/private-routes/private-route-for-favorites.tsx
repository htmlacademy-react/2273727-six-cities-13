import { Navigate } from 'react-router-dom';
import { AppRoute, AuthStatus, AuthStatusValuesType } from '../../const';
import { LoadingScreen } from '../../pages/loading-screen/loading-screen';

type PrivateRouteProps = {
  authorizationStatus: AuthStatusValuesType;
  children: JSX.Element;
}

export const PrivateRouteForFavorites = ({ authorizationStatus, children }: PrivateRouteProps) => {
  if (authorizationStatus === AuthStatus.Unknown) {
    return <LoadingScreen />;
  }
  return (
    authorizationStatus === AuthStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
};
