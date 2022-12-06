import axios from 'axios'
import React,{FC, useRef} from 'react'
import clasess from "./adminForm.module.sass"

const AdminForm:FC=()=>{
    // input forms
    const inputNick = useRef<HTMLInputElement>(null)
    const inputPass = useRef<HTMLInputElement>(null)

    //registration new admin
    async function regAdmin(): Promise<void>{
        try {
            const response = await axios.post('http://localhost:5000/auth/registration',
            {"login": inputNick.current?.value,
            "password": inputPass.current?.value})

            alert('Адмінстратора додано!')
        } catch (error:any) {
            alert(error?.response.data.message)
        }
    }

    const clickHandler = (e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        regAdmin();
    }

    return (
        <div className={clasess.adminform}>
            <div className={clasess.wrapper}>
                <h3 className={clasess.title}>Форма додавання нових адмінів</h3>
                <form action="#" method="post" className={clasess.form__adminReg}>
                    <input type="text" ref={inputNick} id={clasess.login} placeholder='Логін'/>
                    <input type="password" ref={inputPass} id={clasess.pass} placeholder='Пароль'/>
                    <button onClick={clickHandler} type="submit">Додати</button>
                </form>  
            </div>
        </div>
    )
}
export default AdminForm