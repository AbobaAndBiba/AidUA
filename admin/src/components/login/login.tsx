import React, { FC, useRef, useState } from 'react'
import classes from "./login.module.sass"
import axios from "axios"

const Login:FC=()=> {
    const inputRefNick = useRef<HTMLInputElement>(null)
    const inputRefPass = useRef<HTMLInputElement>(null)
    
    async function fetchUser(){
        try {
            const response = await axios.post("http://localhost:5000/auth/login",
            {"login": inputRefNick.current?.value,
            "password": inputRefPass.current?.value})
            localStorage.setItem("token",response.data.token)

        } catch (error) {
            console.log(error)
        }
    }

    const clickHandler = (e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        fetchUser()
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