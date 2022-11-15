import {PointsAction, PointsActionTypes, PointsState} from "../../types/points";


const initialState: PointsState = {
  points: [],
  active: null,
  loading: false,
  error: null,
  filter: null
}

export const pointsReducer = (state = initialState, action: PointsAction):PointsState => {
  switch (action.type){
    case PointsActionTypes.FETCH_POINTS:
      return {...state, loading: true}
    case PointsActionTypes.FETCH_POINTS_SUCCESS:
      return {...state, loading: false, points: action.payload}
    case PointsActionTypes.FETCH_POINTS_ERROR:
      return {...state, loading: false, error: action.payload}
    case PointsActionTypes.SET_POINT_ACTIVE:
      let res
      state.active === action.payload
        ? res = null
        : res = action.payload
      return {...state, active: res}
    case PointsActionTypes.SET_POINTS_FILTER:
      return {...state, filter: action.payload}
    default:
      return state
  }

}