import axios from 'axios'
import React, { FC,useState } from 'react'
import img__del from '../../../../img/icons/Вычитание.svg'
import img__reg from '../../../../img/icons/Редактирование.svg'
import img__add from '../../../../img/icons/add.svg'
import img__back from '../../../../img/icons/back.svg'
import clasess from "./newsTableItem.module.sass"


interface NewsTableItemProps{
    deleteNews:any,
    id:string,
    token:string|null,
    title:string,
    text:string,
    image:string,
    link:string,
    counterNews:number,
    updateCountNews:any
}

const NewsTableItem:FC<NewsTableItemProps>=({deleteNews,id,token,title,text,image,link,counterNews,updateCountNews})=>{
    
    const[edit,SetEdit] = useState<boolean>(false)

    const[inputTitle,SetInputTitle]= useState(title)
    const[inputImage,SetInputImage]= useState(image)
    const[inputLink,SetInputLink]= useState(link)
    const[inputText,SetInputText]= useState(text)

    async function patchTableItem() {
        try {
            const response = axios.patch('http://localhost:5000/news/'+id,
            {
                "text": inputText,
                "title":inputTitle,
                "link": inputLink,
                "image": inputImage
            },
            {headers: {'Authorization': 'Bearer '+token}})
            // console.log(token);
            
            SetEdit(!edit)
            updateCountNews(counterNews+1)

        } catch (error:any) {
            console.log(error.response.data.message)
        }
        
    }

    function renderTableItem (){
        if(!edit) return(

            <div className={clasess.wrapp}>
                <p className={clasess.title}>{title}</p>
                <p className={clasess.text}>{text}</p>
                <p className={clasess.link}>{link}</p>
                <p className={clasess.image}>{image}</p>
                <div className={clasess.block_img}>
                    <img onClick={()=>deleteNews(id)} src={img__del} alt="delete" />
                    <img onClick={()=>{SetEdit(!edit)}}  src={img__reg} alt="edit" />
                </div>
            </div>
        )
        return (
            <div className={clasess.wrapp}>
                <input className={clasess.inputTitle} value={inputTitle} onChange={(e)=>SetInputTitle(e.target.value)} type="text" name="newsTitle" />
                <input className={clasess.inputText} value={inputText} onChange={(e)=>SetInputText(e.target.value)} type="text" name="newsText" />
                <input className={clasess.inputLink} value={inputLink} onChange={(e)=>SetInputLink(e.target.value)} type="text" name="newsLink" />
                <input className={clasess.inputImg} value={inputImage} onChange={(e)=>SetInputImage(e.target.value)} type="text" name="newsImage" />
                <div className={clasess.block_img}>
                    <img onClick={()=>patchTableItem()} src={img__add} alt="add" />
                    <img onClick={()=>{SetEdit(!edit)}}  src={img__back} alt="edit" />
                </div>            
            </div>
        )
    }    
    return(
        renderTableItem()
    )
}
export default NewsTableItem