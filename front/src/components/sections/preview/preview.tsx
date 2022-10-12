import React from 'react';
import classes from "../../../style/sections/preview/preview.module.sass";
import arrowDown from '../../../img/arrow-down.svg';

const Preview = () => {
    return (
        <section className={classes.preview}>
            <div className={classes.wrap}>
                <div className={classes.topside}>
                    <h1>Ми допомагаємо</h1>
                    <hr/>
                    <p>Знайти гуманiтарку</p>
                    <p>Та отримати допомогу по Запорiжжю</p>
                </div>

                <a className={classes.underside}>
                    <span>Перейти до мапи</span>
                    <img src={arrowDown} alt=""/>
                </a>
            </div>

        </section>
    );
};

export default Preview;