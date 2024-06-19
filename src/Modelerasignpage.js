import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import { Container, TextField, Grid, Button, Select, MenuItem, InputLabel, FormControl, styled, Typography, autocompleteClasses, Alert, Dialog, DialogTitle, DialogContent } from '@mui/material';
import QRCode from "react-qr-code";


const Modelerasignpage = () => {

    const dataurl = 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/fetchclientalldata'
    const updateimgstatusurl = 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/updateimagestatusclient'
     const assignmodelerurl = 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/assignmodelerclient'
     const finalstatusuploadurl = 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/updatestatusclientupload'

    const [clientdata, setClientData] = useState()
    const [imagestatus, setImageStatus] = useState()
    const [modelername, setModelerName] = useState()

    const [popup, setPopUp] = useState(false)
    const [openrenderedimage, setOpenRenderedImage] = useState(false)
    const [openviewer, setOpenViewer] = useState(false)
    const [renderedimage, setRenderedImage] = useState()
    const [clientprodid, setClientProdId] = useState()
    const [dataupdate, setDataUpdate] = useState(false)

    const handlepopupclose = ()=>{
      setPopUp(false)
    }

    const handlemodelopen = (id)=>{
      setPopUp(true)
      setClientProdId(id)

     
    }
    const handelopenimage = (renderedimage)=>{
      setOpenRenderedImage(true)
      setRenderedImage(renderedimage)
    }
    const handlecloseimage = ()=>{
      setOpenRenderedImage(false)
    }

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
      
     },[dataupdate])



     const updateimgstatus = async (id, index)=>{

            if(document.getElementById(`imageselect_${index}`).value === ''){
               window.alert('Please accept of reject image')
               return
            }
        
        const body = {
             Id : id,
             imgstatus : document.getElementById(`imageselect_${index}`).value

        }

        try{
            const res = await axios.post(updateimgstatusurl, body)

            if(res.status === 200){
               setDataUpdate(true)
                document.getElementById(`alertstatus_${index}`).style.display = 'flex'

                setTimeout(() => {
                document.getElementById(`alertstatus_${index}`).style.display = 'none'
                setDataUpdate(false)
                    
                }, 3000);
            }  

        }catch(error){
            console.log(error)

        }



     }
     const assignModeler = async (id,  index, statusvalue)=>{

      if( document.getElementById(`imageselect_${index}`).value === '' ){
         window.alert('Please accept or reject the image first')
         return
      }
      if(statusvalue === 'Image Rejected'){
         window.alert('Please accept the image to assign modeler')
         return 
      }

      if(document.getElementById(`modelerselect_${index}`).value === ''){
        window.alert('please select a modeler')
        return
      }

        const body = {
            Id : id,
             modelername : document.getElementById(`modelerselect_${index}`).value

       }

       try{
           const res = await axios.post(assignmodelerurl, body)

           if(res.status === 200){
               document.getElementById(`alertstatusmodeler_${index}`).style.display = 'flex'

                 setDataUpdate(true)

               setTimeout(() => {
               document.getElementById(`alertstatusmodeler_${index}`).style.display = 'none'
               setDataUpdate(false)

                   
               }, 3000);
           }  

       }catch(error){
           console.log(error)

       }


     }

     const handleFinalStatusUpdate = async (id, index)=>{
        
         if(document.getElementById(`finalstatus_${index}`).value === ''){
            window.alert('Please select a status')
            return
         }

         if(document.getElementById(`finalstatus_${index}`).value === 'Model Rejected'){
         if(document.getElementById(`rejectionvalue_${index}`).value === ''){
           window.alert('please provide a rejection reason')
           return

         }

            
         }
            

         
       const body ={
          Id: id,
          statusvalue : document.getElementById(`finalstatus_${index}`).value,
          rejectionreason : document.getElementById(`rejectionvalue_${index}`).value 
       }

       try{
         const res = await axios.post(finalstatusuploadurl, body)
           if(res.status === 200){
            setDataUpdate(true)
            setTimeout(() => {
            setDataUpdate(false)
               
            }, 3000);
           }

       }catch(error){
         console.log(error)
       }


     }

     const handlefinalstatuschange = (e,index)=>{
          if(e.target.value === 'Model Rejected'){
             document.getElementById(`rejectreason_${index}`).style.display = 'flex'
          }else{
            document.getElementById(`rejectreason_${index}`).style.display = 'none'

          }
     }

    

  return (
    <div>

        <Navbar/>

        <div className='clientalldatacontainer'>

        <Dialog open= {popup} onClose={handlepopupclose}  >

<DialogTitle>
  Scan the QR code

</DialogTitle>

     
<QRCode
   size={256}
   style={{ height: "auto", maxWidth: "100%", width: "100%", padding: '20px'}}

value = {`https://www.admin.arnxt.com/viewmodel?id=${clientprodid}`}

/>

</Dialog>

<Dialog open= {openrenderedimage} onClose={handlecloseimage} hideBackdrop >


<div>
   <img src= {renderedimage} />
</div>

</Dialog>
             
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
                                <span style={{display:'flex'}}>  <a href={item.productpageurl} target='blank' >Open page url</a></span>
                         
     
                             </div> 
                          </div>
                          <div>
                          <div className='clientdatadiv3'>

                             {

                               item.images.length > 0 ? 
                                item.images.map((img)=>(
                                    <img style={{maxWidth:'300px', maxHeight: '300px', margin:'10px', objectFit:'contain'}} src= {img}/>
                                ))
                                :<p>
                                 No images available
                                </p>
                             }
                              
                             </div>  
                          </div>
                          <div>
                          <div className='clientdatadiv4'>
                             <div style={{marginTop:'10px', display:'flex', width:'100%'}}>
                             <select  style={{minWidth: '140px'}} id= {`imageselect_${index}`} onChange={(e)=>setImageStatus(e.target.value)} >
                                     <option  disabled selected value={''}>Image Status</option>
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

                           
                             <select   style={{minWidth: '140px'}} id= {`modelerselect_${index}`} onChange={(e)=>setModelerName(e.target.value)}>
                                     <option  disabled selected value={''}>Assign Modeler</option>
                                     <option value={'modeler1@arnxt.com'}><p>Modeler1</p></option>
                                     <option value={'modeler2@arnxt.com'}><p>Modeler2</p></option>
                                     <option value={'modeler3@arnxt.com'}><p>Modeler3</p></option>
                                     <option value={'modeler4@arnxt.com'}><p>Modeler4</p></option>
                                     <option value={'modeler5@arnxt.com'}><p>Modeler5</p></option>
                                     <option value={'modeler6@arnxt.com'}><p>Modeler6</p></option>
     
     
                                  </select>
                                  <div style={{marginLeft:'5px'}}>
                                  <Button variant='contained' onClick={()=>assignModeler(item.Id, index, item.statusval)}>Assign</Button>

                                  </div>
                                  <div className='alertstatusimage' id = {`alertstatusmodeler_${index}`} >
                                   <Alert severity="success" variant='filled' ></Alert>
                                    </div>
                                 
     
                             </div>
                             <div style={{marginTop:'5px', display:'flex', justifyContent:'start', alignItems:'start', width:'100%'}}>
                                <div className='clientdatadiv1'>
                                <span style={{display:'flex'}}>  <p className='labelclient'> status : </p>  <p  style={ item.statusval === 'Models Uploaded' ?   {backgroundColor:"green", color:'white'}: {backgroundColor:'yellow'}}  >{item.statusval}</p></span>

                               </div>
                                 
     
                             </div>

                             {
                              item.statusval === 'Model Rejected' ? 
                              <div style={{marginTop:'5px', display:'flex', justifyContent:'start', alignItems:'start', width:'100%'}}>
                              <div className='clientdatadiv1'>
                              <span style={{display:'flex'}}>  <p className='labelclient'> Remarks : </p>  <p  style={ item.statusval === 'Model Rejected' ?   {backgroundColor:"red", color:'white'}: {backgroundColor:'yellow'}}  >{item.rejectionreason}</p></span>

                             </div>
                               
   
                           </div> : ''
                             }
                         
                             <div style={{marginTop:'5px', display:'flex', justifyContent:'start',alignItems:'start', width:'100%'}}>
                                <div className='clientdatadiv1'>
                                <span style={{display:'flex'}}>  <p className='labelclient'>Modeler : </p>  <p >{item.modeler}</p></span>

                               </div>
                                 
     
                             </div>

                             {
                              item.statusval === 'Models Uploaded' ? 
                              <div style={{marginTop:'5px', display:'flex', width:'100%'}}>
                       
                              <div style={{marginLeft:'5px', display:'flex', gap:'5px'}}>
                                <Button variant='contained' color='primary' onClick={()=>handlemodelopen(item.Id)}>
                                 View Model
                                </Button>
                                <Button variant='contained' color='primary' onClick={()=>handelopenimage(item.renderedimage)}>
                                   View Rendered image
                                </Button>
                        
                              </div>

                         </div> : ''
                             }
                       
                             <div style={{marginTop:'10px', display:'flex', width:'100%'}}>
                             <select  style={{minWidth: '140px'}} id= {`finalstatus_${index}`} onChange={(e)=>handlefinalstatuschange(e,index)} >
                                     <option  disabled selected value={''}>Change final status</option>
                                     <option value = {'Model Accepted'}><p>Model Accepted</p></option>
                                     <option value = {'Model Rejected'}><p>Model Rejected</p></option>
                                      <option value = {'Product live'}><p>Product live</p></option>
     
                                  </select>
                                    <div id={`rejectreason_${index}`} style={{display:'none'}}>
                                       <TextField variant='outlined' label='Rejection reason' id={`rejectionvalue_${index}`} />
                                       </div>
                                  <div style={{marginLeft:'5px'}}>
                                  <Button variant='contained'  onClick={()=>handleFinalStatusUpdate(item.Id,index)} >Submit</Button>
                                  </div>

                                   <div className='alertstatusimage' id = {`alertdivfinalstatus`} >
                                   <Alert severity="success" variant='filled' ></Alert>
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
