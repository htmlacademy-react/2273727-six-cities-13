import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store';
import { fetchOffers } from './store/api-actions';

store.dispatch(fetchOffers()).then(() => {
  const offers = store.getState().offers;
  if (offers) {
    localStorage.setItem('offers', JSON.stringify(offers));
  }
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
