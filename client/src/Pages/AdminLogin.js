import React, { useState, useContext } from 'react'
import './adminlogin.css'
import { Context } from '../ContextStore';
import { MdAttachEmail, MdLock } from 'react-icons/md'
import { HiEye, HiEyeOff } from 'react-icons/hi'
import { loginAdmin } from '../services/adminService'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
    const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault()
    setShow(!show)
  }
  const { userData,setUserData } = useContext(Context)
  const handleLogin = async (e)=>{
    e.preventDefault();
    await loginAdmin({email,password})
        .then(res => {
            if (!res.error) {
                setUserData(res.user);
                    if(res.user.isAdmin){
                        navigate('/admin');
                    }else{
                        navigate('/');
                    }
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops !",
                    text: "Invalid email or password",
                });
            }
        }).catch(err => {
            Swal.fire({
                icon: "error",
                title: "Oops !",
                text: "Invalid email or password",
            });
        })
  }
  return (
    <div className="login">
      <div className="login-right">
        <h1>Login</h1>
        <form onSubmit={handleLogin} style={{"margin":0,"padding":0,"width":"100%"}}>
        <div className="login-loginInputEmail">
          <MdAttachEmail />
          <input
            type="email"
            placeholder="Type your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="login-loginInputPassword">
          <MdLock />
          <input
            type={show ? 'text' : 'password'}
            placeholder="Type your password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="login-eye">
            {show ? (
              <HiEye size={20} onClick={handleClick} />
            ) : (
              <HiEyeOff size={20} onClick={handleClick} />
            )}
          </div>
        </div>

        <button type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin