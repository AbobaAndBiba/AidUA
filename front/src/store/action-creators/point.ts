import {mapPointAction, MapPointsActionTypes} from "../../types/mapPoinst";
import {Dispatch} from "redux";
import axios from "axios";

export const fetchPoints = () => {
  return async (dispatch: Dispatch<mapPointAction>) => {
    try {
      dispatch({type: MapPointsActionTypes.FETCH_MAP_POINTS})
      const response = await axios.get(require("../../points.json"))
      dispatch({type: MapPointsActionTypes.FETCH_MAP_POINTS_SUCCESS, payload: response.data})
    } catch (e) {
      dispatch({
        type: MapPointsActionTypes.FETCH_MAP_POINTS_ERROR,
        payload: "Ошибка при загрузке точек"
      })
    }
  }
}