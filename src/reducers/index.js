import { combineReducers } from 'redux';
import worldinfo from "./worldinfo";
import countriesinfo from "./countriesinfo";
export default combineReducers({
    worldInfo: worldinfo,
    countriesInfo: countriesinfo
});
