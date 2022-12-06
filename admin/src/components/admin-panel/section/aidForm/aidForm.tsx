import axios from 'axios'
import React, { FC, useRef,useState,useEffect } from 'react'
import clasess from "./aidForm.module.sass"

interface AidFormProps{
    token:string|null,
    counterAid:number,
    updateCountAid:any
}

const AidForm:FC<AidFormProps>=({token,counterAid,updateCountAid})=>{

    
    const inputRegistration = useRef<HTMLInputElement>(null)
    const inputPhone = useRef<HTMLInputElement>(null)
    
    const [authors, SetAuthors]= useState<any>()

    const [authorData, SetAuthorData] = useState<any>()

    useEffect(()=>{
        (async () => SetAuthors(await fetchAuthor()))();
    },[counterAid])


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

    async function createAid():Promise<void> {
        console.log("authorData",authorData);
        console.log(inputRegistration);
        console.log(inputPhone);

        try {
            const response = await axios.post('http://localhost:5000/aid',
            {
                "authorName": authorData,
                "registration": inputRegistration.current?.value,
                "phone": inputPhone.current?.value
            },
            {headers: {'Authorization': 'Bearer '+token}})
            updateCountAid(counterAid+1)
            console.log(response)
            alert("Нову гуманітарну допомогу додано")
        } catch (error:any) {
            console.log(error?.response.data.message);
        }
    }
    const clickHandler = (e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        createAid();
    }

    return(
        <div>
            <div className={clasess.AidForm}>
            <div className={clasess.wrapper}>
                <h3 className={clasess.title}>Форма додавання нових гуманітарних допомог</h3>
                <form action="#" method="post" className={clasess.form__createAid}>
                    <select onChange={(e)=>SetAuthorData(e.target.value)} name="authorName">
                        <option disabled defaultChecked>Виберіть автора</option>
                        {authors?.map((item:any)=><option value={item?.name} key={item.id}>{item?.name}</option>)}
                    </select>
                    <input type="text" ref={inputRegistration} id={clasess.title} placeholder='Реєстрація'/>
                    <input type="text" ref={inputPhone} id={clasess.text} placeholder='Телефон'/>
                    <button onClick={clickHandler} type="submit">Додати</button>
                </form>  
            </div>
        </div>
        </div>
    )
}
export default AidForm