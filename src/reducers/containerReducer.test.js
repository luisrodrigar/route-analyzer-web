import containerReducer from './containerReducer';
import * as actionTypes from '../constants/action-types';
import {getRouteAnalyzerWebLaps} from "../__test__/test-utilities";
import * as operations from '../Utils/operations';

jest.mock('../Utils/operations');

describe('Test suite for redux container reducer', () => {
    const laps = getRouteAnalyzerWebLaps();
    const initialState = {
        activity: {},
        indexLap:null,
        indexTrackpoint:null,
        laps:[],
        currentTrackpoint: null
    };
    it('Should return the initial state', () => {
        expect(containerReducer(undefined, {}))
            .toEqual(initialState);
    });
    it('Should handle SET_ACTIVITY ', () => {
        operations.getLapsTrackPoints.mockImplementationOnce(() => laps);
        const activity = {
            id: "123456789",
            laps: [] // It is not needed to fill in this value
        };
        expect(containerReducer(initialState, {
            type: actionTypes.SET_ACTIVITY,
            activity: activity
        })).toEqual({
            activity: activity,
            indexLap: null,
            indexTrackpoint: null,
            laps: laps,
            currentTrackpoint: null
        })
    });
    it('Should handle UPDATE_TRACKPOINT', () => {
        initialState.laps = laps;
        expect(containerReducer(initialState, {
            type: actionTypes.UPDATE_TRACKPOINT,
            indexLap: 0,
            indexTrackpoint: 1

        })).toEqual({
            activity: {},
            indexLap: 0,
            indexTrackpoint: 1,
            laps: laps,
            currentTrackpoint: laps[0].tracks[1]
        })
    });
});
