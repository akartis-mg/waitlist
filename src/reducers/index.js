import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './authReducers';
import authBusinessReducer from './authBusinessReducers';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'authBusiness']
}

const rootReducer = combineReducers({
    auth: authReducer,
    authBusiness: authBusinessReducer
})

export default persistReducer(persistConfig, rootReducer);