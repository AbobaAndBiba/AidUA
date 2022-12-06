import axios from 'axios'
import React, { FC,useRef } from 'react'
// import {AuthorProps} from '../../pages/author/authorPage'
import clasess from "./authorForm.module.sass"

interface AuthorFormProps{
    token:string|null,
    counterAuthor:number,
    updateCountAuthor:any
}

const AuthorForm:FC<AuthorFormProps>=({token,counterAuthor,updateCountAuthor})=>{

    const inputName = useRef<HTMLInputElement>(null)

    // const instance = axios.create({
    //     baseURL: 'http://localhost:5000',
    //     headers: {'Authorization': 'Bearer '+token}
    // });
    
    // create new author
    async function createAuthor():Promise<void> {
        try {
            const response = await axios.post('http://localhost:5000/author',
            {"name":inputName.current?.value},
            {headers: {'Authorization': 'Bearer '+token}})
            console.log(response)
            alert("Нового автора додано")
        } catch (error:any) {
            console.log(error)
            alert(error?.response.data.message)
        }
    }
    function clickHandler(e:React.MouseEvent<HTMLButtonElement>){
        e.preventDefault()
        createAuthor()
        updateCountAuthor(counterAuthor+1)
    }

    return(
        <div className={clasess.authorForm}>
            <div className={clasess.wrapper}>
                <h3 className={clasess.title}>Форма додавання нових авторів</h3>
                <form action="#" method="post" className={clasess.formAuthor}>
                    <input type="text" ref={inputName} id={clasess.name} placeholder="Ім'я автора" required />
                    <button type="submit" onClick={clickHandler}>Додати</button>
                </form>
            </div>
        </div>
    )
}
export default AuthorForm