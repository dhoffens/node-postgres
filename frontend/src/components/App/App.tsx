import React, { FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login';
import Preferences from '../Preferences/Preferences';
import './App.css'
import useToken from './useToken';

const App: FC = () => {

  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className='wrapper'>
      <h1>Application</h1>
      <BrowserRouter>
        <Routes>
          <Route 
            path="/dashboard"
            element={<Dashboard />}/>
          <Route 
            path="/preferences"
            element={<Preferences />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

  export default App;