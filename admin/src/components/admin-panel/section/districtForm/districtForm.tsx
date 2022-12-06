import axios from 'axios'
import React, { FC,useRef } from 'react'
import clasess from "./districtForm.module.sass"

interface DistrictFormProps{
    token:string|null,
    counterDistrict:number,
    updateCountDistrict:any
}

const DistrictForm:FC<DistrictFormProps>=({token,counterDistrict,updateCountDistrict})=>{

    const inputName = useRef<HTMLInputElement>(null)



    // create new District
    async function createDistrict():Promise<void> {        
        try {
            const response = await axios.post('http://localhost:5000/district',
            {"name":inputName.current?.value},
            {headers: {'Authorization': 'Bearer '+token}})
            console.log(response)
            alert("Новий підрайон додано")
        } catch (error:any) {
            console.log(error)
            alert(error?.response.data.message)
        }
    }
    function clickHandler(e:React.MouseEvent<HTMLButtonElement>){
        e.preventDefault()
        createDistrict()
        updateCountDistrict(counterDistrict+1)
    }

    return(
        <div className={clasess.DistrictForm}>
            <div className={clasess.wrapper}>
                <h3 className={clasess.title}>Форма додавання нових підрайонів</h3>
                <form action="#" method="post" className={clasess.formDistrict}>
                    <input type="text" ref={inputName} id={clasess.name} placeholder="Ім'я підрайону" required />
                    <button type="submit" onClick={clickHandler}>Додати</button>
                </form>
            </div>
        </div>
    )
}
export default DistrictForm