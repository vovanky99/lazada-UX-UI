import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import AuthReducer from '../Reducer';
import { Login, SignUp } from '../Actions/Auth';

const rootReducer = combineReducers({
  Login: Login,
  SignUp: SignUp,
  Auth: AuthReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
