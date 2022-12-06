import axios from 'axios'
import React, { FC, useRef } from 'react'
import clasess from "./newsForm.module.sass"

interface NewsFormProps{
    token:string|null,
    counterNews:number,
    updateCountNews:any
}

const NewsForm:FC<NewsFormProps>=({token,counterNews,updateCountNews})=>{

    const inputTitle = useRef<HTMLInputElement>(null)
    const inputText = useRef<HTMLInputElement>(null)
    const inputLink = useRef<HTMLInputElement>(null)
    const inputImage = useRef<HTMLInputElement>(null)


    async function createNews():Promise<void> {
        try {
            const response = await axios.post('http://localhost:5000/news',
            {
                "text": inputText.current?.value,
                "title": inputTitle.current?.value,
                "link": inputLink.current?.value,
                "image": inputImage.current?.value,
                "createdAt": Date.now()
            },
            {headers: {'Authorization': 'Bearer '+token}})
            updateCountNews(counterNews+1)
            console.log(response)
            alert("Нову новину додано")
        } catch (error:any) {
            console.log(error?.response.data.message);
        }
    }
    const clickHandler = (e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        createNews();
    }

    return(
        <div>
            <div className={clasess.newsForm}>
            <div className={clasess.wrapper}>
                <h3 className={clasess.title}>Форма додавання нових новин</h3>
                <form action="#" method="post" className={clasess.form__createNews}>
                    <input type="text" ref={inputTitle} id={clasess.title} placeholder='Заголовок'/>
                    <input type="text" ref={inputText} id={clasess.text} placeholder='Текст новини'/>
                    <input type="text" ref={inputLink} id={clasess.link} placeholder='Посилання на статтю'/>
                    <input type="text" ref={inputImage} id={clasess.image} placeholder='Посилання на зображення'/>
                    <button onClick={clickHandler} type="submit">Додати</button>
                </form>  
            </div>
        </div>
        </div>
    )
}
export default NewsForm