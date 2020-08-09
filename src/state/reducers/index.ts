import { combineReducers, CombinedState } from 'redux';
import { Reducer } from 'react';
import { searchReducer } from 'state/reducers/search';

//NOTE: Add Type
const rootReducer = combineReducers({
    searchReducer,
});

export default rootReducer;
