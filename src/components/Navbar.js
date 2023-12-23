import React from 'react'
import { useEffect } from 'react'
import { Link ,useLocation} from 'react-router-dom'
import {Outlet} from 'react-router-dom'
import {useNavigate} from "react-router-dom"

const Navbar = () => {
  let location =useLocation()
  let navigate=useNavigate()
  // eslint-disable-next-line 
  useEffect(()=>{
    console.log(location.pathname)
    // eslint-disable-next-line
  },[location])
  const handleLogout=()=>{
    localStorage.removeItem('token')
    navigate('/login')
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand " to="/">Navbar</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link active ${location.pathname ==="/"? "text-warning":""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link active ${location.pathname ==="/About"? "text-warning":""}`}  to="About">About</Link>
        </li>
        {/* <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li> */}
       
      </ul>

      {!localStorage.getItem('token')?<div><Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
      <Link className="btn btn-primary mx-2" to="/signup" role="button">Sign up</Link></div>:<button className='btn btn-primary' onClick={handleLogout}>Log out</button>}
    </div>
  </div>
</nav>
<Outlet/>
    </div>
  )
}

export default Navbar
