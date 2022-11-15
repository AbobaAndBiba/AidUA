export interface NewsState{
  response: any | NewsResponse
  loading: boolean;
  error: null | string;
  offset: number
  limit: number
}

export interface NewsResponse{
  news: NewsItem[],
  total: number
}

export interface NewsItem{
  id: string
  text: string
  image: string
  createdAt:string
  link: string
  title: string
}

export enum NewsActionTypes{
  FETCH_NEWS = 'FETCH_NEWS',
  FETCH_NEWS_SUCCESS = 'FETCH_NEWS_SUCCESS',
  FETCH_NEWS_ERROR = 'FETCH_NEWS_ERROR',
  SET_NEWS_OFFSET = 'SET_NEWS_OFFSET'
}

interface FetchNewsAction{
  type: NewsActionTypes.FETCH_NEWS
}

interface FetchNewsSuccessAction{
  type: NewsActionTypes.FETCH_NEWS_SUCCESS,
  payload: any[]
}

interface FetchNewsErrorAction{
  type: NewsActionTypes.FETCH_NEWS_ERROR,
  payload: string
}

interface SetNewsOffset{
  type: NewsActionTypes.SET_NEWS_OFFSET,
  payload: number
}

export type NewsAction =
  FetchNewsAction
  | FetchNewsSuccessAction
  | FetchNewsErrorAction
  | SetNewsOffset