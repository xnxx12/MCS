import React, { useState } from 'react'
import axios from 'axios'
import {URL} from '../URL'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate();
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const register = (e)=>{
    e.preventDefault();
    const url = `${URL}/register`
    axios.post(url,{
      name,email,password
    })
    .then((res)=>{
      navigate('/login')
    }).catch((err)=>{
      console.log(err);
    })
  }
  return (
    <div style={{padding:'40px 55px'}}>
      <form onSubmit={register}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Name</label>
          <input type="text" value={name} onChange={(e)=>{setName(e.target.value);}} className="form-control"  aria-describedby="emailHelp" placeholder="Enter Name" />
          
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value);}} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value);}} className="form-control" id="exampleInputPassword1" placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-primary">Signup</button>
      </form>
    </div>
  )
}

export default Signup