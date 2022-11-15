import {NewsAction, NewsActionTypes, NewsState} from "../../types/news";

const initialState: NewsState = {
  response: {},
  limit: 3,
  loading: false,
  offset: 0,
  error: null
}

export const newsReducer = (state = initialState, action: NewsAction): NewsState => {
  switch (action.type){
    case NewsActionTypes.FETCH_NEWS:
      return {...state, loading: true}
    case NewsActionTypes.FETCH_NEWS_SUCCESS:
      const payload:any = action.payload
      if (state.response.news && payload.news) {
        payload.news = [...state.response.news, ...payload.news]
      }
      return {...state, loading: false, response: action.payload}
    case NewsActionTypes.FETCH_NEWS_ERROR:
      return {...state, loading: false, error: action.payload}
    case NewsActionTypes.SET_NEWS_OFFSET:
      return {...state, offset: action.payload}
    default:
      return state
  }
}