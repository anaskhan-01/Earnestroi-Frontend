import React, { useState } from 'react';
import './Signup.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const initialFormData = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const SignUp = () => {
  const [formData, setFormData] = useState(initialFormData);


  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function formSubmitHandler(e) {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:3000/register', formData)
      if (response.status === 200) {
        sessionStorage.setItem('id', formData.name);
        navigate('/home', { replace: true, state: { id: formData.name } })
      }
      else {
        alert(response.data.error)
      }
    }
    catch (error) {
      console.log(error);
      alert(error.response.data)
    }
  }

  return (
    <div className='container'>
      <h1>Register</h1>
      <form onSubmit={formSubmitHandler} className="form-container">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
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
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
        />
        <button type="submit">submit</button>
      </form>
      <div>
        <p>Already have an account?</p>
        <Link to="/login" replace={true}>Login</Link>
      </div>
    </div>
  )
}

export default SignUp;