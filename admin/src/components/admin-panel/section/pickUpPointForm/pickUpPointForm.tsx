import axios from 'axios'
import React, { FC, useRef,useState,useEffect } from 'react'
import clasess from "./pickUpPointForm.module.sass"

interface PickUpPointFormProps{
    token:string|null,
    counterPickUpPoint:number,
    updateCountPickUpPoint:any
}

const PickUpPointForm:FC<PickUpPointFormProps>=({token,counterPickUpPoint,updateCountPickUpPoint})=>{

    const inputNamePickUpPoint = useRef<HTMLInputElement>(null)
    
    const [city, SetCity]= useState<any>()
    const [cityData, SetCityData] = useState<any>()
  

    const [region, SetRegion]= useState<any>()
    const [regionData, SetRegionData] = useState<any>()

    const [district, SetDistrict]= useState<any>()
    const [districtData, SetDistrictData] = useState<any>()

    const [address, SetAddress]= useState<any>()
    const [addressData, SetAddressData] = useState<any>()

    const [coordinates, SetCoordinates]= useState<any>()
    const [coordinatesData, SetCoordinatesData] = useState<any>()

    const [aid, SetAid]= useState<any>()
    const [aidData, SetAidData] = useState<any>()

    // city 
    useEffect(()=>{
        (async () => SetCity(await fetchCity()))();
    },[counterPickUpPoint])

    useEffect(()=> {        
        console.log(cityData);
    },[cityData])

    // region 
    useEffect(()=>{
        (async () => SetRegion(await fetchRegion()))();
    },[counterPickUpPoint])

    useEffect(()=> {        
        console.log(regionData);
    },[regionData])

    // district 
    useEffect(()=>{
        (async () => SetDistrict(await fetchDistrict()))();
    },[counterPickUpPoint])

    useEffect(()=> {        
        console.log(districtData);
    },[districtData])

    // address 
    useEffect(()=>{
        (async () => SetAddress(await fetchAddress()))();
    },[counterPickUpPoint])

    useEffect(()=> {        
        console.log(addressData);
    },[addressData])

    // coordinates
    useEffect(()=>{
        (async () => SetCoordinates(await fetchCoordinates()))();
    },[counterPickUpPoint])

    useEffect(()=> {        
        console.log(coordinatesData);
    },[coordinatesData])

    // aid
    useEffect(()=>{
        (async () => SetAid(await fetchAid()))();
    },[counterPickUpPoint])

    useEffect(()=> {        
        console.log(aidData);
    },[aidData])


    async function fetchRegion():Promise<any> {
        try {
            const response = await axios.get('http://localhost:5000/region/',
            {headers: {'Authorization': 'Bearer '+token}})
            return response.data
        } catch (error:any) {
            console.log(error.response.data.message)
        }
    }

    async function fetchAddress():Promise<any> {
        try {
            const response = await axios.get('http://localhost:5000/address/',
            {headers: {'Authorization': 'Bearer '+token}})
            return response.data
        } catch (error:any) {
            console.log(error.response.data.message)
        }
    }

    async function fetchDistrict():Promise<any> {
        try {
            const response = await axios.get('http://localhost:5000/district/',
            {headers: {'Authorization': 'Bearer '+token}})
            return response.data
        } catch (error:any) {
            console.log(error.response.data.message)
        }
    }

    async function fetchCoordinates():Promise<any> {
        try {
            const response = await axios.get('http://localhost:5000/coordinates/',
            {headers: {'Authorization': 'Bearer '+token}})
            return response.data
        } catch (error:any) {
            console.log(error.response.data.message)
        }
    }

    async function fetchAid():Promise<any> {
        try {
            const response = await axios.get('http://localhost:5000/aid/',
            {headers: {'Authorization': 'Bearer '+token}})
            return response.data
        } catch (error:any) {
            console.log(error.response.data.message)
        }
    }


    async function fetchCity():Promise<any> {
        try {
            const response = await axios.get('http://localhost:5000/city/',
            {headers: {'Authorization': 'Bearer '+token}})
            return response.data
        } catch (error:any) {
            console.log(error.response.data.message)
        }
    }


    async function createPickUpPoint():Promise<void> {
                
        console.log(cityData);

        try {
            const response = await axios.post('http://localhost:5000/pickup-point',
            {
                "name": inputNamePickUpPoint.current?.value,
                "cityId": cityData,
                "regionId":regionData,
                "districtId":districtData,
                "addressId":addressData,
                "coordinatesId":coordinatesData,
                "aidId":aidData
            },
            {headers: {'Authorization': 'Bearer '+token}})
            updateCountPickUpPoint(counterPickUpPoint+1)
            console.log(response)
            alert("Нову точку допомоги додано")
        } catch (error:any) {
            console.log(error?.response.data.message);
        }
    }
    const clickHandler = (e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        createPickUpPoint();
    }

    return(
        <div>
            <div className={clasess.PickUpPointForm}>
                <div className={clasess.wrapper}>
                    <h3 className={clasess.title}>Форма додавання нових гуманітарних допомог</h3>
                    <form action="#" method="post" className={clasess.form__createPickUpPoint}>
                        <input type="text" ref={inputNamePickUpPoint} id={clasess.title} placeholder='Назва точки'/>
                        <select onChange={(e)=>SetCityData(e.target.value)} name="cityName">
                            <option defaultChecked={true}>Виберіть місто</option>
                            {city?.map((item:any)=><option value={item?.name} key={item.id}>{item?.name}</option>)}
                        </select>
                        <select onChange={(e)=>SetRegionData(e.target.value)} name="regionName">
                            <option defaultChecked>Виберіть район</option>
                            {region?.map((item:any)=><option value={item?.name} key={item.id}>{item?.name}</option>)}
                        </select>
                        <select onChange={(e)=>SetDistrictData(e.target.value)} name="districtName">
                            <option defaultChecked>Виберіть підрайон</option>
                            {district?.map((item:any)=><option value={item?.name} key={item.id}>{item?.name}</option>)}
                        </select>
                        <select onChange={(e)=>SetAddressData(e.target.value)} name="addressName">
                            <option defaultChecked>Виберіть вулицю</option>
                            {address?.map((item:any)=><option value={item?.name} key={item.id}>{item?.name}</option>)}
                        </select>
                        <select onChange={(e)=>SetCoordinatesData(e.target.value)} name="coordinatesXY">
                            <option defaultChecked>Виберіть автора</option>
                            {coordinates?.map((item:any)=><option value={item?.x+" "+item?.y} key={item.id}>{item?.x+" "+item?.y}</option>)}
                        </select>
                        <select onChange={(e)=>SetAidData(e.target.value)} name="AidData">
                            <option defaultChecked>Виберіть автора</option>
                            {aid?.map((item:any)=><option value={item?.registration+" "+ item.phone } key={item.id}>{item?.registration+" "+ item.phone}</option>)}
                        </select>
                        <button onClick={clickHandler} type="submit">Додати</button>
                    </form>  
                </div>
            </div>
        </div>
    )
}
export default PickUpPointForm