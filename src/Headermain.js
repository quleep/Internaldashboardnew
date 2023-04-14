import React from "react";

import { useHistory, useLocation } from "react-router-dom";
import Divider from './images/divider.svg'
import Navbar from "./Navbar";

const Headermain = () => {

    const history = useHistory();
    const location = useLocation();

    const userdata= sessionStorage.getItem('user')
    let useremail= JSON.parse(userdata)
     let loginuser= useremail.email
     let roleuse= useremail.role

     const hrHandler=()=>{
      if(roleuse === 'hr' || roleuse === 'admin' ){
        history.push('/assignrole')

      }
      else{
        document.getElementById('warning2').style.display= 'block'
        setTimeout(() => {
          document.getElementById('warning2').style.display= 'none'
          
        }, [2000]);
      }

     }
  

  return (
    <div>

        <Navbar/>
            <div className="navbar">
      <div>
        <p className=" navoperation" >
        <a href='/modelpath'>Operations</a>
        </p>
       
      </div>
      <img src={Divider} alt="Your SVG" className="divider-svg" />
      <div >
        <p className="navoperation" ><a href="#" >Sales</a></p>
      </div>
      <img src={Divider} alt="Your SVG" className="divider-svg" />
      <div >
        <p  className="navoperation" ><a  onClick={hrHandler}  style={{cursor:'pointer'}} >HR</a></p>
        <div className="alert-box warning2" id='warning2' >Access Denied !</div>
      </div>
    </div>
      
    </div>
  )
}

export default Headermain
