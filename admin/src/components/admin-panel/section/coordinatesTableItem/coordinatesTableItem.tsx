import axios from 'axios'
import React, { FC,useState } from 'react'
import img__del from '../../../../img/icons/Вычитание.svg'
import img__reg from '../../../../img/icons/Редактирование.svg'
import img__add from '../../../../img/icons/add.svg'
import img__back from '../../../../img/icons/back.svg'
import clasess from "./coordinatesTableItem.module.sass"

interface CoordinatesTableItemProps{
    deleteCoordinates:any,
    id:string,
    token:string|null,
    x:number,
    y:number,
    counterCoordinates:number,
    updateCountCoordinates:any
}

const CoordinatesTableItem:FC<CoordinatesTableItemProps> = ({deleteCoordinates,id,token,x,y,counterCoordinates,updateCountCoordinates})=>{
    
    const[edit,SetEdit] = useState<boolean>(false)
    
    const[inputXCoordinates,SetInputXCoordinates]= useState(x)
    const[inputYCoordinates,SetInputYCoordinates]= useState(y)

    async function patchTableItem() {
        try {
            const response = await axios.patch('http://localhost:5000/coordinates/'+id,
            {
                "x": inputXCoordinates,
                "y": inputYCoordinates
            },
            {headers: {'Authorization': 'Bearer '+token}})
            console.log(token);
            
            SetEdit(!edit)
            updateCountCoordinates(counterCoordinates+1)

        } catch (error:any) {
            console.log(error.response.data.message)
        }
        
    }

    function renderTableItem (){
        if(!edit) return(
            <div className={clasess.wrapp}>
                <p className={clasess.x}>{x}</p>
                <p className={clasess.y}>{y}</p>
                <div className={clasess.block_img}>
                    <img onClick={()=>deleteCoordinates(id)} src={img__del} alt="delete" />
                    <img onClick={()=>{SetEdit(!edit)}}  src={img__reg} alt="edit" />
                </div>
            </div>
        )
        return (
            <div className={clasess.wrapp}>
                <input className={clasess.inputXCoordinates} value={inputXCoordinates} onChange={(e)=>SetInputXCoordinates(isNaN(Number(e.target.value))?inputXCoordinates:Number(e.target.value))} type="text" name="newsTitle" />
                <input className={clasess.inputYCoordinates} value={inputYCoordinates} onChange={(e)=>SetInputYCoordinates(isNaN(Number(e.target.value))?inputYCoordinates:Number(e.target.value))} type="text" name="newsTitle" />
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
export default CoordinatesTableItem