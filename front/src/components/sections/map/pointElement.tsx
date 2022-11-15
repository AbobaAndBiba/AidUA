import React, {FC} from 'react';
import classes from './pointElement.module.sass'
import {PointItem} from '../../../types/points';
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useActions} from "../../../hooks/useActions";


interface IPointItem{
  item: PointItem,
}

const PointElement: FC<IPointItem> = ({item}) => {
  const {points} = useTypedSelector(state => state)

  const {setPointActive} = useActions()

  const click = () => {
    setPointActive(item.id)
  }
  return (
    <div className={`${classes.item} ${points.active === item.id ? classes.item_active : ''}`} onClick={click}>

      <p>{item.region}</p>
      <p>{item.address}</p>
      <p>{item.registration}</p>
    </div>
  );
};

export default PointElement;