import React from 'react'
import './login.css'
import  { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';



function Login() {

    const[email , setEmail] = useState();
  const[password , setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault()
    console.log("result")
    try {
      const result = await axios.post('http://localhost:8080/user/login', {email, password });
      console.log(result)
        if(user.data === "success"){
        navigate('/')
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <form >
        <div className='container-3'>
      <div className='login'>
        <h3>LOGIN</h3>
        </div>
        <div className='input-container-2'>
           < div className='email'>
            <h4>Email</h4>
            <input className="email-box" type="text" placeholder='Email' onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div className='password'>
             <h4>Password</h4>
             <input className="password-box" type="text" placeholder='Password' onChange={(e)=>setPassword(e.target.value)} />
            </div>
            <div className='login-btn'>
            <button onClick={handleSubmit}> Login </button>
            </div>
            </div>
    </div>
    </form>
  )
}

export default Login
