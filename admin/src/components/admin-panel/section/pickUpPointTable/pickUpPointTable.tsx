import axios from 'axios'
import React, { FC,useState,useEffect } from 'react'
import PickUpPointTableItem from '../pickUpPointTableItem/pickUpPointTableItem'
import clasess from "./pickUpPointTable.module.sass"


interface PickUpPointTableProps{
    token:string|null,
    counterPickUpPoint:number,
    updateCountPickUpPoint:any,

    counterAdress:number,
    updateCountAdress:any,

    counterDistrict:number,
    updateCountDistrict:any,

    counterCoordinates:number,
    updateCountCoordinates:any,

    counterCity:number,
    updateCountCity:any,
    
    counterRegion:number,
    updateCountRegion:any

    counterAid:number,
    updateCountAid:any
    
}

const PickUpPointTable:FC<PickUpPointTableProps> = (
    {token,counterPickUpPoint,updateCountPickUpPoint,
        counterAdress,updateCountAdress,
        counterDistrict,updateCountDistrict,
        counterCoordinates,updateCountCoordinates,
        counterCity,updateCountCity,
        counterRegion,updateCountRegion,
        counterAid,updateCountAid
    })=>{

    const [PickUpPointData, SetPickUpPointData] = useState<any>()

    useEffect(()=>{
        (async () => SetPickUpPointData(await fetchPickUpPoint()))();
    },[counterPickUpPoint])

    useEffect(()=> {        
        console.log(PickUpPointData);
    },[PickUpPointData])

    // address

    const [address, SetAddress] = useState<any>()

    useEffect(()=>{
        (async () => SetAddress(await fetchAdress()))();
    },[counterAdress])

    useEffect(()=> {        
        console.log(address);
    },[address])

    // district

    const [district, SetDistrict] = useState<any>()

    useEffect(()=>{
        (async () => SetDistrict(await fetchDistrict()))();
    },[counterDistrict])

    useEffect(()=> {        
        console.log(district);
    },[district])

    // coordinates

    const [coordinates, SetCoordinates] = useState<any>()

    useEffect(()=>{
        (async () => SetCoordinates(await fetchCoordinates()))();
    },[counterCoordinates])

    useEffect(()=> {        
        console.log(coordinates);
    },[coordinates])

    // City

    const [city, SetCity] = useState<any>()

    useEffect(()=>{
        (async () => SetCity(await fetchCity()))();
    },[counterCity])

    useEffect(()=> {        
        console.log(city);
    },[city])

    // region

    const [region, SetRegion] = useState<any>()

    useEffect(()=>{
        (async () => SetRegion(await fetchRegion()))();
    },[counterRegion])

    useEffect(()=> {        
        console.log(region);
    },[region])

    // aid

    const [aid, SetAid] = useState<any>()

    useEffect(()=>{
        (async () => SetAid(await fetchAid()))();
    },[counterAid])

    useEffect(()=> {        
        console.log(aid);
    },[aid])

    async function fetchPickUpPoint():Promise<any> {
        try {
            const response = await axios.get('http://localhost:5000/pickup-point',
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
            const response = await axios.get('http://localhost:5000/city',
            {headers: {'Authorization': 'Bearer '+token}})
            return response.data
        } catch (error:any) {
            console.log(error.response.data.message)
        }
    }


    async function fetchCoordinates():Promise<any> {
        try {
            const response = await axios.get('http://localhost:5000/coordinates',
            {headers: {'Authorization': 'Bearer '+token}})
            return response.data
        } catch (error:any) {
            console.log(error.response.data.message)
        }
    }

    async function fetchDistrict():Promise<any> {
        try {
            const response = await axios.get('http://localhost:5000/district',
            {headers: {'Authorization': 'Bearer '+token}})
            return response.data
        } catch (error:any) {
            console.log(error.response.data.message)
        }
    }

    async function fetchAdress():Promise<any> {
        try {
            const response = await axios.get('http://localhost:5000/address',
            {headers: {'Authorization': 'Bearer '+token}})
            return response.data
        } catch (error:any) {
            console.log(error.response.data.message)
        }
    }

    async function fetchRegion():Promise<any> {
        try {
            const response = await axios.get('http://localhost:5000/region',
            {headers: {'Authorization': 'Bearer '+token}})
            return response.data
        } catch (error:any) {
            console.log(error.response.data.message)
        }
    }

    async function deletePickUpPoint(id:string):Promise<any> {
        try {
            const response = await axios.delete('http://localhost:5000/pickup-point/'+id,
            {headers: {'Authorization': 'Bearer '+token}})
            updateCountPickUpPoint(counterPickUpPoint+1)
            return response.data
        } catch (error:any) {
            console.log(error.response.data.message)
        }
    }

    async function deleteCity(id:string):Promise<any> {
        try {
            const response = await axios.delete('http://localhost:5000/city/'+id,
            {headers: {'Authorization': 'Bearer '+token}})
            updateCountPickUpPoint(counterPickUpPoint+1)
            return response.data
        } catch (error:any) {
            console.log(error.response.data.message)
        }
    }

    async function deleteCoordinates(id:string):Promise<any> {
        try {
            const response = await axios.delete('http://localhost:5000/coordinates/'+id,
            {headers: {'Authorization': 'Bearer '+token}})
            updateCountPickUpPoint(counterPickUpPoint+1)
            return response.data
        } catch (error:any) {
            console.log(error.response.data.message)
        }
    }

    async function deleteDistrict(id:string):Promise<any> {
        try {
            const response = await axios.delete('http://localhost:5000/district/'+id,
            {headers: {'Authorization': 'Bearer '+token}})
            updateCountPickUpPoint(counterPickUpPoint+1)
            return response.data
        } catch (error:any) {
            console.log(error.response.data.message)
        }
    }

    async function deleteRegion(id:string):Promise<any> {
        try {
            const response = await axios.delete('http://localhost:5000/region/'+id,
            {headers: {'Authorization': 'Bearer '+token}})
            updateCountPickUpPoint(counterPickUpPoint+1)
            return response.data
        } catch (error:any) {
            console.log(error.response.data.message)
        }
    }

    async function deleteAddress(id:string):Promise<any> {
        try {
            const response = await axios.delete('http://localhost:5000/address/'+id,
            {headers: {'Authorization': 'Bearer '+token}})
            updateCountPickUpPoint(counterPickUpPoint+1)
            return response.data
        } catch (error:any) {
            console.log(error.response.data.message)
        }
    }



    const renderTable =()=>{
        if(!PickUpPointData) return
        return PickUpPointData.map((item:any)=>{            
            return <PickUpPointTableItem 
            deletePickUpPoint={deletePickUpPoint} 
            key={item.id}
            id={item.id}
            token={token}
            name={item.name} 
            city={city?.find((o:any)=>o.id===item.cityId)}  
            region={region?.find((o:any)=>o.id===item.regionId)} 
            district={district?.find((o:any)=>o.id===item.districtId)} 
            address={address?.find((o:any)=>o.id===item.addressId)} 
            coordinates={coordinates?.find((o:any)=>o.id===item.coordinatesId)}  
            aid={aid?.find((o:any)=>o.id===item.aidId)} 
            counterPickUpPoint={counterPickUpPoint} 
            updateCountPickUpPoint={updateCountPickUpPoint} 
            cityState={city} 
            districtState={district}
            regionState={region}
            addressState={address}
            aidState={aid}
            coordinatesState={coordinates}
            />
        })
    }

    return(
        <div className={clasess.wrapper}>               
            <h3 className={clasess.titlePickUpPoint}>Таблиця всіх точок</h3>
            <div className={clasess.tablePickUpPoint}>  
                <div className={clasess.title_block}>
                    <h4 className={clasess.titlePickUpPoint}>Назва </h4>
                    <h4 className={clasess.titlePickUpPoint}>Назва міста</h4>
                    <h4 className={clasess.titlePickUpPoint}>Назва района</h4>
                    <h4 className={clasess.titlePickUpPoint}>Назва підрайона</h4>
                    <h4 className={clasess.titlePickUpPoint}>Назва адреси</h4>
                    <h4 className={clasess.titlePickUpPoint}>Координати</h4>
                    <h4 className={clasess.titlePickUpPoint}>Назва гуманітарної допомоги</h4>
                </div>
                <div className={clasess.PickUpPoint}>
                    {renderTable()}
                </div>
            </div>
        </div>
    )
}
export default PickUpPointTable

