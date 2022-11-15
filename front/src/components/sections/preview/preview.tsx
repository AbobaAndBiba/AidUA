import React from 'react';
import classes from "./preview.module.sass";
import arrowDown from '../../../img/arrow-down.svg';
import {Link} from "react-scroll";
import { Parallax } from 'react-parallax';

const Preview = () => {
    return (
      <Parallax blur={3} bgImage={require('../../../img/Preview.jpg')} strength={-150} className={classes.preview}>
          <div className={classes.wrap}>
              <div className={classes.topside}>
                  <h1>Ми допомагаємо</h1>
                  <hr/>
                  <p>Знайти гуманiтарку</p>
                  <p>Та отримати допомогу по Запорiжжю</p>
              </div>

              <Link
                activeClass="active"
                to="map"
                spy={true}
                smooth={true}
                offset={-130}
                duration={500}
                className={classes.underside}>
                  <span>Перейти до мапи</span>
                  <img src={arrowDown} alt=""/>
              </Link>
          </div>
      </Parallax>
    );
};

export default Preview;