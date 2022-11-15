import React from 'react'
import classes from "./header.module.sass"
import logo from '../../../img/logo.png'
import { Link } from 'react-scroll'

const Header = () => {
    return (
        <header className={classes.header}>
            <div className={`${classes.wrap} wrap`}>
                <img src={logo} alt=""/>
                <Link
                  activeClass="active"
                  to="howToTake"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className={classes.link}>Як отримати допомогу</Link>
                <Link
                  activeClass="active"
                  to="news"
                  spy={true}
                  smooth={true}
                  offset={-150}
                  duration={500}
                  className={classes.link}>Новини</Link>
                <Link
                   activeClass="active"
                   to="map"
                   spy={true}
                   smooth={true}
                   offset={-130}
                   duration={500}
                   className={classes.link}>Точки видачі</Link>
                <Link
                  activeClass="active"
                  to="mission"
                  spy={true}
                  smooth={true}
                  offset={-270}
                  duration={500}
                   className={classes.link}>Наша місія</Link>
                <Link
                  activeClass="active"
                  to="footer"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                   className={classes.link}>Контакти</Link>
            </div>
        </header>
    );
};

export default Header;