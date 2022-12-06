import axios from 'axios'
import React, { FC,useState } from 'react'
import img__del from '../../../../img/icons/Вычитание.svg'
import img__reg from '../../../../img/icons/Редактирование.svg'
import img__add from '../../../../img/icons/add.svg'
import img__back from '../../../../img/icons/back.svg'
import clasess from "./addressTableItem.module.sass"

interface AdressTableItemProps{
    deleteAdress:any,
    id:string,
    token:string|null,
    name:string,
    counterAdress:number,
    updateCountAdress:any
}

const AdressTableItem:FC<AdressTableItemProps> = ({deleteAdress,id,token,name,counterAdress,updateCountAdress})=>{
    
    const[edit,SetEdit] = useState<boolean>(false)
    
    const[inputName,SetInputName]= useState(name)

    async function patchTableItem() {
        try {
            const response = await axios.patch('http://localhost:5000/address/'+id,
            {
                "name": inputName
            },
            {headers: {'Authorization': 'Bearer '+token}})
            console.log(token);
            
            SetEdit(!edit)
            updateCountAdress(counterAdress+1)

        } catch (error:any) {
            console.log(error.response.data.message)
        }
        
    }

    function renderTableItem (){
        if(!edit) return(
            <div className={clasess.wrapp}>
                <p className={clasess.name}>{name}</p>
                <div className={clasess.block_img}>
                    <img onClick={()=>deleteAdress(id)} src={img__del} alt="delete" />
                    <img onClick={()=>{SetEdit(!edit)}}  src={img__reg} alt="edit" />
                </div>
            </div>
        )
        return (
            <div className={clasess.wrapp}>
                <input className={clasess.inputName} value={inputName} onChange={(e)=>SetInputName(e.target.value)} type="text" name="newsTitle" />
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
export default AdressTableItem