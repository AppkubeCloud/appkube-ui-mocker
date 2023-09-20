import { combineReducers } from 'redux';
import { hr } from './hr.reducer';

const appReducers = combineReducers({
    hr
});

const rootReducer = (state, action) => {
   
    return appReducers(state, action);
}

export default rootReducer;