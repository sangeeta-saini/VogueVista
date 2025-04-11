import React from 'react'
import './Signup.css'
import  { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


function Signup() {
  const[name , setName] = useState();
  const[email , setEmail] = useState();
  const[password , setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      const result = await axios.post('http://localhost:8080/user/signup', { name ,email, password });
      {console.log(result)
        navigate('/login')
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
    <div className='container'>
      <div className='login'>
        <h3>LOGIN</h3>
        </div>
        <div className='input-container'>
            <div className='name'>
            <h4>Name</h4>
            <input className="name-box" type="text" placeholder='Name' onChange={(e)=>setName(e.target.value)} />
            </div>
            <div className='email'>
            <h4>Email</h4>
            <input className="email-box" type="text" placeholder='Email' onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div className='password'>
             <h4>Password</h4>
             <input className="password-box" type="text" placeholder='Password' onChange={(e)=>setPassword(e.target.value)} />
            </div>
            <div className='login-btn'>
            <button >Register</button>
            </div>

            <div className='login-btn'>
              <h4>Already have an account</h4>
              <button > <a href='Login'>Login</a></button>
             </div>
            </div>
    </div>
    
    </form>

    
</>
  )
}

export default Signup
