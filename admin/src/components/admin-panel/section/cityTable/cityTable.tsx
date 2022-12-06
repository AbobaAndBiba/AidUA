import axios from 'axios'
import React, { FC,useState,useEffect } from 'react'
import CityTableItem from '../cityTableItem/cityTableItem'
import clasess from "./cityTable.module.sass"


interface CityTableProps{
    token:string|null,
    counterCity:number,
    updateCountCity:any
}

const CityTable:FC<CityTableProps> = ({token,counterCity,updateCountCity})=>{

    const [cityData, SetCityData] = useState<any>()

    useEffect(()=>{
        (async () => SetCityData(await fetchCity()))();
    },[counterCity])

    useEffect(()=> {        
        console.log(cityData);
    },[cityData])

    async function fetchCity():Promise<any> {
        try {
            const response = await axios.get('http://localhost:5000/city',
            {headers: {'Authorization': 'Bearer '+token}})
            return response.data
        } catch (error:any) {
            console.log(error.response.data.message)
        }
    }

    async function deleteCity(id:string):Promise<any> {
        try {
            const response = await axios.delete('http://localhost:5000/city/'+id,
            {headers: {'Authorization': 'Bearer '+token}})
            updateCountCity(counterCity+1)
            return response.data
        } catch (error:any) {
            console.log(error.response.data.message)
        }
    }

    const renderTable =()=>{
        if(!cityData) return
        return cityData.map((item:any)=>{
            return <CityTableItem deleteCity={deleteCity} key={item.id} id={item.id} token={token} name={item.name} counterCity={counterCity} updateCountCity={updateCountCity}/>
        })
    }

    return(
        <div className={clasess.wrapper}>               
            <h3 className={clasess.titleCity}>Таблиця всіх міст</h3>
            <div className={clasess.tableCity}>  
                <div className={clasess.title_block}>
                    <h4 className={clasess.titleCity}>Назва міста</h4>
                </div>
                <div className={clasess.City}>
                    {renderTable()}
                </div>
            </div>
        </div>
    )
}
export default CityTable

