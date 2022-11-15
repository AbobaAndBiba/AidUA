import React from 'react';
import classes from './filter.module.sass'
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {PointItem} from "../../../types/points";
import {useActions} from "../../../hooks/useActions";
const Filter = () => {
  const {points} = useTypedSelector(state => state)
  let filters:string[] = []

  points.points.forEach((item: PointItem) => {
    if (!filters.includes(item.region)) filters.push(item.region)
  })

  const {setPointsFilter} = useActions()

  return (
    <select className={classes.select} defaultValue="Все" onChange={(event) => setPointsFilter(event.target.value)}>
      <option value="Все">Все районы</option>
      {filters.map(item =>
        <option value={item} key={item} >{item}</option>
      )}
    </select>
  );
};

export default Filter;