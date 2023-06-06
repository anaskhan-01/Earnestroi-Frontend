import React, { useState } from 'react'
import './Login.css'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const loginData = {
  email: '',
  password: '',
}

const Login = () => {
  const [formData, setFormData] = useState(loginData)

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  async function handleLogin(e) {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:3000/login', formData)
      if (response.status === 200) {
        sessionStorage.setItem('id', response.data.name);
        navigate('/home', { replace: true, state: { id: response.data.Name } })
      }
      else {
        alert(response.data.error)
      }
    }
    catch (error) {
      alert(error.response.data)
    }
  }

  return (
    <>
      <h1 className='Login-title' >Login</h1>
      <form onSubmit={handleLogin} className="login-container">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
      <div className='register-button'>
        <p>Create an account</p>
        <Link to="/" replace={true}>Register</Link>
      </div>
    </>
  )
}

export default Login