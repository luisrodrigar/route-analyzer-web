import * as types from '../constants/action-types';
import * as actions from './index';

describe('Test suite for redux actions', () => {
    it('Should create an action to enable the viewing of a route', () => {
        const activityID = 'some-id';
        const expectedAction = {
            type: types.SHOW_ROUTE,
            id: activityID
        };
        expect(actions.showRoute(activityID)).toEqual(expectedAction);
    });
    it('Should create an action to enable the toggle progress when an activity is loading', () => {
        const isEnabled = true;
        const expectedAction = {
            type: types.TOGGLE_PROGRESS,
            isEnable: true
        };
        expect(actions.toggleProgress(isEnabled)).toEqual(expectedAction);
    });
    it('Should create an action to modify the current activity', () => {
        const activity = {
            index: 3,
            laps: 3
        };
        const expectedAction = {
            type: types.SET_ACTIVITY,
            activity: activity
        };
        expect(actions.setActivity(activity)).toEqual(expectedAction);
    });
    it('Should create an action to update the current track point', () => {
        const indexLap = 0;
        const indexTrackPoint = 30;
        const expectedAction = {
            type: types.UPDATE_TRACKPOINT,
            indexLap: indexLap,
            indexTrackpoint: indexTrackPoint
        };
        expect(actions.updateTrackpoint(indexLap, indexTrackPoint)).toEqual(expectedAction);
    });
});
