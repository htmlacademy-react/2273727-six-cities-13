import { NameSpace, NameSpaceType, AuthStatusValuesType } from '../../const';
import { State } from '../../hooks/useAppSelector/useAppSelector';

export const getAuthStatus = (state: Pick<State, NameSpaceType['User']>): AuthStatusValuesType => state[NameSpace.User].authorizationStatus;
export const getEmail = (state: Pick<State, NameSpaceType['User']>): string | undefined => state[NameSpace.User].userData?.email;
export const getAvatar = (state: Pick<State, NameSpaceType['User']>): string | undefined => state[NameSpace.User].userData?.avatarUrl;
