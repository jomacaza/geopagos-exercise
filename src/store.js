import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from './reducers/rootReducer';

const initialState = {};
export default function configureStore() {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(promiseMiddleware())
  );
}
