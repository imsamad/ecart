import { useMemo } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';

let store;

function initStore(initialState) {
  // console.log('3 initStore run with initialState', initialState);
  return createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    store = undefined;
  }

  if (typeof window === 'undefined') {
    return _store;
  }
  if (!store) {
    store = _store;
  }

  return _store;
};

export function useStore(initialState) {
  const store = useMemo(() => {
    return initializeStore(initialState);
  }, [initialState]);
  return store;
}
