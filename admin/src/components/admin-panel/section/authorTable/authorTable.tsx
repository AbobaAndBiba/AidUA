import axios from 'axios'
import React, { FC,useEffect,useState, useRef} from 'react'
import clasess from "./authorTable.module.sass"
import AuthorTableItem from '../authorTableItem/authorTableItem'


interface AuthorTableProps{
    token:string|null,
    counterAuthor:number,
    updateCountAuthor:any
}

const AuthorTable:FC<AuthorTableProps>=({token,counterAuthor,updateCountAuthor})=>{
    const[authorName, SetAuthorName] = useState<any>()

    useEffect(()=> {
        (async () => SetAuthorName(await fetchAuthor()))();
    },[counterAuthor])
       
    
    useEffect(()=> {        
        console.log(authorName);
    },[authorName])

    async function fetchAuthor():Promise<any> {
        try {
            const response = await axios.get('http://localhost:5000/author',
            {headers: {'Authorization': 'Bearer '+token}})
            return response.data
        } catch (error:any) {
            console.log(error.response.data.message)
        }
    }

    async function deleteAuthor(id:string):Promise<any> {
        try {
            const response = await axios.delete('http://localhost:5000/author/'+id,
            {headers: {'Authorization': 'Bearer '+token}})
            updateCountAuthor(counterAuthor+1)
            return response.data
        }  catch (error:any) {
            console.log(error.response.data.message)
        }
    }

    const renderTable =()=>{
        if(!authorName) return  <div>Додані автори відсутні, спробуйте додати нового або перезавантажте сторінку!</div>
        return authorName.map((item:any)=>{
            return <AuthorTableItem deleteAuthor={deleteAuthor} key={item.id} id={item.id} token={token} name={item.name} counterAuthor={counterAuthor} updateCountAuthor={updateCountAuthor}/>
        })
    }

    return (
        <div className={clasess.wrapper}>
            <div className={clasess.table}>
                <h3 className={clasess.titleAuthor}>Таблиця всіх авторів</h3>
                <div>
                    <h4 className={clasess.subTitleAuthor}>Ім'я автора</h4>
                </div>
                <div className={clasess.dataAuthor}>
                    {renderTable()}
                </div>
            </div>
        </div>
    )
}
export default AuthorTable