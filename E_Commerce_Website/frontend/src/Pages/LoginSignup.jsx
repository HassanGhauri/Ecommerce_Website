/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import './CSS/LoginSignup.css'
import axios from 'axios'
const LoginSignup = () => {
  const [state,setState] = useState("Login");
  const [formData,setFormData] = useState({
    username:"",
    password:"",
    email:"",
  })
  const changeHandler = (e) =>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  const login = async ()=>{
    let responseData;
    await axios.post("http://localhost:4000/login",JSON.stringify(formData),{
      headers: {
      "content-type": "application/json", // do not forget this
    }}).then((data)=>{
      responseData=data;
      console.log(responseData.data)
    });
    if(responseData.data.success){
      localStorage.setItem('auth-token',responseData.data.token);
      window.location.replace("/");
      console.log(responseData.data.token)
    }else{
      console.log(responseData.data.errors)
      alert(responseData.data.errors);
    }

  }
  const signup = async ()=>{
    let responseData;
    await axios.post("http://localhost:4000/signup",JSON.stringify(formData),{
      headers: {
      "content-type": "application/json", // do not forget this
    }}).then((data)=>{
      responseData=data;
      console.log(responseData.data)
    });
    if(responseData.data.success){
      localStorage.setItem('auth-token',responseData.data.token);
      window.location.replace("/");
      console.log(responseData.data.token)
    }else{
      console.log(responseData.data.errors)
      alert(responseData.data.errors);
    }

    
  }
  return (
    <div className='loginsignup'>
      <div className='loginsignup-container'>
        <h1>{state}</h1>
        <div className='loginsignup-fields'>
          {state==="Sign Up" ?<input name='username' value={formData.username} onChange={changeHandler}  type='text' placeholder='Your Name'/>:<></>}
          <input name='email' value={formData.email} onChange={changeHandler} type='email' placeholder='Email Address'/>
          <input name='password' value={formData.password} onChange={changeHandler} type='password' placeholder='Password'/>
        </div>
        <button onClick={()=>{state === "Login"?login():signup()}}>Continue</button>
        {state==="Sign Up"?<p className='loginsignup-login'>Already have an account? <span onClick={()=>{setState("Login")}}>Login here</span> </p>
        :<p className='loginsignup-login'>Create an account? <span  onClick={()=>{setState("Sign Up")}}>Click here</span> </p>}
      </div>
    </div>
  )
}

export default LoginSignup
