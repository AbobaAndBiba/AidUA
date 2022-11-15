import React, {useEffect} from 'react';
import classes from "./pickUpPoints.module.sass";
import PointList from "./pointList";
import Map from "./map";
import {useActions} from "../../../hooks/useActions";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import Filter from "./filter";

const PickUpPoints = () => {
  const {points} = useTypedSelector(state => state.points)

  const {fetchPoints} = useActions()

  useEffect(() => {
    fetchPoints()

  }, [])

  const main = () => {
    if (points){
      return (
        <div className={classes.mapWrapper}>
          <div className={classes.verticalSide}>
            <Filter/>
            <PointList/>
          </div>
          <Map/>
        </div>
      )
    }
  }

  return (
    <section className={`section ${classes.pickUpPoints}`}  id="map">
      <div className={`wrap ${classes.wrap}`}>
        <h2>Точки видачі</h2>
        <hr/>
        {main()}

      </div>


    </section>
  );
};

export default PickUpPoints;