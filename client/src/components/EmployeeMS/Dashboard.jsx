import React, { useEffect } from 'react'
import '../Styles/Dashboard.css'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Dashboard = () => {

  const navigate = useNavigate()

  useEffect(() => {
    handleProtectedRouteAccess();
  }, []);

  const handleLogout = () => {
    // Remove token from local storage
    localStorage.removeItem('token');
    axios.get('http://localhost:3009/logout')
      .then(res => {
        console.log(res)
        navigate('/')
      })
      .catch(err => console.log(err))
  }


  const handleProtectedRouteAccess = () => {
    // Retrieve token from local storage
    const token = localStorage.getItem('token');
    if (token) {
      // Include token in the request headers
      axios.get('http://localhost:3009/protectedRoute', {
        headers: {
          Authorization: token
        }
      })
        .then(res => {
          console.log(res.data);

          // console.log(res.data.user.email);
 
          // Handle the response from the protected route
        })
        .catch(err => {
          console.log(err.response.data);
          // Handle any errors, such as unauthorized access
          navigate('/login'); // Redirect to login page if unauthorized access
        });
    } else {
      // Redirect to login page if token is not available
      navigate('/login');
    }
  };


  return (
    <div className="container-fluid box">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">

            <div className="fs-5 d-none d-sm-inline">
              <h4>EmployeeMS</h4>
            </div>

            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start mt-4" id="menu">

              <li>

                <Link to={'/dashboard'} data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                  <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Dashboard</span>
                </Link>

              </li>
              <li>

                <Link to={'/dashboard/employeeList'} className="nav-link px-0 align-middle">
                  <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Manage Employee</span>
                </Link>

              </li>

              <li onClick={handleLogout}>
                <Link className="nav-link px-0 align-middle">
                  <i className="fs-4 bi-power"></i> <span className="ms-1 d-none d-sm-inline">Logout</span>
                </Link>
              </li>

            </ul>
          </div>
        </div>

        <div className="col p-0 m-0">
          <div className='p-2 d-flex justify-content-center shadow dashboard_text_head'>
            <h3>Employee Management System</h3>
          </div>
          <Outlet />
        </div>

      </div>
    </div>
  )
}

export default Dashboard