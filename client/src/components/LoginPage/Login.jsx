import React, { useState } from 'react'
import '../Styles/Login.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const Login = () => {


  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()

  const bodyStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: `url(${require('../Assets/bg_img/bg_image.png')})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      // alert popup warning message  
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Please fill your login details",
        showConfirmButton: false,
        timer: 2700,
        toast: true,
        timerProgressBar: true
      });
    }
    else {
      console.log("Login");
      axios.post('http://localhost:3009/login', { email, password })
        .then(result => {
          console.log("login--->", result);
          if (result.data.message === "Login successful") {
            // Store token in local storage
            localStorage.setItem('token', result.data.token);
            navigate('/dashboard');
            console.log("success");
          } else if (result.data.message === 'Incorrect password') {
            // Alert popup for incorrect password
            
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Incorrect password",
              showConfirmButton: false,
              timer: 2700,
              toast: true,
              timerProgressBar: true
            });

          } else if (result.data.message === 'No record exists with this email') {
            // Alert popup for Username not existed

            Swal.fire({
              position: "center",
              icon: "error",
              title: "Username doesn't exist",
              showConfirmButton: false,
              timer: 2700,
              toast: true,
              timerProgressBar: true,
            });

          }
        })
        .catch(err => console.log("login error--->", err));
    }
  };

  return (
    <div style={bodyStyle}>

      <div className='login_container'>
        <h3>Login</h3>
        <div>
          <form onSubmit={handleSubmit}>
            <div className='m-4'>
              <input className='form-control mt-4 border-dark' type='email'
                placeholder='Username' name='email'
                onChange={(e) => setEmail(e.target.value)}
              />
              <input className='form-control mt-4 border-dark' type="password"
                placeholder='Password' name='password'
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='login_btn '>
              <button className='btn btn-success w-100 fw-bold' type='submit'>Login</button>
            </div>
          </form>
        </div>
      </div>

    </div>
  )
}

export default Login