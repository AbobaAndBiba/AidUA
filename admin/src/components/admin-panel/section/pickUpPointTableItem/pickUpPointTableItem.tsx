import axios from 'axios'
import React, { FC,useState } from 'react'
import img__del from '../../../../img/icons/Вычитание.svg'
import img__reg from '../../../../img/icons/Редактирование.svg'
import img__add from '../../../../img/icons/add.svg'
import img__back from '../../../../img/icons/back.svg'
import clasess from "./pickUpPointTableItem.module.sass"

interface PickUpPointTableItemProps{
    deletePickUpPoint:any,
    id:string,
    token:string|null,
    name:any,
    city:any,
    region:any,
    district:any,
    address:any,
    coordinates:any,
    aid:any,
    cityState:string[],
    regionState:string[],
    districtState:string[],
    addressState:string[],
    coordinatesState:any[],
    aidState:any[],
    counterPickUpPoint:number,
    updateCountPickUpPoint:any
}

const PickUpPointTableItem:FC<PickUpPointTableItemProps> = ({deletePickUpPoint,id,token,name,city,region,district,address,coordinates,aid,cityState,regionState,districtState,addressState,coordinatesState,aidState,counterPickUpPoint,updateCountPickUpPoint})=>{
    
    const[edit,SetEdit] = useState<boolean>(false)
    
    const[inputNamePickUpPoint,SetInputNamePickUpPoint]= useState(name)
    const[inputCityPickUpPoint,SetInputCityPickUpPoint]= useState(city?.id)
    const[inputRegionPickUpPoint,SetInputRegionPickUpPoint]= useState(region?.id)
    const[inputDistrictPickUpPoint,SetInputDistrictPickUpPoint]= useState(district?.id)
    const[inputAddressPickUpPoint,SetInputAddressPickUpPoint]= useState(address?.id)
    const[inputCoordinatesPickUpPoint,SetInputCoordinatesPickUpPoint]= useState(coordinates?.id)
    const[inputAidPickUpPoint,SetInputAidPickUpPoint]= useState(aid?.id)
    

    async function patchTableItem() {
        try {
            const response = await axios.patch('http://localhost:5000/pickup-point/'+id,
            {
                "name": inputNamePickUpPoint,
                "cityId":inputCityPickUpPoint,
                "regionId":inputRegionPickUpPoint,
                "districtId":inputDistrictPickUpPoint,
                "addressId":inputAddressPickUpPoint,
                "coordinatesId":inputCoordinatesPickUpPoint,
                "aidId":inputAidPickUpPoint
            },
            {headers: {'Authorization': 'Bearer '+token}})
            console.log(token);
            
            SetEdit(!edit)
            updateCountPickUpPoint(counterPickUpPoint+1)

        } catch (error:any) {
            console.log(error.response.data.message)
        }
        
    }

    function renderTableItem (){
        console.log(aid);
        
        if(!edit) return(
            <div className={clasess.wrapp}>
                <p className={clasess.name}>{name}</p>
                <p className={clasess.city}>{city.name}</p>
                <p className={clasess.region}>{region.name}</p>
                <p className={clasess.district}>{district.name}</p>
                <p className={clasess.address}>{address.name}</p>
                <p className={clasess.coordinates}>{coordinates?.x +" "+ coordinates?.y}</p>
                <p className={clasess.aid}>{aid?.registration}</p>
                
                <div className={clasess.block_img}>
                    <img onClick={()=>deletePickUpPoint(id)} src={img__del} alt="delete" />
                    <img onClick={()=>{SetEdit(!edit)}}  src={img__reg} alt="edit" />
                </div>
            </div>
        )
        return (
            <div className={clasess.wrapp}>
                <input className={clasess.input} value={inputNamePickUpPoint} onChange={(e)=>SetInputNamePickUpPoint(e.target.value)} type="text" name="namePoint" />
                <select className={clasess.input}  onChange={(e)=>SetInputCityPickUpPoint(e.target.value)} name="cityPoint">
                    {cityState.map((item:any)=><option value={item.id} key={item.id}>{item.name}</option>)}
                </select>
                <select className={clasess.input} onChange={(e)=>SetInputRegionPickUpPoint(e.target.value)} name="regionPoint">
                    {regionState.map((item:any)=><option value={item.id} key={item.id}>{item.name}</option>)}
                </select>
                <select className={clasess.input} onChange={(e)=>SetInputDistrictPickUpPoint(e.target.value)} name="districtPoint">
                    {districtState.map((item:any)=><option value={item.id} key={item.id}>{item.name}</option>)}
                </select>
                <select className={clasess.input} onChange={(e)=>SetInputAddressPickUpPoint(e.target.value)} name="addressPoint">
                    {addressState.map((item:any)=><option value={item.id} key={item.id}>{item.name}</option>)}
                </select>
                <select className={clasess.input} value={inputNamePickUpPoint} onChange={(e)=>SetInputCoordinatesPickUpPoint(e.target.value)} name="coordinatesPoint" >
                    {coordinatesState.map((item:any)=><option value={item.id} key={item.id}>{item?.x+" "+item?.y}</option>)}
                </select>
                <select className={clasess.input} value={inputNamePickUpPoint} onChange={(e)=>SetInputAidPickUpPoint(e.target.value)} name="aidPoint" >
                    {aidState.map((item:any)=><option value={item.id} key={item.id}>{item.registration}</option>)}
                </select>
                
                
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
export default PickUpPointTableItem