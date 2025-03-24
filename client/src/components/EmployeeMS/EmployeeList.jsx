import React, { useEffect, useState } from 'react'
import '../Styles/EmployeeList.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

const EmployeeList = () => {
      // State variables
      const [empData, setEmpData] = useState([])
      const [search, setSearch] = useState('')
      const [currentPage, setCurrentPage] = useState(1);
      const [totalPages, setTotalPages] = useState(1);
      const [totalEmployees, setTotalEmployees] = useState(0);
      // Fetch employees
      useEffect(() => {
            axios.get('http://localhost:3009')
                  .then(res => {
                        setEmpData(res.data)
                  })
                  .catch(err => console.log(err))
      }, [])


      // Fetch employees based on current page
      useEffect(() => {
            fetchEmployees();
      }, [currentPage]);

      // Function to fetch employees from the server
      const fetchEmployees = async () => {
            try {
                  // Number of employees per page
                  const pageSize = 6;
                  const response = await axios.get(`http://localhost:3009/employees?page=${currentPage}&pageSize=${pageSize}`);
                  const { results, pagination } = response.data;
                  // console.log(response.data)
                  // console.log(results)
                  // console.log(pagination)
                  setEmpData(results);
                  setTotalPages(pagination.totalPages);
                  setTotalEmployees(pagination.totalCount)
            } catch (error) {
                  console.error('Error fetching employees:', error);
            }
      };

      const handleNextPage = () => {
            if (currentPage < totalPages) {
                  setCurrentPage(currentPage + 1);
            }
      };

      const handlePreviousPage = () => {
            if (currentPage > 1) {
                  setCurrentPage(currentPage - 1);
            }
      };

      const handleDelete = (id) => {
            axios.delete('http://localhost:3009/deleteData/' + id)
                  .then(res => {
                        console.log(res.data)
                        window.location.reload()
                        fetchEmployees();
                  })
                  .catch(err => console.log(err))
      }
      return (
            <div>

                  <div className="col p-0 m-0">
                        <div className='p-2 d-flex justify-content-center shadow employee_list_text'>
                              <h3 className='text-white'>Employee-List</h3>
                        </div>
                  </div>

                  <div className='m-4 search'>
                        <Link to='/dashboard/addEmployee' className='btn btn-primary'>
                              Add Employee<i className="bi bi-person-plus-fill align-middle add_icon"></i>
                        </Link>
                        <span className='py-2 fw-bold'>Total Count :{totalEmployees}</span>
                        <div className='col-5'>
                              <input type="text"
                                    className='form-control border-dark'
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder='Search here....' />
                        </div>
                  </div>
                  <div className='m-4'>
                        <table className="table table-success table-striped table-bordered table-hover">
                              <thead className='table table-dark'>
                                    <tr>
                                          <th scope="col">ID</th> 
                                          <th scope="col">Profile</th>
                                          <th scope="col">Name</th>
                                          <th scope="col">Email</th>
                                          <th scope="col">Mobile No</th>
                                          <th scope="col">Designation</th>
                                          <th scope="col">Gender</th>
                                          <th scope="col">Course</th>
                                          <th scope="col">Joining Date</th>
                                          <th scope="col">Action</th>
                                    </tr>
                              </thead>
                              <tbody>
                                    {empData.filter(searchEmp =>
                                          (searchEmp.name && searchEmp.name.toLowerCase().includes(search.toLowerCase())) ||
                                          (searchEmp.email && searchEmp.email.toLowerCase().includes(search.toLowerCase())) ||
                                          (searchEmp.desg && searchEmp.desg.toLowerCase().includes(search.toLowerCase()))
                                    )
                                          .map((item, i) => {
                                                return (
                                                      <tr key={i}>
                                                            <th scope="row">{i + 1}</th>
                                                            <td>{<img src={item.image} alt={item.name} style={{ width: '80px' }} />}</td> 
                                                            <td>{item.name}</td>
                                                            <td>{item.email}</td>
                                                            <td>{item.mobile}</td>
                                                            <td>{item.desg}</td>
                                                            <td>{item.gen}</td>
                                                            <td>{`${item.courses}`}</td>
                                                            <td>{item.date}</td>
                                                            <td>
                                                                  <Link to={`/dashboard/updateEmployee/${item._id}`} className='btn btn-dark btn-sm mx-2'>Edit</Link>
                                                                  <button className='btn btn-danger btn-sm' onClick={(e) => handleDelete(item._id)}>Delete</button>
                                                            </td>
                                                      </tr>
                                                )
                                          })}
                              </tbody>
                        </table>
                  </div>
                  <div className='pagination m-4'>
                        <button className='btn btn-dark btn-sm fw-bold' onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
                        <span className='fw-bold mx-3'>Page {currentPage} of {totalPages}</span>
                        <button className='btn btn-success btn-sm fw-bold' onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
                  </div>
            </div>
      )
}

export default EmployeeList