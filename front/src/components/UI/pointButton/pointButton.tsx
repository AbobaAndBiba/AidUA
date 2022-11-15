import React from 'react';
import classes from './pointButton.module.sass'
import {Link} from "react-scroll"

const PointButton = () => {
  return (
    <Link
      activeClass="active"
      to="map"
      spy={true}
      smooth={true}
      offset={-130}
      duration={500}
      className={classes.pointButton}>Пункти видачі</Link>
  );
};

export default PointButton;