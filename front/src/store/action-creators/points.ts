import {Dispatch} from "redux";
import {PointsAction, PointsActionTypes} from "../../types/points";
import axios from "axios";


export const fetchPoints = () => {
  return async (dispatch: Dispatch<PointsAction>) => {
    try {
      dispatch({type: PointsActionTypes.FETCH_POINTS})
      const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/pickup-point/all`,
        {
          "where": [
            {
              "table": "",
              "label": "",
              "value": [
                ""
              ]
            }
          ]
        }
        )
      dispatch({type: PointsActionTypes.FETCH_POINTS_SUCCESS, payload: res.data})
    } catch (e){
      dispatch({type: PointsActionTypes.FETCH_POINTS_ERROR, payload: 'Download points Error'})
    }
  }
}

export const setPointActive = (active: string | null):PointsAction => {

  return {type: PointsActionTypes.SET_POINT_ACTIVE, payload: active}
}

export const setPointsFilter = (filter: string | null):PointsAction => {

  return {type: PointsActionTypes.SET_POINTS_FILTER, payload: filter}
}