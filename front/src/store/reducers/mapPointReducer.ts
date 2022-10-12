import {ImapPointState, MapPointsActionTypes, mapPointAction} from "../../types/mapPoinst";

const initialState: ImapPointState = {
  points: [],
  loading: false,
  errors: null
};

export const mapPointReducer = (state = initialState, action: mapPointAction): ImapPointState => {
  switch (action.type){
    case MapPointsActionTypes.FETCH_MAP_POINTS:
      return {loading: true, errors: null, points: []}
    case MapPointsActionTypes.FETCH_MAP_POINTS_SUCCESS:
      return {loading: false, errors: null, points: action.payload}
    case MapPointsActionTypes.FETCH_MAP_POINTS_ERROR:
      return {loading: false, errors: action.payload, points: []}
    default:
      return state
  }
}