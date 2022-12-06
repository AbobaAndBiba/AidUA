import axios from 'axios'
import React, { FC,useState,useEffect } from 'react'
import DistrictTableItem from '../districtTableItem/districtTableItem'
import clasess from "./districtTable.module.sass"


interface DistrictTableProps{
    token:string|null,
    counterDistrict:number,
    updateCountDistrict:any
}

const DistrictTable:FC<DistrictTableProps> = ({token,counterDistrict,updateCountDistrict})=>{

    const [DistrictData, SetDistrictData] = useState<any>()

    useEffect(()=>{
        (async () => SetDistrictData(await fetchDistrict()))();
    },[counterDistrict])

    useEffect(()=> {        
        console.log(DistrictData);
    },[DistrictData])

    async function fetchDistrict():Promise<any> {
        try {
            const response = await axios.get('http://localhost:5000/district',
            {headers: {'Authorization': 'Bearer '+token}})
            return response.data
        } catch (error:any) {
            console.log(error.response.data.message)
        }
    }

    async function deleteDistrict(id:string):Promise<any> {
        try {
            const response = await axios.delete('http://localhost:5000/district/'+id,
            {headers: {'Authorization': 'Bearer '+token}})
            updateCountDistrict(counterDistrict+1)
            return response.data
        } catch (error:any) {
            console.log(error.response.data.message)
        }
    }

    const renderTable =()=>{
        if(!DistrictData) return
        return DistrictData.map((item:any)=>{
            return <DistrictTableItem deleteDistrict={deleteDistrict} key={item.id} id={item.id} token={token} name={item.name} counterDistrict={counterDistrict} updateCountDistrict={updateCountDistrict}/>
        })
    }

    return(
        <div className={clasess.wrapper}>               
            <h3 className={clasess.titleDistrict}>Таблиця всіх підрайонів</h3>
            <div className={clasess.tableDistrict}>  
                <div className={clasess.title_block}>
                    <h4 className={clasess.titleDistrict}>Назва підрайона</h4>
                </div>
                <div className={clasess.District}>
                    {renderTable()}
                </div>
            </div>
        </div>
    )
}
export default DistrictTable

