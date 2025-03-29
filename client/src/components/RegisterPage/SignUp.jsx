import React, { useState } from 'react'
import '../Styles/SignUp.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
const SignUp = () => {

      const [name, setName] = useState()
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
            e.preventDefault()
            if (!name || !email || !password) {
                  // alert popup warning message  
                  Swal.fire({
                        position: "center",
                        icon: "warning",
                        title: "Please fill in all the fields",
                        showConfirmButton: false,
                        timer: 2700,
                        toast: true,
                        timerProgressBar: true
                  });
            } else {
                  axios.post('http://localhost:3009/', { name, email, password })
                        .then(result => {
                              console.log(result)

                              //alert popup success message
                              const Toast = Swal.mixin({
                                    toast: true,
                                    position: "center",
                                    showConfirmButton: false,
                                    timer: 2000,
                                    timerProgressBar: true,
                                    didOpen: (toast) => {
                                          toast.onmouseenter = Swal.stopTimer;
                                          toast.onmouseleave = Swal.resumeTimer;
                                    }
                              });
                              Toast.fire({
                                    icon: "success",
                                    title: "SignUp successfully"
                              });

                              navigate('/login')

                        })
                        .catch(err => console.log(err))
            }

      }

      return (
            <div style={bodyStyle}>
                  <div className='signUp_container'>
                        <h3>Register</h3>
                        <div>
                              <form onSubmit={handleSubmit}>
                                    <div className='m-4'>
                                          <input className='form-control border-dark'
                                                type="text" placeholder='Enter Your Name'
                                                name='name'
                                                onChange={(e) => setName(e.target.value)}
                                          />
                                          <input className='form-control mt-4 border-dark'
                                                type="email" placeholder='Enter Your E-mail'
                                                name='email'
                                                onChange={(e) => setEmail(e.target.value)}
                                          />
                                          <input className='form-control mt-4 border-dark'
                                                type="password" placeholder='Create Your Password'
                                                name='password'
                                                onChange={(e) => setPassword(e.target.value)}
                                          />
                                    </div>
                                    <div className='signUp_btn '>
                                          <button className='btn btn-success col-6 fw-bold' type='submit'>Sign Up</button>
                                          <Link to={'/login'} className='btn btn-dark col-4 fw-bold'>Login</Link>
                                    </div>
                                    <div className='signUp_text'>
                                          <p>Already you have account click <Link to={'/login'}>Login</Link></p>
                                    </div>
                              </form>
                        </div>
                  </div>
            </div>

      )
}

export default SignUp