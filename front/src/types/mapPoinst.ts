export interface ImapPointState{
  points: any[],
  loading: boolean,
  errors: null | string
}

export enum MapPointsActionTypes{
  FETCH_MAP_POINTS = 'FETCH_MAP_POINTS',
  FETCH_MAP_POINTS_SUCCESS = 'FETCH_MAP_POINTS_SUCCESS',
  FETCH_MAP_POINTS_ERROR = 'FETCH_MAP_POINTS_ERROR',
}

interface IFetchMapPointsAction{
  type: MapPointsActionTypes.FETCH_MAP_POINTS
}

interface IFetchMapPointsSuccessAction{
  type: MapPointsActionTypes.FETCH_MAP_POINTS_SUCCESS
  payload: any[]
}

interface IFetchMapPointsErrorAction{
  type: MapPointsActionTypes.FETCH_MAP_POINTS_ERROR
  payload: string
}

export type mapPointAction = IFetchMapPointsAction | IFetchMapPointsErrorAction | IFetchMapPointsSuccessAction
