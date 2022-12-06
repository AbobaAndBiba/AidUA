import axios from 'axios'
import React, { FC,useState,useEffect } from 'react'
import RegionTableItem from '../regionTableItem/regionTableItem'
import clasess from "./regionTable.module.sass"


interface RegionTableProps{
    token:string|null,
    counterRegion:number,
    updateCountRegion:any
}

const RegionTable:FC<RegionTableProps> = ({token,counterRegion,updateCountRegion})=>{

    const [RegionData, SetRegionData] = useState<any>()

    useEffect(()=>{
        (async () => SetRegionData(await fetchRegion()))();
    },[counterRegion])

    useEffect(()=> {        
        console.log(RegionData);
    },[RegionData])

    async function fetchRegion():Promise<any> {
        try {
            const response = await axios.get('http://localhost:5000/region',
            {headers: {'Authorization': 'Bearer '+token}})
            return response.data
        } catch (error:any) {
            console.log(error.response.data.message)
        }
    }

    async function deleteRegion(id:string):Promise<any> {
        try {
            const response = await axios.delete('http://localhost:5000/region/'+id,
            {headers: {'Authorization': 'Bearer '+token}})
            updateCountRegion(counterRegion+1)
            return response.data
        } catch (error:any) {
            console.log(error.response.data.message)
        }
    }

    const renderTable =()=>{
        if(!RegionData) return
        return RegionData.map((item:any)=>{
            return <RegionTableItem deleteRegion={deleteRegion} key={item.id} id={item.id} token={token} name={item.name} counterRegion={counterRegion} updateCountRegion={updateCountRegion}/>
        })
    }

    return(
        <div className={clasess.wrapper}>               
            <h3 className={clasess.titleRegion}>Таблиця всіх регіонів</h3>
            <div className={clasess.tableRegion}>  
                <div className={clasess.title_block}>
                    <h4 className={clasess.titleRegion}>Назва регіона</h4>
                </div>
                <div className={clasess.Region}>
                    {renderTable()}
                </div>
            </div>
        </div>
    )
}
export default RegionTable

