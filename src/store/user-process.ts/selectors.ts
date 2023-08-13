import { NameSpace, AuthStatusValuesType, AuthStatus } from '../../const';
import { State } from '../../hooks/useAppSelector/useAppSelector';

export const getAuthStatus = (state: State): AuthStatusValuesType => state[NameSpace.User].authorizationStatus;
export const getAuthCheckedStatus = (state: State): boolean => state[NameSpace.User].authorizationStatus !== AuthStatus.Unknown;

