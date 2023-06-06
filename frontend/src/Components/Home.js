import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './Home.css'

const Home = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const [data, setData] = useState({});

  useEffect(() => {
    var s = sessionStorage.getItem("id")
    if (s === null) {
      navigate("/login", { replace: true })
    }
    const response = axios.get('http://localhost:3000/db').then(res => {
      setData(res.data)
    })
  }, [setData])


  return (
    <>
      <h1>Hello {location?.state?.id}</h1>
      <div className='welcome'>Welcome to Dashboard Page</div>
      <h1>Users</h1>
      <div className='table-container'>
        <table border={1} >
          <tr>
            <th>Email</th>
            <th>Name</th>
          </tr>
          {Object.keys(data).map(email => (
            <tr key={email}>
              <td>{email}</td>
              <td>{data[email].name}</td>
            </tr>
          ))}
        </table>
      </div>
    </>
  )
}

export default Home