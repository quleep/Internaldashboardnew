import React, { useEffect, useState } from 'react'
import { setUserSession } from './service/AuthService';
import axios from 'axios';
const adminloginurl= 'https://4xuh6eqvr6.execute-api.ap-south-1.amazonaws.com/production/adminlogin';

const Login = ({history}) => {

    const [loginemail, setLoginEmail] = useState();
    const [loginpassword, setLoginPassword] = useState();
    const [res, setRes]= useState('')

    const [message, setMessage] = useState('')


    useEffect(()=>{
        if(res === 200){
          history.push('/main')
        }
      },[history, res])

    
  const loginHandler=(e)=>{

   
    e.preventDefault();

    const loginbody={
      email: loginemail,
      employee_Id: loginpassword
    }
    axios.post(adminloginurl, loginbody).then(res=>{
      console.log(res.status)
      if(res.status === 200){
        setRes(res.status)
        setUserSession(res.data.user, res.data.token) 
      }
    }).catch(error=>{
    
        setMessage(error.response.data.message)
      
        setTimeout(()=>{

          setMessage('')
        },[3000])
      


      
    })
  }



  return (
    <div>

<form class="login"  onSubmit={loginHandler}>
  <h2>ARnxt, Users!</h2>
  <p>Please log in</p>
  <input type='email' onChange={event=> setLoginEmail(event.target.value)} placeholder='ARnxt email' />
  <input type='password'  onChange={event=> setLoginPassword(event.target.value)} placeholder='employee id' />
  <input type="submit" value="Log In" style={{cursor:'pointer'}} />
  <div class="links">
  
   
  </div>
</form>
    {
      message && <p  style={{color:'red'}}>{message}</p>
    }
      
    </div>
  )
}

export default Login
