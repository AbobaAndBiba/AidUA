import axios from 'axios'
import React, { FC,useState,useEffect } from 'react'
import CoordinatesTableItem from '../coordinatesTableItem/coordinatesTableItem'
import clasess from "./coordinatesTable.module.sass"

interface CoordinatesTableProps{
    token:string|null,
    counterCoordinates:number,
    updateCountCoordinates:any
}

const CoordinatesTable:FC<CoordinatesTableProps> = ({token,counterCoordinates,updateCountCoordinates})=>{

    const [CoordinatesData, SetCoordinatesData] = useState<any>()

    useEffect(()=>{
        (async () => SetCoordinatesData(await fetchCoordinates()))();
    },[counterCoordinates])

    useEffect(()=> {        
        console.log(CoordinatesData);
    },[CoordinatesData])

    async function fetchCoordinates():Promise<any> {
        try {
            const response = await axios.get('http://localhost:5000/coordinates',
            {headers: {'Authorization': 'Bearer '+token}})
            return response.data
        } catch (error:any) {
            console.log(error.response.data.message)
        }
    }

    async function deleteCoordinates(id:string):Promise<any> {
        try {
            const response = await axios.delete('http://localhost:5000/coordinates/'+id,
            {headers: {'Authorization': 'Bearer '+token}})
            updateCountCoordinates(counterCoordinates+1)
            return response.data
        } catch (error:any) {
            console.log(error.response.data.message)
        }
    }

    const renderTable =()=>{
        if(!CoordinatesData) return
        return CoordinatesData.map((item:any)=>{
            return <CoordinatesTableItem deleteCoordinates={deleteCoordinates} key={item.id} id={item.id} token={token} x={item.x} y={item.y} counterCoordinates={counterCoordinates} updateCountCoordinates={updateCountCoordinates}/>
        })
    }

    return(
        <div className={clasess.wrapper}>               
            <h3 className={clasess.titleCoordinates}>Таблиця всіх координат</h3>
            <div className={clasess.tableCoordinates}>  
                <div className={clasess.title_block}>
                    <h4 className={clasess.titleCoordinates}>X</h4>
                    <h4 className={clasess.titleCoordinates}>Y</h4>
                </div>
                <div className={clasess.Coordinates}>
                    {renderTable()}
                </div>
            </div>
        </div>
    )
}
export default CoordinatesTable

