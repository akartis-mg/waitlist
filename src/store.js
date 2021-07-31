import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const middlleware = [logger, thunk];

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlleware))
);

export const persistor = persistStore(store);
export default { store, persistor };