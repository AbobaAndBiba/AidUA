import React from 'react'
import classes from "../../../style/sections/header/header.module.sass"
import logo from '../../../img/logo.png'

const Header = () => {
    return (
        <header className={classes.header}>
            <div className={`${classes.wrap} wrap`}>
                <img src={logo} alt=""/>
                <a href="" className={classes.link}>Як отримати допомогу</a>
                <a href="" className={classes.link}>Новини</a>
                <a href="" className={classes.link}>Точки видачі</a>
                <a href="" className={classes.link}>Наша місія</a>
                <a href="" className={classes.link}>Контакти</a>
            </div>
        </header>
    );
};

export default Header;