import axios from 'axios'
import React, { FC, useRef } from 'react'
import clasess from "./regionForm.module.sass"

interface RegionFormProps{
    token:string|null,
    counterRegion:number,
    updateCountRegion:any
}

const RegionForm:FC<RegionFormProps>=({token,counterRegion,updateCountRegion})=>{
    
    const inputNameRegion = useRef<HTMLInputElement>(null)
    
    async function createRegion():Promise<void> {
        try {
            const response = await axios.post('http://localhost:5000/region',
            {
                "name": inputNameRegion.current?.value
            },
            {headers: {'Authorization': 'Bearer '+token}})
            updateCountRegion(counterRegion+1)
            console.log(response)
            alert("Новий район додано")
        } catch (error:any) {
            console.log(error?.response.data.message);
        }
    }
    const clickHandler = (e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        createRegion();
    }

    return(
        <div>
            <div className={clasess.RegionForm}>
                <div className={clasess.wrapper}>
                    <h3 className={clasess.title}>Форма додавання нових районів</h3>
                    <form action="#" method="post" className={clasess.form__createRegion}>
                        <input type="text" ref={inputNameRegion} id={clasess.title} placeholder='Назва району'/>
                        <button onClick={clickHandler} type="submit">Додати</button>
                    </form>  
                </div>
            </div>
        </div>
    )
}
export default RegionForm