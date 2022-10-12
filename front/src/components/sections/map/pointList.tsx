import React, {FC, useEffect} from 'react';
import classes from "../../../style/sections/map/pointList.module.sass";
import PointItem from "./pointItem";
import {IPointItem} from "../../../types";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {fetchPoints} from "../../../store/action-creators/point";
import {useAppDispatch} from "../../../store";

interface IPointList{
  items: IPointItem[]
}


const PointList: FC<IPointList> = ({items}) => {
  const {points, loading, errors} = useTypedSelector(state => state.points)
  const dispatch = useAppDispatch()


  useEffect(() => {
    //dispatch(fetchPoints())
  }, [])
  return (
    <div className={classes.list}>
      {items.map((item) =>
        <PointItem item={item} key={item.id}/>
      )}
    </div>
  );
};

export default PointList;