import React,{useState} from 'react'
import {useNavigate} from "react-router-dom"

const Signup = () => {
  const [cred,setCred]=useState({name:"",email:"",password:""})
    let navigate=useNavigate()
    const handleSubmit=async(e)=>{
      e.preventDefault()
      const url = "http://localhost:5000/api/auth/createUser"
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        
        },
        body: JSON.stringify({ name:cred.name,email:cred.email,password:cred.password }),
      });
      const json=await response.json() ;
      console.log(json)   

      if(json.success){
        // redirect
        localStorage.setItem('token',json.authToken)
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
    <>
      <div className='container-fluid d-flex justify-content-center'>
        <form className='col-md-6 mt-7' style={{ marginTop: '120px' }}
        onSubmit={handleSubmit}>

          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" 
            style={{border:' 2px solid #343a40'}} name="name"  aria-describedby="nameHelp" onChange={onChange} />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" name="email" 
            style={{border:' 2px solid #343a40'}} aria-describedby="emailHelp" onChange={onChange}/>

            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" name='password' className="form-control" 
            style={{border:' 2px solid black'}}id="exampleInputPassword1"
             onChange={onChange} minLength={5}required/>
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginLeft: '260px', width:"150px" }} >Sign In</button>
        </form>
      </div>
    </>
  )
}

export default Signup
