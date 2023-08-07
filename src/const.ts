export const MIN_COMMENT_LENGTH = 50;
export const MAX_COMMENT_LENGTH = 140;

export const TIMEOUT_SHOW_ERROR = 2000;

export const AppRoute = {
  Root: '/',
  Favorites: '/favorites',
  Login: '/login',
  Offer: '/offer',
  NotFound: '/404',
} as const;

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const CitiesNames = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;

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

export const OPTIONS_NAMES = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'];
