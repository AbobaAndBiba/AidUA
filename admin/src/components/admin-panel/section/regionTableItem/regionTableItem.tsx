import axios from 'axios'
import React, { FC,useState } from 'react'
import img__del from '../../../../img/icons/Вычитание.svg'
import img__reg from '../../../../img/icons/Редактирование.svg'
import img__add from '../../../../img/icons/add.svg'
import img__back from '../../../../img/icons/back.svg'
import clasess from "./regionTableItem.module.sass"

interface RegionTableItemProps{
    deleteRegion:any,
    id:string,
    token:string|null,
    name:string,
    counterRegion:number,
    updateCountRegion:any
}

const RegionTableItem:FC<RegionTableItemProps> = ({deleteRegion,id,token,name,counterRegion,updateCountRegion})=>{
    
    const[edit,SetEdit] = useState<boolean>(false)
    
    const[inputNameRegion,SetInputNameRegion]= useState(name)

    async function patchTableItem() {
        try {
            const response = await axios.patch('http://localhost:5000/region/'+id,
            {
                "name": inputNameRegion
            },
            {headers: {'Authorization': 'Bearer '+token}})
            console.log(token);
            
            SetEdit(!edit)
            updateCountRegion(counterRegion+1)

        } catch (error:any) {
            console.log(error.response.data.message)
        }
        
    }

    function renderTableItem (){
        if(!edit) return(
            <div className={clasess.wrapp}>
                <p className={clasess.name}>{name}</p>
                <div className={clasess.block_img}>
                    <img onClick={()=>deleteRegion(id)} src={img__del} alt="delete" />
                    <img onClick={()=>{SetEdit(!edit)}}  src={img__reg} alt="edit" />
                </div>
            </div>
        )
        return (
            <div className={clasess.wrapp}>
                <input className={clasess.inputNameRegion} value={inputNameRegion} onChange={(e)=>SetInputNameRegion(e.target.value)} type="text" name="newsTitle" />
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
export default RegionTableItem