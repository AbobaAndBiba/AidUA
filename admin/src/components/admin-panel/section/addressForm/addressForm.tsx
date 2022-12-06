import axios from 'axios'
import React, { FC,useRef,useEffect } from 'react'
import clasess from "./addressForm.module.sass"

interface AddressFormProps{
    token:string|null,
    counterAddress:number,
    updateCountAddress:any
}

const AddressForm:FC<AddressFormProps>=({token,counterAddress,updateCountAddress})=>{

    const inputName = useRef<HTMLInputElement>(null)

    // create new Address
    async function createAddress():Promise<void> {
        try {            
            const response = await axios.post('http://localhost:5000/address',
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
        createAddress()
        updateCountAddress(counterAddress+1)
    }

    return(
        <div className={clasess.AddressForm}>
            <div className={clasess.wrapper}>
                <h3 className={clasess.title}>Форма додавання нових адресів</h3>
                <form action="#" method="post" className={clasess.formAddress}>
                    <input type="text" ref={inputName} id={clasess.name} placeholder="Назва вулиці" required />
                    <button type="submit" onClick={clickHandler}>Додати</button>
                </form>
            </div>
        </div>
    )
}
export default AddressForm