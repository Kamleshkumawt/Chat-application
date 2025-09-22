import React from 'react'
import {Route, BrowserRouter, Routes, Navigate} from 'react-router-dom';
import Home from '../screens/home/Home'
import Login from '../screens/components/Login'
import Register from '../screens/components/Register'
import UserAuth from '../auth/UserAuth';

const AppRoutes = () => {
  return (
    <BrowserRouter>
    <Routes>   
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<UserAuth><Register /> </UserAuth>} />

        <Route path='*' element={<Navigate to="/login" />} />
    </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
