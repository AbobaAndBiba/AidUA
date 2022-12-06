import React, { FC,useState,useEffect } from 'react'
import AuthorForm from '../../section/authorForm/authorForm'
import AuthorTable from '../../section/authorTable/authorTable'
import Navbar from '../../section/navbar/navbar'
import clasess from "./authorPage.module.sass"

interface AuthorProps{
    token:string|null
}

const AuthorPage:FC<AuthorProps>=({token})=>{

    const [countAuthor, SetCountAuthor] = useState<number>(0) 


    // useEffect(()=>{
    //     console.log(countAuthor);
        
    // })

    return(
        <div className={clasess.wrapper}>
            <Navbar></Navbar>
            <AuthorForm token={token} counterAuthor={countAuthor} updateCountAuthor={SetCountAuthor}/>
            <AuthorTable token={token} counterAuthor={countAuthor}  updateCountAuthor={SetCountAuthor}/>
        </div>
    )
}
export default AuthorPage