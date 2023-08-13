import { NameSpace, AuthStatusValuesType } from '../../const';
import { State } from '../../hooks/useAppSelector/useAppSelector';

export const getAuthStatus = (state: State): AuthStatusValuesType => state[NameSpace.User].authorizationStatus;
export const getEmail = (state: State): string | undefined => state[NameSpace.User].userData?.email;

