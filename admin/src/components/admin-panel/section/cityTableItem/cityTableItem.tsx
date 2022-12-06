import axios from 'axios'
import React, { FC,useState } from 'react'
import img__del from '../../../../img/icons/Вычитание.svg'
import img__reg from '../../../../img/icons/Редактирование.svg'
import img__add from '../../../../img/icons/add.svg'
import img__back from '../../../../img/icons/back.svg'
import clasess from "./cityTableItem.module.sass"

interface CityTableItemProps{
    deleteCity:any,
    id:string,
    token:string|null,
    name:string,
    counterCity:number,
    updateCountCity:any
}

const CityTableItem:FC<CityTableItemProps> = ({deleteCity,id,token,name,counterCity,updateCountCity})=>{
    
    const[edit,SetEdit] = useState<boolean>(false)
    
    const[inputNameCity,SetInputNameCity]= useState(name)

    async function patchTableItem() {
        try {
            const response = await axios.patch('http://localhost:5000/city/'+id,
            {
                "name": inputNameCity
            },
            {headers: {'Authorization': 'Bearer '+token}})
            console.log(token);
            
            SetEdit(!edit)
            updateCountCity(counterCity+1)

        } catch (error:any) {
            console.log(error.response.data.message)
        }
        
    }

    function renderTableItem (){
        if(!edit) return(
            <div className={clasess.wrapp}>
                <p className={clasess.name}>{name}</p>
                <div className={clasess.block_img}>
                    <img onClick={()=>deleteCity(id)} src={img__del} alt="delete" />
                    <img onClick={()=>{SetEdit(!edit)}}  src={img__reg} alt="edit" />
                </div>
            </div>
        )
        return (
            <div className={clasess.wrapp}>
                <input className={clasess.inputNameCity} value={inputNameCity} onChange={(e)=>SetInputNameCity(e.target.value)} type="text" name="newsTitle" />
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
export default CityTableItem