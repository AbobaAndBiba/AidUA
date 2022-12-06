import axios from 'axios'
import React, { FC, useRef } from 'react'
import clasess from "./coordinatesForm.module.sass"

interface CoordinatesFormProps{
    token:string|null,
    counterCoordinates:number,
    updateCountCoordinates:any
}

const CoordinatesForm:FC<CoordinatesFormProps>=({token,counterCoordinates,updateCountCoordinates})=>{
    
    const inputX = useRef<HTMLInputElement>(null)
    const inputY = useRef<HTMLInputElement>(null)
    
    async function createCoordinates():Promise<void> {
        try {
            const response = await axios.post('http://localhost:5000/coordinates',
            {
                "x": Number(inputX.current?.value),
                "y": Number(inputY.current?.value)
            },
            {headers: {'Authorization': 'Bearer '+token}})
            updateCountCoordinates(counterCoordinates+1)
            console.log(response)
            alert("Нові координати додано")
        } catch (error:any) {
            console.log(error?.response.data.message);
        }
    }
    const clickHandler = (e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        createCoordinates();
    }

    return(
        <div>
            <div className={clasess.CoordinatesForm}>
                <div className={clasess.wrapper}>
                    <h3 className={clasess.title}>Форма додавання нових координат</h3>
                    <form action="#" method="post" className={clasess.form__createCoordinates}>
                        <input type="number" ref={inputX} id={clasess.title} placeholder='X'/>
                        <input type="number" ref={inputY} id={clasess.text} placeholder='Y'/>
                        <button onClick={clickHandler} type="submit">Додати</button>
                    </form>  
                </div>
            </div>
        </div>
    )
}
export default CoordinatesForm