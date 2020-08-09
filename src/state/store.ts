import {createStore} from 'redux';
import rootReducer from './reducers';

//NOTE: Add type
export const store = createStore(rootReducer);