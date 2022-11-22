import React, { Component } from 'react'
import Login from './components/login/login'
import {BrowserRouter, Route,Routes} from 'react-router-dom'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Routes>
            <Route path={"/"} element={<Login/>} />
          </Routes>
        </div>
      </BrowserRouter>
    )
  }
}

