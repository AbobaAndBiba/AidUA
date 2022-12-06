import React, { FC, useRef, useState,useEffect } from 'react'
import classes from "./login.module.sass"
import Main from '../admin-panel/section/navbar/navbar'
import axios from "axios"
import { useNavigate } from 'react-router-dom'


const Login:FC=()=> {
   

    const inputRefNick = useRef<HTMLInputElement>(null)
    const inputRefPass = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()

    async function fetchUser(): Promise<void>{
        try {
            // get token to the local storage
            const response = await axios.post("http://localhost:5000/auth/login",
            {"login": inputRefNick.current?.value,
            "password": inputRefPass.current?.value})
            localStorage.setItem("token",response.data.token)

        } catch (error:any) {
            alert(error?.response.data.message)
        }

    }

    const clickHandler = (e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        fetchUser();
        navigate('/admin')
    }
    return (
        <section className={classes.login}>
            <div className={classes.container}>
                <div className={classes.wrapper}>
                    <h1 className={classes.title}>Авторизація</h1>
                    <form action="#" method="post" className={classes.form}>
                        <input type="text" ref={inputRefNick} id={classes.nickname} placeholder="Логін"/>
                        <input type="password" ref={inputRefPass} id={classes.pass} placeholder="Пароль"/>
                        <button  onClick={clickHandler}  className={classes.btn}>Увійти</button>
                    </form>
                </div>
            </div>
        </section>
    )
}
export default Login