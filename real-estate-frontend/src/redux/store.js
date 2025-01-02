import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import listingsReducer from './reducers/listingsReducer';
import locationsReducer from './reducers/locationsReducer';

const rootReducer = combineReducers({
    location: locationsReducer,
    auth: authReducer,
    user: userReducer,
    listings: listingsReducer,
});

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;
