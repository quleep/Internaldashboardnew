import React, { useEffect, useState } from 'react'
import { setUserSession } from './service/AuthService';
import axios from 'axios';
import TextField from '@mui/material/TextField';
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
    <div  className='loginbackground'>

<form class="login"  onSubmit={loginHandler}>
  <h2>ArNXT Users!</h2>
  <p>Please log in</p>

   <div style={{display:'flex', gap:'10px', flexDirection:'column'}}>
   <TextField fullWidth label="ARnxt email"  onChange={event=> setLoginEmail(event.target.value)}  variant="outlined" />
   <TextField fullWidth label="Employee Id"   onChange={event=> setLoginPassword(event.target.value)}  variant="outlined" />

   {/* <TextField fullWidth label="employee id"  type='password'  onChange={event=> setLoginPassword(event.target.value)} name='productname'  variant="outlined" /> */}
   </div>

  <input type="submit" value="Log In" style={{cursor:'pointer'}} />

</form>
    {
      message && <p  style={{color:'red'}}>{message}</p>
    }
      
    </div>
  )
}

export default Login
