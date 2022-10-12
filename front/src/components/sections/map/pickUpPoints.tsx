import React from 'react';
import classes from "../../../style/sections/map/pickUpPoints.module.sass";
import PointList from "./pointList";
import points from '../../../points.json'
import Map from "./map";

const PickUpPoints = () => {
  return (
    <section className={`section ${classes.pickUpPoints}`}>
      <div className={`wrap ${classes.wrap}`}>
        <h2>Точки видачі</h2>
        <hr/>
        <div className={classes.mapWrapper}>
          <PointList items={points}/>
          <Map items={points}/>
        </div>
      </div>


    </section>
  );
};

export default PickUpPoints;