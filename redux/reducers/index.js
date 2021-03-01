import { combineReducers } from 'redux';
import imageReducer from '../reducers/imageReducer';

export const rootReducer = combineReducers({images: imageReducer})

export default rootReducer;