export const MIN_COMMENT_LENGTH = 50;
export const MAX_COMMENT_LENGTH = 300;

export const RATING_COEFFICIENT = 20;

export const NUMBER_OF_NEARBY_OFFERS = 3;

export const AppRoute = {
  Root: '/',
  Favorites: '/favorites',
  Login: '/login',
  Offer: '/offer',
  NotFound: '/404',
} as const;

export type AppRouteType = typeof APIRoute;

export const AuthStatus = {
  Auth: 'AUTH',
  NoAuth: 'NO_AUTH',
  Unknown: 'UNKNOWN',
} as const;

type AuthStatusType = typeof AuthStatus;

export type AuthStatusValuesType = AuthStatusType[keyof AuthStatusType];

export const CitiesNames = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const URL_MARKER_DEFAULT = '../img/pin.svg';

export const URL_MARKER_CURRENT = '../img/pin-active.svg';

export const APIRoute = {
  Offers: '/offers',
  Comments: '/comments',
  Login: '/login',
  Logout: '/logout',
} as const;

export const SortType = {
  Popular: 'Popular',
  PriceToHigh: 'Price: low to high',
  PriceToLow: 'Price: high to low',
  TopRated: 'Top rated first'
} as const;
