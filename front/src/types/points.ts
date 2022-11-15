export interface PointsState{
  points: PointItem[] | any,
  active: null | string,
  loading: boolean,
  error: null | string,
  filter: null | string
}

export interface PointItem{
  id: string,
  city: string,
  region: string,
  district: string,
  address: string,
  lat: number,
  lng: number,
  registration: string,
  phone: string,
  author: string,
  privileges: string[]
}

export enum PointsActionTypes{
  FETCH_POINTS = 'FETCH_POINTS',
  FETCH_POINTS_SUCCESS = 'FETCH_POINTS_SUCCESS',
  FETCH_POINTS_ERROR = 'FETCH_POINTS_ERROR',
  SET_POINT_ACTIVE = 'SET_POINT_ACTIVE',
  SET_POINTS_FILTER = 'SET_POINTS_FILTER'
}

interface FetchPointsAction{
  type: PointsActionTypes.FETCH_POINTS
}

interface FetchPointsSuccessAction{
  type: PointsActionTypes.FETCH_POINTS_SUCCESS
  payload: any[]
}

interface FetchPointsErrorAction{
  type: PointsActionTypes.FETCH_POINTS_ERROR
  payload: string
}

interface SetPointActiveAction{
  type: PointsActionTypes.SET_POINT_ACTIVE
  payload: string | null
}

interface SetPointFilterAction{
  type: PointsActionTypes.SET_POINTS_FILTER
  payload: string | null
}

export type PointsAction =
  FetchPointsAction
  | FetchPointsSuccessAction
  | FetchPointsErrorAction
  | SetPointActiveAction
  | SetPointFilterAction
