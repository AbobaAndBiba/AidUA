import axios from 'axios'
import React, { FC,useState } from 'react'
import img__del from '../../../../img/icons/Вычитание.svg'
import img__reg from '../../../../img/icons/Редактирование.svg'
import img__add from '../../../../img/icons/add.svg'
import img__back from '../../../../img/icons/back.svg'
import clasess from "./districtTableItem.module.sass"

interface DistrictTableItemProps{
    deleteDistrict:any,
    id:string,
    token:string|null,
    name:string,
    counterDistrict:number,
    updateCountDistrict:any
}

const DistrictTableItem:FC<DistrictTableItemProps> = ({deleteDistrict,id,token,name,counterDistrict,updateCountDistrict})=>{
    
    const[edit,SetEdit] = useState<boolean>(false)
    
    const[inputNameDistrict,SetInputNameDistrict]= useState(name)

    async function patchTableItem() {
        try {
            const response = await axios.patch('http://localhost:5000/District/'+id,
            {
                "name": inputNameDistrict
            },
            {headers: {'Authorization': 'Bearer '+token}})
            console.log(token);
            
            SetEdit(!edit)
            updateCountDistrict(counterDistrict+1)

        } catch (error:any) {
            console.log(error.response.data.message)
        }
        
    }

    function renderTableItem (){
        if(!edit) return(
            <div className={clasess.wrapp}>
                <p className={clasess.name}>{name}</p>
                <div className={clasess.block_img}>
                    <img onClick={()=>deleteDistrict(id)} src={img__del} alt="delete" />
                    <img onClick={()=>{SetEdit(!edit)}}  src={img__reg} alt="edit" />
                </div>
            </div>
        )
        return (
            <div className={clasess.wrapp}>
                <input className={clasess.inputNameDistrict} value={inputNameDistrict} onChange={(e)=>SetInputNameDistrict(e.target.value)} type="text" name="newsTitle" />
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
export default DistrictTableItem