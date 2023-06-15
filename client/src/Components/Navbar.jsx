import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { URL } from '../URL';

const Navbar = ({reff,setReff}) => {
  const [vis,setVis] = useState(false);
  const navigate = useNavigate();
  const toogle = ()=>{
    setVis(!vis);
  }
  const [head,setHead] = useState('');
  const [body,setBody] = useState('');
  const token = JSON.parse(localStorage.getItem('id'));
  const addTask = (e)=>{
    e.preventDefault();
    console.log(token);
    if(!token || !token.length){navigate('/login')}
    else{
      const url = `${URL}/addTask?token=${token}`
      console.log(head);
      console.log(body);
      axios.post(url,{
        heading : head,body
      }).then((res)=>{
        // console.log(res);
        setVis(false);
        setReff(!reff);
        navigate('/')
      }).catch((err)=>{
        console.log(err);
      })
    }
  }
  const handleLogout = ()=>{
    localStorage.setItem('id',"");
    navigate('/login');
  }
  return (
    <>
      <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <a className="navbar-brand" href="#">Tasks</a>


              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">


                </ul>
                  <button className="btn btn-outline-success my-2 my-sm-0" onClick={toogle} type="submit">Add Task</button>
                  <button onClick={handleLogout} className="btn btn-outline-danger my-2 my-sm-0" style={{marginLeft:'5px'}} type="submit">Logout</button>
              </div>
          </nav>
      </div>
      {vis&&<div style={{padding:'30px 20px',margin:'0px 10px',position:'absolute',zIndex:'1',width:'100%',backdropFilter:'blur(8px)'}}>
          <form  onSubmit={addTask}>
            <div className="form-group">
              <label htmlFor="exampleFormControlInput1">Task Heading</label>
              <input type="text" className="form-control" value={head} onChange={(e)=>{setHead(e.target.value)}}  placeholder="Task Heading"/>
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1">Task Body</label>
              <textarea className="form-control" value={body} onChange={(e)=>{setBody(e.target.value)}} id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
      </div>}
    </>
  )
}

export default Navbar