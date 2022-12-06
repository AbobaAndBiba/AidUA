import React, { FC,useEffect,useState } from 'react'
import Login from './components/login/login'
import AdminPages from './components/admin-panel/pages/admin/adminPage'
import {BrowserRouter, redirect, Route,Routes,useNavigate,Navigate} from 'react-router-dom'
import AdminForm from './components/admin-panel/section/adminForm/adminForm'
import Navbar from './components/admin-panel/section/navbar/navbar'
import ProtectedRoute from './components/protectedRoute/protectedRoute'
import AuthorPage from './components/admin-panel/pages/author/authorPage'
import NewsPage from './components/admin-panel/pages/news/newsPage'
import MapPages from './components/admin-panel/pages/map/mapPages'
import AidPage from './components/admin-panel/pages/aid/aidPage'


const App:FC=()=> {
const navigate = useNavigate()
const [token, SetToken] = React.useState(localStorage.getItem('token'))

  useEffect(():any => {
    if(!token) navigate('/')
  },[])
    return (
      <div>
        <Routes>
          {/* login pages */}
          <Route path={"/"} element={<Login/>} />
          {/* Admin pages */}
          <Route path={'/admin'} element={<AdminPages/>}></Route>
          {/* Author pages */}
          <Route path={'/author'} element={<AuthorPage token={token}/>}></Route>
          {/* News pages  */}
          <Route path={"/news"} element={<NewsPage token={token}/>}></Route>
          {/* Map pages  */}
          <Route path={"/map"} element={<MapPages token={token}/>}></Route>
          {/* Aid pages  */}
          <Route path={"/aid"} element={<AidPage token={token}/>}></Route>
          {/* testing */}
          <Route path={'/navbar'} element={<Navbar/>}></Route>
          {/* <Route path={'/authorTable'} element={<AuthorTable token={token} />}></Route> */}
          <Route path='*' element={<ProtectedRoute token={token}></ProtectedRoute>}></Route>
        </Routes>
      </div>
    )
}

export default App