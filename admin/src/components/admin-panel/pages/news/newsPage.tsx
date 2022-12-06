import React, { FC, useState } from 'react'
import Navbar from '../../section/navbar/navbar'
import NewsForm from '../../section/newsForm/newsForm'
import NewsTable from '../../section/newsTable/newsTable'
import clasess from "./newsPage.module.sass"

interface NewsProps{
    token:string|null
}

const NewsPage:FC<NewsProps>=({token})=>{
    const [countNews, SetCountNews] = useState<number>(0)
    return(
        <div className={clasess.wrapper}>
            <Navbar></Navbar>
            <NewsForm token={token} counterNews={countNews} updateCountNews={SetCountNews}></NewsForm>
            <NewsTable token={token} counterNews={countNews} updateCountNews={SetCountNews} ></NewsTable>
        </div>
    )
}
export default NewsPage