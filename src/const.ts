export const Settings = {
  CardsCount: 4,
} as const;

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
