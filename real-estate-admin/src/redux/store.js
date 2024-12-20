import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import propertyReducer from './reducers/propertyReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    property: propertyReducer
});

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;
