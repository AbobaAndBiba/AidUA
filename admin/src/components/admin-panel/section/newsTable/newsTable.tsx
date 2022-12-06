import axios from 'axios';
import React, { FC, useEffect, useState } from 'react'
import NewsTableItem from '../newsTableItem/newsTableItem';
import clasess from "./newsTable.module.sass"

interface NewsTableProps{
    token:string|null,
    counterNews:number,
    updateCountNews:any
}

const NewsTable:FC<NewsTableProps> = ({token,counterNews,updateCountNews})=>{
    const [newsData, SetNewsData] = useState<any>()

    useEffect(()=>{
        (async () => SetNewsData(await fetchNews()))();
    },[counterNews])

    useEffect(()=> {        
        console.log(newsData);
    },[newsData])

    async function fetchNews():Promise<any> {
        try {
            const response = await axios.get('http://localhost:5000/news',
            {headers: {'Authorization': 'Bearer '+token}})
            return response.data
        } catch (error:any) {
            console.log(error.response.data.message)
        }
    }

    async function deleteNews(id:string):Promise<any> {
        try {
            const response = await axios.delete('http://localhost:5000/news/'+id,
            {headers: {'Authorization': 'Bearer '+token}})
            updateCountNews(counterNews+1)
            return response.data
        } catch (error:any) {
            console.log(error.response.data.message)
        }
    }

    const renderTable =()=>{
        if(!newsData) return
        return newsData.map((item:any)=>{
            return <NewsTableItem deleteNews={deleteNews} key={item.id} id={item.id} token={token} title={item.title} text={item.text} image={item.image} link={item.link} counterNews={counterNews} updateCountNews={updateCountNews}/>
        })
    }

    return(
        <div className={clasess.wrapper}>               
            <h3 className={clasess.titleNews}>Таблиця всіх новин</h3>
            <div className={clasess.tableNews}>  
                <div className={clasess.title_block}>
                    <h4 className={clasess.titleNews}>Заголовок</h4>
                    <h4 className={clasess.textNews}>Текст</h4>
                    <h4 className={clasess.imgNews}>Зображення</h4>
                    <h4 className={clasess.linkNews}>Посилання</h4>
                </div>
                <div className={clasess.news}>
                    {renderTable()}
                </div>
            </div>
        </div>
    )
}
export default NewsTable