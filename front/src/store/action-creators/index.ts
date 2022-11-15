import * as NewsActionCreators from './news'
import * as PointsActionCreators from './points'

export default {
  ...NewsActionCreators,
  ...PointsActionCreators
}