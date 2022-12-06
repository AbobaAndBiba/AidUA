import React, { FC } from 'react'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps{
    token:string|null
}

const ProtectedRoute:FC<ProtectedRouteProps> = ({token})=>{
    if(!token){
      return <Navigate to={'/'} replace></Navigate>
    }
    return <Navigate to={'/admin'} replace></Navigate>
}
export default ProtectedRoute