import {NewsAction, NewsActionTypes} from "../../types/news";
import {Dispatch} from "redux";
import axios from "axios";

export const fetchNews = (offset = 0, limit = 3) => {
  return async (dispatch: Dispatch<NewsAction>) => {
    try {
      dispatch({type: NewsActionTypes.FETCH_NEWS})
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/news/all/${limit}/${offset}`)
      dispatch({type: NewsActionTypes.FETCH_NEWS_SUCCESS, payload: res.data})
    } catch (e) {
      dispatch({
        type: NewsActionTypes.FETCH_NEWS_ERROR,
        payload: 'Download news Error'
      })
    }
  }
}

export const setNewsOffset = (offset: number):NewsAction => {
  return {type: NewsActionTypes.SET_NEWS_OFFSET, payload: offset}
}