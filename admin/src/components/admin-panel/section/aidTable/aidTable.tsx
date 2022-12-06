import axios from 'axios'
import React, { FC,useState,useEffect } from 'react'
import AidTableItem from '../aidTableItem/aidTableItem'
import clasess from "./aidTable.module.sass"


interface AidTableProps{
    token:string|null,
    counterAid:number,
    updateCountAid:any,
    counterAuthor:number,
    updateCountAuthor:any
}

const AidTable:FC<AidTableProps> = ({token,counterAid,updateCountAid,counterAuthor,updateCountAuthor})=>{

    const [AidData, SetAidData] = useState<any>()
    const [authorData, SetAuthorData] = useState<any>()

    useEffect(()=>{
        (async () => SetAidData(await fetchAid()))();
    },[counterAid])

    useEffect(()=> {        
        console.log(AidData);
    },[AidData])

    // author 

    useEffect(()=>{
        (async () => SetAuthorData(await fetchAuthor()))();
    },[counterAuthor])

    useEffect(()=> {        
        console.log(authorData);
    },[authorData])

    async function fetchAuthor():Promise<any> {
        try {
            const response = await axios.get('http://localhost:5000/author/',
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

    async function deleteAid(id:string):Promise<any> {
        try {
            const response = await axios.delete('http://localhost:5000/Aid/'+id,
            {headers: {'Authorization': 'Bearer '+token}})
            updateCountAid(counterAid+1)
            return response.data
        } catch (error:any) {
            console.log(error.response.data.message)
        }
    }

    const renderTable =()=>{
        if(!AidData) return
        return AidData.map((item:any)=>{
            return <AidTableItem 
            deleteAid={deleteAid} 
            key={item.id} 
            id={item.id} 
            token={token} 
            registration={item.registration} 
            phone={item.phone}
            counterAid={counterAid} 
            updateCountAid={updateCountAid}
            author={authorData?.find((o:any)=>o.id===item.authorId)}
            authorState={authorData} 
            />
        })
    }

    return(
        <div className={clasess.wrapper}>               
            <h3 className={clasess.titleAid}>Таблиця всіх гуманітарних допомог</h3>
            <div className={clasess.tableAid}>  
                <div className={clasess.title_block}>
                    <h4 className={clasess.titleAid}>Ім'я автора</h4>
                    <h4 className={clasess.titleAid}>Реєстрація</h4>
                    <h4 className={clasess.titleAid}>Телефон</h4>
                </div>
                <div className={clasess.Aid}>
                    {renderTable()}
                </div>
            </div>
        </div>
    )
}
export default AidTable

