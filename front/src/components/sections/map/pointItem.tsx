import React, {FC} from 'react';
import classes from '../../../style/sections/map/pointItem.module.sass'
import {IPointItem} from "../../../types";


interface IPointItemProps{
  item: IPointItem
}

const PointItem: FC<IPointItemProps> = ({item}) => {
  return (
    <div className={classes.item}>
      <p>{item.district}</p>
      <p>{item.street}</p>
      <p>{item.registration}</p>
    </div>
  );
};

export default PointItem;