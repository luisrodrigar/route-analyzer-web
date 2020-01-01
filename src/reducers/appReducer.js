
import { TOGGLE_PROGRESS, SHOW_ROUTE } from '../constants/action-types';

const initialState = {
	showRoute: false,
	progress: false,
	id:null
}

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_PROGRESS:
      return {
        ...state,
        progress: action.isEnable
      }
    case SHOW_ROUTE:
		return {
			showRoute: action.id?true:false,
		    id: action.id,
		    progress: false
		}
    default:
      return state
  }
}
