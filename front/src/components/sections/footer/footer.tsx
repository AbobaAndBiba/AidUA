import React from 'react';
import classes from '../../../style/sections/footer/footer.module.sass'
import youtube from '../../../img/s-medias/youtube.svg'
import instagram from '../../../img/s-medias/instagram.svg'
import facebook from '../../../img/s-medias/facebook.svg'
import telegram from '../../../img/s-medias/telegram.svg'

const Footer = () => {
    return (
        <footer className={`section ${classes.footer}`}>
            <div className={`wrap ${classes.wrap}`}>
                <div className={classes.nav}>
                    <a href="">Наша місія</a>
                    <a href="">Як отримати допомогу</a>
                    <a href="">Новини</a>
                    <a href="">Точки видачі</a>
                    <a href="">Контакти</a>
                </div>
                <div className={classes.contentSide}>
                    <div className={classes.contacts}>
                        <h3>Контакти</h3>
                        <p>Одноразова допомога для ВПО:</p>
                        <a href="tel:+380665778925">+38 066-577-89-25</a>
                        <a href="tel:+380971448797">+38 097-144-87-97</a>
                    </div>
                    <div className={classes.other}>
                        <div className={classes.mail}>
                            <h3>Пошта консультації</h3>
                            <p>ymn06558@nezid.com</p>
                        </div>
                        <div className={classes.medias}>
                            <a href="" className={classes.medias__youtube}><img src={youtube} alt=""/></a>
                            <a href="" className={classes.medias__instagram}><img src={instagram} alt=""/></a>
                            <a href="" className={classes.medias__telegram}><img src={telegram} alt=""/></a>
                            <a href="" className={classes.medias__facebook}><img src={facebook} alt=""/></a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;