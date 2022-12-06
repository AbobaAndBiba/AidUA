import axios from 'axios'
import React, { FC, useState } from 'react'
import img__del from '../../../../img/icons/Вычитание.svg'
import img__reg from '../../../../img/icons/Редактирование.svg'
import img__add from '../../../../img/icons/add.svg'
import img__back from '../../../../img/icons/back.svg'
import clasess from "./authorTableItem.module.sass"

interface authorTableItemProps{
    deleteAuthor:any,
    id:string,
    token:string|null,
    name:string,
    counterAuthor:number,
    updateCountAuthor:any
}

const AuthorTableItem:FC<authorTableItemProps>=({deleteAuthor,id,token,name,counterAuthor,updateCountAuthor})=>{
    const[edit,SetEdit] = useState<boolean>(false) 

    const[input,SetInput]= useState(name)

    async function patchTableItem() {
        try {
            const response = axios.patch('http://localhost:5000/author/'+id,
            {"name":input},
            {headers: {'Authorization': 'Bearer '+token}})
            
            SetEdit(!edit)
            updateCountAuthor(counterAuthor+1)

        } catch (error:any) {
            console.log(error.propse.data)
        }
        
    }


    function renderTableItem (){
        if(!edit) return ( 
            <div className={clasess.item__wrapp}>
                {name}
                <div className={clasess.block_img}>
                    <img onClick={()=>deleteAuthor(id)} src={img__del} alt="delete" />
                    <img onClick={()=>{SetEdit(!edit)}}  src={img__reg} alt="edit" />
                </div>
            </div>
        )
        
        return (
            <div className={clasess.item__wrapp}>
                <input value={input} onChange={(e)=>SetInput(e.target.value)} type="text" name="authorName" />
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
export default AuthorTableItem