import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Home = () => {

  const [adminTotal, setAdminTotal] = useState()
  const [employeeTotal, setEmployeeTotal] = useState()

  const [adminData, setAdminData] = useState([])

  useEffect(() => {
    adminCount()
    employeeCount()
    adminRecords()
  }, [])


  const adminRecords = () => {
    axios.get('http://localhost:3009/admin_records')
      .then(res => {
        // console.log(res.data)
        setAdminData(res.data)
      })
      .catch(err => console.log('Error fetching admin count:', err))
  }

  const adminCount = () => {
    axios.get('http://localhost:3009/admin_count')
      .then(res => {
        // console.log(res)
        const total = res.data
        setAdminTotal(total)
      })
      .catch(err => console.log('Error fetching admin count:', err))
  }
  const employeeCount = () => {
    axios.get('http://localhost:3009/employee_count')
      .then(res => {
        // console.log(res)
        const total = res.data
        setEmployeeTotal(total)
      })
      .catch(err => console.log('Error fetching admin count:', err))
  }
  return (
    <div>

      <div className="col p-0 m-0">
        <div className='p-2 d-flex justify-content-center shadow employee_list_text'>
          <h4 className='text-white'>Admin dashboard Panel</h4>
        </div>
      </div>

      <div className='p-3 d-flex justify-content-around mt-4'>
        <div className='px-3 pt-2 pb-3 border border-dark rounded-3 shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Admin</h4>
          </div>
          <hr />

          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>{adminTotal}</h5>
          </div>
        </div>

        <div className='px-3 pt-2 pb-3 border border-dark rounded-3 shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Employees</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>{employeeTotal}</h5>
          </div>
        </div>
      </div>

      <div className='mt-4 px-5 pt-5'>
        <h3>List of Admins</h3>
        <div>
          <table className='table table-bordered w-75 table-striped table-hover'>
            <thead className='table table-dark '>
              <tr>
                <th scope="col-1" className='col-1'>Sl No.</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>

              {
                adminData.map((admin, i) => {
                  return (
                    <tr key={i}>
                      <th>{i + 1}</th>
                      <td>{admin.name}</td>
                      <td>{admin.email}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Home