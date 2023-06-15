import React ,{useState} from 'react'
import axios from 'axios'
import { URL } from '../URL'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate();
  const login = (e)=>{
    e.preventDefault();
    const url = `${URL}/login?email=${email}&password=${password}`
    axios.get(url)
    .then((res)=>{
        // console.log(res.data);
        localStorage.setItem('id',JSON.stringify(res.data));
        navigate('/');
    }).catch((err)=>{
      console.log(err);
    })
  }
  return (
    <div style={{padding:'40px 55px'}}>
      <form onSubmit={login}>
        <div className="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value);}} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
          
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value);}} className="form-control" id="exampleInputPassword1" placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  )
}

export default Login