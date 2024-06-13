import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import { Container, TextField, Grid, Button, Select, MenuItem, InputLabel, FormControl, styled, Typography, autocompleteClasses, Alert } from '@mui/material';


const Modelerasignpage = () => {

    const dataurl = 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/fetchclientalldata'
    const updateimgstatusurl = 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/updateimagestatusclient'
     const assignmodelerurl = 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/assignmodelerclient'

    const [clientdata, setClientData] = useState()
    const [imagestatus, setImageStatus] = useState()
    const [modelername, setModelerName] = useState()

     useEffect(()=>{


        const fetchdata = async ()=>{
          try{

            const response = await axios.get(dataurl)
            setClientData(response.data)

          }catch(err){
            console.log(err)

          }

        }

        fetchdata()

      

     },[])

     const updateimgstatus = async (id, index)=>{
        const body = {
             Id : id,
             imgstatus : imagestatus

        }

        try{
            const res = await axios.post(updateimgstatusurl, body)

            if(res.status === 200){
                document.getElementById(`alertstatus_${index}`).style.display = 'flex'

                setTimeout(() => {
                document.getElementById(`alertstatus_${index}`).style.display = 'none'

                    
                }, 3000);
            }  

        }catch(error){
            console.log(error)

        }



     }
     const assignModeler = async (id,  index)=>{

        const body = {
            Id : id,
             modelername : modelername

       }

       try{
           const res = await axios.post(assignmodelerurl, body)

           if(res.status === 200){
               document.getElementById(`alertstatusmodeler_${index}`).style.display = 'flex'

               setTimeout(() => {
               document.getElementById(`alertstatusmodeler_${index}`).style.display = 'none'

                   
               }, 3000);
           }  

       }catch(error){
           console.log(error)

       }


     }

    

  return (
    <div>

        <Navbar/>

        <div className='clientalldatacontainer'>
             
             <div className='clientdatamain'>

                {
                    clientdata && clientdata.map((item, index)=>(
                        <div>
                        <div className='clientdatainsidecontainer'>
                          <div>
                             <div className='clientdatadiv1'>
                                <span style={{display:'flex'}}>  <p className='labelclient'>product Id : </p>  <p >{item.Id}</p></span>
                                <span style={{display:'flex'}}>  <p className='labelclient'>product name : </p>  <p>{item.productname}</p></span>
                                <span style={{display:'flex'}}>  <p className='labelclient'>brand : </p>  <p>{item.brandname}</p></span>
                                <span style={{display:'flex'}}>  <p className='labelclient'>Uploaded by :</p>  <p>{item.uploadedby}</p></span>
                                <span style={{display:'flex'}}>  <p className='labelclient'>uploaded date :</p>  <p>{item.uploaddate.split(' ').slice(0,4).join(' ')}</p></span>

                             </div>
     
                          </div>
                          <div>
                          <div className='clientdatadiv2'>

                          <span style={{display:'flex'}}>  <p className='labelclient'>product length : </p>  <p >{item.productlength}</p></span>
                                <span style={{display:'flex'}}>  <p className='labelclient'>product width : </p>  <p>{item.productwidth}</p></span>
                                <span style={{display:'flex'}}>  <p className='labelclient'>product height :  </p>  <p>{item.productheight}</p></span>
                                <span style={{display:'flex'}}>  <p className='labelclient'>Unit :</p>  <p>{item.dimensionunit}</p></span>
                         
     
                             </div> 
                          </div>
                          <div>
                          <div className='clientdatadiv3'>

                             {
                                item.images.map((img)=>(
                                    <img style={{maxWidth:'300px', maxHeight: '300px', margin:'10px', objectFit:'contain'}} src= {img}/>
                                ))
                             }
                              
                                
     
                                  
     
                             </div>  
                          </div>
                          <div>
                          <div className='clientdatadiv4'>
                             <div style={{marginTop:'10px', display:'flex', width:'100%'}}>
                             <select  style={{minWidth: '140px'}} onChange={(e)=>setImageStatus(e.target.value)} >
                                     <option  disabled>Status</option>
                                     <option><p>Image Accepted</p></option>
                                     <option><p>Image Rejected</p></option>
     
                                  </select>
                                  <div style={{marginLeft:'5px'}}>
                                  <Button variant='contained' onClick={()=>updateimgstatus(item.Id, index)}>Submit</Button>
                                  </div>

                                   <div className='alertstatusimage' id = {`alertstatus_${index}`} >
                                   <Alert severity="success" variant='filled' ></Alert>
                                    </div>

                              
     
                             </div>
                             <div style={{marginTop:'10px', display:'flex', width:'100%'}}>
                             <select   style={{minWidth: '140px'}} onChange={(e)=>setModelerName(e.target.value)}>
                                     <option  disabled>Assign Modeler</option>
                                     <option><p>Modeler1</p></option>
                                     <option><p>Modeler2</p></option>
                                     <option><p>Modeler3</p></option>
                                     <option><p>Modeler4</p></option>
                                     <option><p>Modeler5</p></option>
                                     <option><p>Modeler6</p></option>
     
     
                                  </select>
                                  <div style={{marginLeft:'5px'}}>
                                  <Button variant='contained' onClick={()=>assignModeler(item.Id, index)}>Assign</Button>

                                  </div>
                                  <div className='alertstatusimage' id = {`alertstatusmodeler_${index}`} >
                                   <Alert severity="success" variant='filled' ></Alert>
                                    </div>
                                 
     
                             </div>
                             <div style={{marginTop:'5px', display:'flex', justifyContent:'start', alignItems:'start', width:'100%'}}>
                                <div className='clientdatadiv1'>
                                <span style={{display:'flex'}}>  <p className='labelclient'> status : </p>  <p >{item.statusval}</p></span>

                               </div>
                                 
     
                             </div>
                             <div style={{marginTop:'5px', display:'flex', justifyContent:'start',alignItems:'start', width:'100%'}}>
                                <div className='clientdatadiv1'>
                                <span style={{display:'flex'}}>  <p className='labelclient'>Modeler : </p>  <p >{item.modeler}</p></span>

                               </div>
                                 
     
                             </div>
                            
                             </div> 
                             
                          </div>
                          <div></div>
     
                         
                         </div>    
     
                     </div>



                    ))
                }
         
           


             </div>

        </div>
      
    </div>
  )
}

export default Modelerasignpage
