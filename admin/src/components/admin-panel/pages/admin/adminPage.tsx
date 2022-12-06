import React, { FC } from 'react'
import Navbar from '../../section/navbar/navbar'
import AdminForm from '../../section/adminForm/adminForm'
import clasess from "./adminPage.module.sass"
import { Link } from 'react-router-dom'



const AdminPages:FC=()=>{
    {return(
        <div className={clasess.admin__pages}> 
            <Navbar/>
            <AdminForm/>
        </div>
    )}
}

export default AdminPages