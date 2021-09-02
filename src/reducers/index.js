import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './authReducers';
import authBusinessReducer from './authBusinessReducers';
import companyReducer from './companyReducers';
import typeCompanyReducer from './typeCompanyReducers';
import staffReducer from './staffReducers';
import reservationReducer from './reservationReducers';
import dateResaReducer from './dateResaReducers';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'authBusiness', 'company', 'typeCompany', 'staff', 'reservation', 'dateresa']
}

const rootReducer = combineReducers({
    auth: authReducer,
    authBusiness: authBusinessReducer,
    company: companyReducer,
    typeCompany: typeCompanyReducer,
    staff: staffReducer,
    reservation: reservationReducer,
    dateresa: dateResaReducer
})

export default persistReducer(persistConfig, rootReducer);