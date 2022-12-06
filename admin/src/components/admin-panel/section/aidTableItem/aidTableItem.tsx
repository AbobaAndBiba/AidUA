import axios from 'axios'
import React, { FC,useState } from 'react'
import img__del from '../../../../img/icons/Вычитание.svg'
import img__reg from '../../../../img/icons/Редактирование.svg'
import img__add from '../../../../img/icons/add.svg'
import img__back from '../../../../img/icons/back.svg'
import clasess from "./aidTableItem.module.sass"

interface AidTableItemProps{
    deleteAid:any,
    id:string,
    token:string|null,
    registration:string,
    phone:string,
    counterAid:number,
    updateCountAid:any,
    author:any,
    authorState:string[]
}

const AidTableItem:FC<AidTableItemProps> = ({deleteAid,id,token,author,registration,phone,authorState,counterAid,updateCountAid})=>{
    
    const[edit,SetEdit] = useState<boolean>(false)
    
    
    const[inputAuthorNameAid,SetInputAuthorNameAid]= useState(author?.name)
    const[inputRegistrationAid,SetInputRegistrationAid]= useState(registration)
    const[inputPhoneAid,SetInputPhoneAid]= useState(phone)
    
    

    async function patchTableItem() {
        try {
            
            const response = await axios.patch('http://localhost:5000/aid/'+id,
            {
                "authorName": inputAuthorNameAid,
                "registration": inputRegistrationAid,
                "phone": inputPhoneAid
            },
            {headers: {'Authorization': 'Bearer '+token}})
            console.log(token);
            
            SetEdit(!edit)
            updateCountAid(counterAid+1)

        } catch (error:any) {
            console.log(error.response.data.message)
        }
        
    }

    
    function renderTableItem (){
        if(!edit) return(
            <div className={clasess.wrapp}>
                <p className={clasess.name}>{author?.name}</p>
                <p className={clasess.registration}>{registration}</p>
                <p className={clasess.phone}>{phone}</p>
                <div className={clasess.block_img}>
                    <img onClick={()=>deleteAid(id)} src={img__del} alt="delete" />
                    <img onClick={()=>{SetEdit(!edit)}}  src={img__reg} alt="edit" />
                </div>
            </div>
        )
        return (
            
            <div className={clasess.wrapp}>
                <select className={clasess.input}  onChange={(e)=>SetInputAuthorNameAid(e.target.value)} name="authorAid">
                    {authorState.map((item:any)=><option value={item.name} key={item.id}>{item.name}</option>)}
                </select>
                <input className={clasess.input} value={inputRegistrationAid} onChange={(e)=>SetInputRegistrationAid(e.target.value)} type="text" name="registrationAid" />
                <input className={clasess.input} value={inputPhoneAid} onChange={(e)=>SetInputPhoneAid(e.target.value)} type="text" name="phoneAid" />
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
export default AidTableItem