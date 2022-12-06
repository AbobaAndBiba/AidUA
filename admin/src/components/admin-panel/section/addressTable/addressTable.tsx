import axios from 'axios'
import React, { FC,useState,useEffect } from 'react'
import AdressTableItem from '../addressTableItem/addressTableItem'
import clasess from "./addressTable.module.sass"

interface AdressTableProps{
    token:string|null,
    counterAdress:number,
    updateCountAdress:any
}

const AdressTable:FC<AdressTableProps> = ({token,counterAdress,updateCountAdress})=>{

    const [addressData, SetAdressData] = useState<any>()

    useEffect(()=>{
        (async () => SetAdressData(await fetchAdress()))();
    },[counterAdress])

    useEffect(()=> {        
        console.log(addressData);
    },[addressData])

    async function fetchAdress():Promise<any> {
        try {
            const response = await axios.get('http://localhost:5000/address',
            {headers: {'Authorization': 'Bearer '+token}})
            return response.data
        } catch (error:any) {
            console.log(error.response.data.message)
        }
    }

    async function deleteAdress(id:string):Promise<any> {
        try {
            const response = await axios.delete('http://localhost:5000/address/'+id,
            {headers: {'Authorization': 'Bearer '+token}})
            updateCountAdress(counterAdress+1)
            return response.data
        } catch (error:any) {
            console.log(error.response.data.message)
        }
    }

    const renderTable =()=>{
        if(!addressData) return
        return addressData.map((item:any)=>{
            return <AdressTableItem deleteAdress={deleteAdress} key={item.id} id={item.id} token={token} name={item.name} counterAdress={counterAdress} updateCountAdress={updateCountAdress}/>
        })
    }

    return(
        <div className={clasess.wrapper}>               
            <h3 className={clasess.titleAdress}>Таблиця всіх вулиць</h3>
            <div className={clasess.tableAdress}>  
                <div className={clasess.title_block}>
                    <h4 className={clasess.titleAdress}>Назва вулиці</h4>
                </div>
                <div className={clasess.Adress}>
                    {renderTable()}
                </div>
            </div>
        </div>
    )
}
export default AdressTable

// import React, { FC } from 'react'

// const AdressTable:FC = ()=>{
//  return(
//     <div>
//     </div>
//  )
// }
// export default AdressTable