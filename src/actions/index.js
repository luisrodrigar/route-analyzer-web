import { SHOW_ROUTE, TOGGLE_PROGRESS, SET_ACTIVITY, UPDATE_TRACKPOINT } from '../constants/action-types';

export const showRoute 				= id => ({ type: SHOW_ROUTE, id: id });
export const toggleProgress 		= isEnable => ({ type: TOGGLE_PROGRESS, isEnable:isEnable });
export const setActivity 			= activity => ({ type: SET_ACTIVITY, activity: activity });
export const updateTrackpoint 		= (indexLap, indexTrackpoint) => ({ type: UPDATE_TRACKPOINT, 
										indexLap:indexLap, indexTrackpoint:indexTrackpoint });
