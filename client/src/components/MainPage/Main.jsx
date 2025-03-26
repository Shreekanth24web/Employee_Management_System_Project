import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from '../RegisterPage/SignUp'
import Login from '../LoginPage/Login'
import Dashboard from '../EmployeeMS/Dashboard'
import EmployeeList from '../EmployeeMS/EmployeeList'
import Home from '../EmployeeMS/Home'
import AddEmployee from '../EmployeeMS/AddEmployee'
import UpdateEmployee from '../EmployeeMS/UpdateEmployee'

const Main = () => {
     return (
          <BrowserRouter basename="/Employee_Management_System_Project"> 
               <Routes>
                    <Route path='/' element={<SignUp />} />
                    <Route path='/login' element={<Login />} />

                    <Route path='/dashboard' element={<Dashboard />}>
                         <Route path='' element={<Home />} />
                         <Route path='employeeList' element={<EmployeeList />} />
                         <Route path='addEmployee' element={<AddEmployee />} />
                         <Route path='updateEmployee/:id' element={<UpdateEmployee />} />   
                    </Route>
               </Routes>
          </BrowserRouter>
     )
}

export default Main