import React from 'react';
import classes from "./pointList.module.sass";
import PointElement from "./pointElement";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {PointItem} from '../../../types/points';


const PointList:React.FC = () => {
  const {points} = useTypedSelector(state => state)

  const render = (point:PointItem) => {
    if (points.filter !== null && points.filter !== 'Все' && points.filter !== point.region) return
    return <PointElement item={point} key={point.id}/>;
  }

  return (
    <div className={classes.list}>
      {points.points.map((point:PointItem) =>
        render(point)
      )}
    </div>
  );
};

export default PointList;