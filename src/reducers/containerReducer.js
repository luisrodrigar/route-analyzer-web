import { SET_ACTIVITY, UPDATE_TRACKPOINT} from '../constants/action-types';
import { getLapsTrackPoints} from '../Utils/operations';

const initialState = {
	activity: {},
  indexLap:null,
  indexTrackpoint:null,
  laps:[],
  currentTrackpoint: null
}

export default function containerReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVITY:
      const laps = getLapsTrackPoints(action.activity.laps);
      return {
        ...state,
        activity: action.activity,
        indexLap:null,
        indexTrackpoint:null,
        currentTrackpoint: null,
        laps: [...laps]
      }
    case UPDATE_TRACKPOINT:
      return {
        ...state,
        indexLap: action.indexLap,
        indexTrackpoint: action.indexTrackpoint,
        currentTrackpoint: state.laps[action.indexLap].tracks[action.indexTrackpoint]
      }
    default:
      return state;
  }
}