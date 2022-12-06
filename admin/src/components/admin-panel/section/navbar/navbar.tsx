import axios from 'axios'
import React,{FC,useEffect} from 'react'
import {Link} from "react-router-dom"
import clasess from "./navbar.module.sass"
import exit_img from "../../../../img/icons/exit_line.svg";

const Navbar:FC=()=> {
    
  return (
        <nav className={clasess.navigation}>
          <ul className={clasess.menu}>
            <li className={clasess.news}>
             <Link to="/news"> Новини </Link>
            </li>
            <li className={clasess.aid}><Link to="/aid">Гуманітарна допомога</Link></li>
            <li className={clasess.author}><Link to="/author">Автори</Link></li>
            <li className={clasess.map}><Link to="/map">Карта допомоги</Link></li>
            <li className={clasess.admin}><Link to='/admin'>Адміни</Link></li>
            <Link to="/"><img onClick={()=>localStorage.removeItem('token')}  src={exit_img} alt="EXIT" /></Link>
          </ul>
          <ul className={clasess.menu__burger}>
            <li className={clasess.news}>
             <Link to="/news"> Новини </Link>
            </li>
            <li className={clasess.aid}><Link to="/aid">Гуманітарна допомога</Link></li>
            <li className={clasess.author}><Link to="/author">Автори</Link></li>
            <li className={clasess.map}><Link to="/map">Карта допомоги</Link></li>
            <li className={clasess.admin}><Link to='/admin'>Адміни</Link></li>
            <Link to="/"><img onClick={()=>localStorage.removeItem('token')} src={exit_img} alt="EXIT" /></Link>
          </ul>
          <span className={clasess.menu__btn}></span>
        </nav>
    )
  }
export default Navbar
