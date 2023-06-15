import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar'
import axios from 'axios';
import { URL } from '../URL';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Card from '../Components/Card';

const Profile = () => {
  const token = JSON.parse(localStorage.getItem('id'))
  const navigate = useNavigate()
  const [tasks,setTasks] = useState([]);
  const [reff,setReff] = useState(0);
  useEffect(()=>{
    if(!token || !token.length) {navigate('/login');}
    const url = `${URL}/?token=${token}`;
    axios.get(url)
    .then((res)=>{
      console.log(res.data);
      setTasks(res.data.Tasks);
    }).catch((err)=>{
      console.log(err);
    })
  },[reff])
  return (
    <div>
      <Navbar reff={reff} setReff={setReff}/>
      <div style={{width:'100vw'}}>
        {
          tasks.map((id)=>{
            return <Card id={id} reff={reff} setReff={setReff} />
          })
        }
      </div>
    </div>
  )
}

export default Profile