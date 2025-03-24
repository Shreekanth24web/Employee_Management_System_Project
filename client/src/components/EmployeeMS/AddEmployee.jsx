import React, { useState } from 'react'
import '../Styles/AddEmployee.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'



const AddEmployee = () => {

  const bodyStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const [input, setInput] = useState({
    name: '',
    email: '',
    mobile: '',
    desg: '',
    gen: '',
    courses: [],
    date: '',
    image: null,
  });



  const navigate = useNavigate()
  const inputData = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // console.log("File--->",file)
    // const reader = new FileReader()
    // console.log("File reader--->",reader)
    // reader.onload = () => {
    setInput({ ...input, image: file });
    // }
    // reader.readAsDataURL(file)
  };


  const inputCheckBoxData = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setInput((prevInput) => ({
        ...prevInput,
        courses: [...prevInput.courses, value],
      }));
    } else {
      setInput((prevInput) => ({
        ...prevInput,
        courses: prevInput.courses.filter((course) => course !== value),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.name || !input.email || !input.mobile || !input.desg || !input.gen || input.courses.length === 0 || !input.date) {
    Swal.fire({
      title: "Please fill all details ",
      icon: "warning",
      width: '500px',
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `
      }
    });
    } else {
    const formData = new FormData();
    formData.append('name', input.name);
    formData.append('email', input.email);
    formData.append('mobile', input.mobile);
    formData.append('desg', input.desg);
    formData.append('gen', input.gen);
    input.courses.forEach(course => {
      formData.append('courses', course);
    });
    formData.append('date', input.date);
    formData.append('image', input.image);
    axios.post("http://localhost:3009/addEmployee", formData)
      .then(result => {
        console.log("Addemployee-->", result)
        navigate('/dashboard/employeeList')
      })
      .catch(err => console.log("Addemployee Error-->", err))
    }
  }
  return (
    <div>

      <div className="col p-0 m-0">
        <div className='p-2 d-flex justify-content-center shadow employee_list_text'>
          <h4 className='text-white'>Add Employee Details</h4>
        </div>
      </div>


      <div style={bodyStyle} >

        <div className='col-5 add_employee_container' >

          <form onSubmit={handleSubmit}>
            <div>
              <input type="text"
                onChange={inputData}
                placeholder='Enter Name'
                name='name'
                className='form-control border-primary'
              />
            </div>
            <div>
              <input type="email"
                onChange={inputData}
                placeholder='Enter Email'
                name='email'
                className='form-control border-primary mt-4'
              />
            </div>
            <div>
              <input type="number"
                onChange={inputData}
                placeholder='Enter mobile No.'
                name='mobile'
                className='form-control border-primary mt-4'
              />
            </div>

            <div className='d-flex justify-content-center desg_date'>
              <div className='col-6'>
                <select name="desg"
                  onChange={inputData}
                  className="form-control border-primary form-select mt-4"
                  aria-label="Default select example"
                >

                  <option value="">Your Designation</option>
                  <option value="HR">HR</option>
                  <option value="Manager">Manager</option>
                  <option value="Sales">Sales</option>
                  <option value="Developer">Developer</option>

                </select>

              </div>

              <div className='col-6'>
                <div className='mt-4'>
                  <input type="date"
                    onChange={inputData}
                    className='form-control border-primary'
                    name='date'
                  />
                </div>
              </div>

            </div>

            <div>

              <div className="d-flex my-2 fw-bold " >

                <div className="mx-3">
                  <label className="form-check-label" htmlFor="m">
                    Male
                  </label>
                  <input
                    onChange={inputData}
                    className="mx-2 form-check-input"
                    type="radio"
                    name="gen"
                    id="m"
                    value='Male'
                    checked={input.gen === 'Male'}
                  />
                </div>

                <div className="mx-3">
                  <label className="form-check-label" htmlFor="f">
                    Female
                  </label>
                  <input
                    onChange={inputData}
                    className="mx-2 form-check-input"
                    type="radio"
                    name="gen"
                    id="f"
                    value='Female'
                    checked={input.gen === 'Female'}

                  />
                </div>
                <div className="mx-3">
                  <label className="form-check-label" htmlFor="o">
                    Others
                  </label>
                  <input
                    onChange={inputData}
                    className="mx-2 form-check-input"
                    type="radio"
                    name="gen"
                    id="o"
                    value='Others'
                    checked={input.gen === 'Others'}
                  />
                </div>

              </div>

            </div>

            <div className="mx-3 mt-4 form-check form-switch fw-bold">

              <div>
                <label className="form-check-label" htmlFor="mca">
                  MCA
                </label>
                <input type="checkbox"

                  onChange={inputCheckBoxData}
                  className="form-check-input"
                  name='courses'
                  id='mca'
                  value="MCA"
                  checked={input.courses.includes('MCA')}
                />
              </div>
              <div>
                <label className="form-check-label" htmlFor="bca">
                  BCA
                </label>
                <input type="checkbox"
                  onChange={inputCheckBoxData}
                  className="form-check-input"
                  name='courses'
                  id='bca'
                  value="BCA"
                  checked={input.courses.includes('BCA')}
                />
              </div>
              <div>
                <label className="form-check-label" htmlFor="bsc">
                  BSC
                </label>
                <input type="checkbox"
                  onChange={inputCheckBoxData}
                  className="form-check-input"
                  name='courses' id='bsc'
                  value="BSC"
                  checked={input.courses.includes('BSC')}
                />
              </div>
              <div>
                <label className="form-check-label" htmlFor="be">
                  BE
                </label>
                <input type="checkbox"
                  onChange={inputCheckBoxData}
                  className="form-check-input"
                  name='courses' id='be'
                  value="BE"
                  checked={input.courses.includes('BE')}
                />
              </div>

            </div>

            <div className='mt-2'>
              <input
                type="file"
                name='image'
                accept='.png, .jpg'
                onChange={handleFileChange}
                className='form-control' />
            </div>
            <div className='mt-3'>
              <button type='submit' className='btn btn-primary w-100 fw-bold' >Add</button>
            </div>
          </form>
        </div>

      </div>
    </div>
  )
}

export default AddEmployee