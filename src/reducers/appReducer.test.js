import appReducer from './appReducer';
import * as actionTypes from '../constants/action-types';

describe('Test suite for redux app reducer', () => {
    const initialState = {
        showRoute: false,
        progress: false,
        id:null
    };
    it('Should handle TOGGLE_PROGRESS', () => {
        expect(appReducer(initialState, {
            type: actionTypes.TOGGLE_PROGRESS,
            isEnable: true
        })).toEqual({
            showRoute: false,
            progress: true,
            id:null
        });
    });
    it('Should handle SHOW_ROUTE', () => {
        expect(appReducer(initialState, {
            type: actionTypes.SHOW_ROUTE,
            id: "123456789"
        })).toEqual({
            showRoute: true,
            progress: false,
            id: "123456789"
        });
    });
});
