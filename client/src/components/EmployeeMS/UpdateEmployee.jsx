import React, { useEffect, useState } from 'react'
import '../Styles/AddEmployee.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../axiosConfig'

const UpdateEmployee = () => {

  const bodyStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  const { id } = useParams()
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
  };;

 
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
  useEffect(() => {

    axios.get('http://localhost:3009/getData/' + id)
      .then(res => {
        console.log(res.data)
        setInput(res.data)
        // navigate('/dashboard/employeeList')
      })
      .catch(err => console.log(err))
  }, [id])

  const handleUpdate = (e) => {
    e.preventDefault()
    axios.put("https://your-vercel-server-url.vercel.app/updateEmployee/" + id, input)
      .then(result => {
        console.log(result)

        navigate('/dashboard/employeeList')
      })
      .catch(err => console.log(err))
  }

  return (
    <div>

      <div className="col p-0 m-0">
        <div className='p-2 d-flex justify-content-center shadow employee_list_text'>
          <h4 className='text-white'>Update Employee Details</h4>
        </div>
      </div>


      <div style={bodyStyle} >

        <div className='col-5 add_employee_container' >

          <form onSubmit={handleUpdate}>
            <div>
              <input type="text"
                onChange={inputData}
                placeholder='Enter Name'
                name='name'
                value={input.name}
                className='form-control border-primary'
              />
            </div>
            <div>
              <input type="email"
                onChange={inputData}
                placeholder='Enter Email'
                name='email'
                value={input.email}
                className='form-control border-primary mt-4'
              />
            </div>
            <div>
              <input type="number"
                onChange={inputData}
                placeholder='Enter mobile No.'
                name='mobile'
                value={input.mobile}
                className='form-control border-primary mt-4'
              />
            </div>

            <div className='d-flex justify-content-center desg_date'>
              <div className='col-6'>
                <select name="desg"
                  onChange={inputData}
                  value={input.desg}
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
                    value={input.date}
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
                  name='course' id='mca'
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
                  name='course' id='bca'
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
                  name='course' id='bsc'
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
                  name='course' id='be'
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
              <button type='submit' className='btn btn-primary w-100 fw-bold' >Update</button>
            </div>
          </form>
        </div>

      </div>
    </div>
  )
}


export default UpdateEmployee