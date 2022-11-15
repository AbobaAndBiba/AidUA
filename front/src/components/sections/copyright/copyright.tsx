import React from 'react';
import classes from './copyright.module.sass'
import logo from '../../../img/logo.png'

const Copyright = () => {
    return (
        <section className={`section ${classes.copyright}`}>
            <div className={`wrap ${classes.wrap}`}>
                <span>© 2022 Dopomoga. Всі права захищені</span>
                <span>Design and developet by @6.1219</span>
                <img src={logo} alt=""/>
            </div>
        </section>
    );
};

export default Copyright;