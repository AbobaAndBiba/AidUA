import React, { FC,useState,useEffect } from 'react'
import AidForm from '../../section/aidForm/aidForm'
import AidTable from '../../section/aidTable/aidTable'
import Navbar from '../../section/navbar/navbar'
import clasess from "./aidPage.module.sass"

interface AuthorProps{
    token:string|null
}

const AidPage:FC<AuthorProps>=({token})=>{

    const [countAid, SetCountAid] = useState<number>(0) 
    const [countAuthor, SetCountAuthor] = useState<number>(0) 


    return(
        <div className={clasess.wrapper}>
            <Navbar></Navbar>
            <AidForm token={token} counterAid={countAid} updateCountAid={SetCountAid}/>
            <AidTable token={token} counterAid={countAid} updateCountAid={SetCountAid} counterAuthor={countAuthor} updateCountAuthor={SetCountAuthor}/>
        </div>
    )
}
export default AidPage