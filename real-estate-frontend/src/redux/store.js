import { createStore, applyMiddleware, combineReducers } from 'redux';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import listingsReducer from './reducers/listingsReducer';
import locationsReducer from './reducers/locationsReducer';

// const persistConfig = {
//     key: 'root',
//     // storage,
//     whitelist: ['auth'], // Reducers to persist
// };

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    listings: listingsReducer,
    location: locationsReducer,
});

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

// export const persistor = persistStore(store);
export default store;
