/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import './NewsLetter.css'
import axios from 'axios'
const NewsLetter = () => {
  const [state,setState] = useState("unsubscribed");
  const [formData,setFormData] = useState({
    email:"",
  })
  const changeHandler = (e) =>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  const subscribe = async ()=>{
    let responseData;
    await axios.post("http://localhost:4000/subscribe",JSON.stringify(formData),{
      headers: {
      "content-type": "application/json", // do not forget this
    }}).then((data)=>{
      responseData=data;
      console.log(responseData.data)
    });
    if(responseData.data.success){
      localStorage.setItem('auth-token',responseData.data.token);
      alert("Succesfully Subscribed!")
      console.log(responseData.data.token)
    }else{
      console.log(responseData.data.errors)
      alert(responseData.data.errors);
    }

    
  }
  return (
    <div className='newsletter'>
        <h1>Get Exclusive offers on your Email</h1>
        <p>Subscribe to our newsletter and stay updated</p>
        <div>
            <input type='email' placeholder='Your email id' name='email' value={formData.email} onChange={changeHandler}/>
            <button onClick={subscribe}>Subscribe</button>
        </div>
    </div>
  )
}

export default NewsLetter
