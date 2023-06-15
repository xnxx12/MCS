import React, { useEffect, useState } from 'react'
import { URL } from '../URL';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Card = ({id,reff,setReff}) => {
    const [head,setHead] = useState("")
    const [body,setBody] = useState("")
    const token = JSON.parse(localStorage.getItem('id'));
    const navigate = useNavigate();
    useEffect(()=>{
        const url = `${URL}/taskDetails?id=${id}`
        axios.get(url)
        .then((res)=>{
            // console.log(res.data);
            setHead(res.data.Heading);
            setBody(res.data.Body);

        }).catch((err)=>{
            console.log(err);
        })
    },[id,reff])

    const removeTask = ()=>{
      const url = `${URL}/removeTask?token=${token}`
      axios.delete(url,{
        data : {
          task : id
        }
      })
      .then((res)=>{
          setReff(!reff);
          setHead("")
          setBody("")
      }).catch((err)=>{
        console.log(err);
      })
    }
  return (
    (head.length>0 && body.length>0 && <div className="card" style={{width: '18rem',margin:'10px',display:'inline-block'}}>
      <div className="card-body">
        <h5 className="card-title">{head}</h5>
        <p className="card-text">{body}</p>
        <button className="btn btn-primary" onClick={removeTask}>Delete</button>
      </div>
    </div>)
  )
}

export default Card