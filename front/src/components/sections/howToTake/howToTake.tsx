import React from 'react';
import classes from '../../../style/sections/mission + howToTake/infoSection.module.sass'
import gymHelp from '../../../img/gymHelp.jpg'

const HowToTake = () => {
    return (
        <section className={`${classes.howToTake} section`}>
            <div className={`wrap ${classes.wrap}`}>
                <img src={gymHelp} className={classes.image} alt=""/>
                <div className={classes.contentColumn}>
                    <h2>Як отримати допомогу</h2>
                    <hr/>
                    <p>Необхідно прийти до пункту видачі у встановлений час. Мати при собі: паспорт громадянина України, Ідентифікаційний код та довідка ВПО для дорослих.
                        Для дітей молодше 14 років необхідно свідоцтво про народження і присутність одного з опікунів.
                    </p>
                    <p>Отримання гуманітарної допомоги проходить у форматі черги або за записом, де кожному з нужденних видають продовольчу  і при необхідності надають медичну та психологічну допомогу.</p>
                    <a href="" className="pointButton">Пункти видачі</a>
                </div>

            </div>

        </section>
    );
};

export default HowToTake;