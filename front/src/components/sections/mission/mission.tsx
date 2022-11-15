import React from 'react';
import classes from '../../../style/sections/mission + howToTake/infoSection.module.sass'
import missionPhoto from '../../../img/aboutPicture.jpg'
import PointButton from "../../UI/pointButton/pointButton";

const Mission = () => {
    return (
        <section className={`${classes.mission} section`} id="mission">
            <div className={`wrap ${classes.wrap}`}>

                <div className={classes.contentColumn}>
                    <h2>Наша місія</h2>
                    <hr/>
                    <p>Кожен українець заслуговує на допомогу і укриття від війни.
                        Ми знаходимо інформацію, про доступні пункти гуманітарної
                        допомоги і публікуємо правила, поради для її отримання.</p>
                    <p>Наші фахівці оновлюють
                        інформацію кожен день, гарантуючи людям
                        надійність і впевненість в такий непростий час.
                        Віримо в ЗСУ. Все буде Україна!</p>
                    <PointButton/>
                </div>
                <img src={missionPhoto} className={classes.image} alt=""/>

            </div>

        </section>
    );
};

export default Mission;