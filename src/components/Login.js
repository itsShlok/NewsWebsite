import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"

const Login = () => {
    const [cred,setCred]=useState({email:"",password:""})
    let navigate=useNavigate()
    const handleSubmit=async(e)=>{
      e.preventDefault()
      const url = "http://localhost:5000/api/auth/login"
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        
        },
        body: JSON.stringify({ email:cred.email,password:cred.password }),
      });
      const json=await response.json() ;
      console.log(json)   
      if(json.success){
        // redirect
        localStorage.setItem('token',json.authToken)
        // console.log(localStorage.getItem('token'))
        navigate("/")

      }else{
        alert("Invalid Cred")
      }
    }
    const onChange=(e)=>{
      e.preventDefault()
      setCred({...cred,[e.target.name]:e.target.value})
    }
  return (
    <div className='container-fluid d-flex justify-content-center'>
     <form onSubmit={handleSubmit} className='col-md-6 mt-7' style={{marginTop:'160px'}}>
  <div className="mb-3">

    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" value={cred.email} onChange={onChange}id="exampleInputEmail1" name="email"      aria-describedby="emailHelp"/>

    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" name='password' value={cred.password} onChange={onChange} className="form-control" id="exampleInputPassword1"/>
  </div>

  <button type="submit" className="btn btn-primary " >Submit</button>
</form>
    </div>
  )
}

export default Login
