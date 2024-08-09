import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import { Container, TextField, Grid, Button, Select, MenuItem, InputLabel, FormControl, styled, Typography, autocompleteClasses, Alert, Dialog, DialogTitle, DialogContent } from '@mui/material';
import QRCode from "react-qr-code";
import GetQrcode from './GetQrcode';

import * as htmlToImage from 'html-to-image';

const Modelerassignquleep = () => {


    const dataurl = 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/fetchclientalldata'
    const updateimgstatusurl = 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/updateimagestatusquleep'
     const assignmodelerurl = 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/assignmodelerquleep'
     const finalstatusuploadurl = 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/updatestatusquleepdata'
     const statusdataurl = 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/getquleepstatusdata'
    const uploadfileurl = 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/uploadfilerepo'
    const updateclientdataurl = 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/updatequleepdata'
    const updateClientLiveurl = 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/updateclientlivestatus'

     const singleproducturl = ''

    const [clientdata, setClientData] = useState()
    const [imagestatus, setImageStatus] = useState()
    const [modelername, setModelerName] = useState()
    const [timegiven, setTimeGiven] = useState('')

    const [popup, setPopUp] = useState(false)
    const [openrenderedimage, setOpenRenderedImage] = useState(false)
    const [openviewer, setOpenViewer] = useState(false)
    const [renderedimage, setRenderedImage] = useState()
    const [clientprodid, setClientProdId] = useState()
    const [dataupdate, setDataUpdate] = useState(false)
    const [qrcodeimage, setQrcodeImage] = useState('')
    const [qrcodeurl, setQrcodeUrl] = useState()
    const [currentstatus, setCurrentStatus] = useState()
    const [edit, setEdit] = useState(false)
    const [singleclientdata, setSingleClientData] = useState()
    const [imagefile, setImageFile] = useState([])
   

    const handlepopupclose = ()=>{
      setPopUp(false)
    }

    const handlemodelopen = (id)=>{
      setPopUp(true)
      setClientProdId(id)

   

     
    }
      const handleeditopen = (id)=>{
        setEdit(true)

        const newdata = clientdata.filter(item=>{
             return item.Id === id
        })

    

        setSingleClientData(newdata)
         
      }
    const handleeditclose = ()=>{
      setEdit(false)
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

          const body ={
            statusvalue: currentstatus
          }
          try{

            const response = await axios.post(statusdataurl, body).catch(err=>{
              console.log(err)
            })

         
              setClientData(response.data)
            
          

          }catch(err){
            console.log(err)

          }

        }

        fetchdata()
      
     },[dataupdate, currentstatus])



     const updateimgstatus = async (id, index)=>{

            // if(document.getElementById(`imageselect_${index}`).value === ''){
            //    window.alert('Please accept of reject image')
            //    return
            // }
        
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

      // if( document.getElementById(`imageselect_${index}`).value === '' ){
      //    window.alert('Please accept or reject the image first')
      //    return
      // }
      // if(statusvalue === 'Image Rejected'){
      //    window.alert('Please accept the image to assign modeler')
      //    return 
      // }

      if(document.getElementById(`timegiven_${index}`).value === ''){
        window.alert('please provide a time')
        return
      }

      if(document.getElementById(`modelerselect_${index}`).value === ''){
        window.alert('please select a modeler')
        return
      }

        const body = {
            Id : id,
            modelername : document.getElementById(`modelerselect_${index}`).value,
            timegiven : document.getElementById(`timegiven_${index}`).value,
            assigntime : new Date().toString()

       }

       try{
           const res = await axios.post(assignmodelerurl, body)

           if(res.status === 200){
               document.getElementById(`alertstatusmodeler_${index}`).style.display = 'flex'

                 setDataUpdate(true)
                 setTimeGiven('')
                 document.getElementById(`timegiven_${index}`).value = ''

               setTimeout(() => {
               document.getElementById(`alertstatusmodeler_${index}`).style.display = 'none'
               setDataUpdate(false)

                   
               }, 3000);
           }  

       }catch(error){
           console.log(error)

       }


     }

    const updateClientLiveStatus = async  (id, status)=>{
      
      const body = {
          Id: id,
          statusvalue : status
      }

      try{
         const response = await axios.post(updateClientLiveurl , body)
         if(response.status === 200){
            setDataUpdate(true)
            setTimeout(() => {
            setDataUpdate(false)
               
            }, 3000);
          return true
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

        //  if(document.getElementById(`finalstatus_${index}`).value === 'Live on client site'){
        //    const res=    await updateClientLiveStatus( id , document.getElementById(`finalstatus_${index}`).value)

        //    if(res){
        //     return
        //    }
        //  }

                      
    //  if(qrcodeimage === ''){
    //   window.alert('please save the qr code first')
    //   return
    // }
     
       const body ={
          Id: id,
          statusvalue : document.getElementById(`finalstatus_${index}`).value,
          rejectionreason : document.getElementById(`rejectionvalue_${index}`).value,
        
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

     const handlefinalstatuschange = (e,index,id)=>{
          if(e.target.value === 'Model Rejected'){
             document.getElementById(`rejectreason_${index}`).style.display = 'flex'
          }else{
            document.getElementById(`rejectreason_${index}`).style.display = 'none'

          }

          if(e.target.value === 'Product live'){
   
          }
     }

   

     
let x = Math.floor(Math.random()*10000)
const fileName = `image${x}.jpeg`; 
const fileType = "image/png";
function base64ToImageFile(base64String, fileName, fileType,len) {
  
  const base64Data = base64String.replace(/^data:[^;]+;base64,/, '');


  const binaryData = atob(base64Data);

  const arrayBuffer = new ArrayBuffer(binaryData.length);
  const uint8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < binaryData.length; i++) {
    uint8Array[i] = binaryData.charCodeAt(i);
  }

 
  const blob = new Blob([arrayBuffer], { type: fileType });


  const objectURL = URL.createObjectURL(blob);


  const img = new Image();

  img.onload = function () {
  
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');

   
    ctx.drawImage(img, 0, 0);

    canvas.toBlob(function (blob) {
     
      const file = new File([blob], fileName, { type: fileType });
         uploadQrcode(file, len)
    }, fileType);
  };
 

 
  img.src = objectURL;
}

     const uploadQrcode= async (imagedata, len )=>{


      const url= 'https://g98tqv1tn6.execute-api.ap-south-1.amazonaws.com/default/ImagesUploaderArnxt';
       await fetch(url,{
        method: "POST",
        body: imagedata.name
      
      }).then((res)=>res.json())
         .then((res)=>{
          
        fetch(res.uploadURL, {
            
            method: "PUT",
            headers: {
              "ContentType": "image/jpeg",
            
            },
      
          body: imagedata
          
      
          })
             .then((res)=>{
            
                if(res.status === 200){
    
                  let resnew= res.url.split('?')
                  let imgurl= resnew[0]
                 
                 setQrcodeImage(imgurl)
                 setQrcodeUrl(`https://viewar.arnxt.com/arview/viewinar?id=${clientprodid}`)
                 setPopUp(false)
                 setClientProdId(null)
               
                
                }
    
             })
             .catch((err)=>console.log(err))
           
         })
         .catch((err)=>console.log(err))
      
    
    
    }
    
     const handlesaveqrcode = ()=>{


       const qrcodevalue = document.getElementById(`productqrcode`)
  
  
       htmlToImage.toJpeg(qrcodevalue).then((url)=>{
         
        base64ToImageFile(url, fileName, fileType)
       })
     }


    //  const handlegetliveproduct = async (val)=>{

    //   const body = {
    //     statusvalue: val
    //   }

    //   const response = await axios.post(statusdataurl, body).catch(err=>{
    //     console.log(err)
    //   })

    //   console.log(response.data)

    //  }

    const handleinputchange = (e)=>{
       const {name, value } = e.target
        
       const newarray = [...singleclientdata]
 
        newarray[0][name] = value
 
        setSingleClientData(newarray)
           

    }

    
    const fileToBase64 = (file, cb) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        cb(null, reader.result)
      }
      reader.onerror = function (error) {
        cb(error, null)
      }
    }

    const handleselectupdateimage = (e)=>{

       
      let val = document.getElementById("updatefileimage").value;
      let indx = val.lastIndexOf(".") + 1;
      let filetype = val.substr(indx, val.length).toLowerCase();
  
      if (filetype === "jpg" || filetype === "png" || filetype === "jpeg") {
        let files = Array.from(e.target.files);
        files.forEach((file) => {
          fileToBase64(file, (err, result) => {
            if (result) {
              // setFile(result);
              // setFileName(file);
      
           
            }
          });
  
          const reader = new FileReader();
  
          reader.onload = () => {
            if (reader.readyState === 2) {
              // setImagesPreview((oldArray) => [...oldArray, reader.result]);
              setImageFile((oldArray) => [...oldArray, file]);
            }
          };
  
          reader.readAsDataURL(file);
        });
      } else {
        window.alert('please select png,jpg or jpeg file')
      }
        
    }


    const handleuploadeditimages= async ()=>{
      if(imagefile.length === 0){
        window.alert('Please select the file first')
        return
      }
      let temparray = []
              
      {

       for(let img of imagefile){

        const url=  uploadfileurl;
        await fetch(url,{
         method: "POST",
         body:  img.name
       
       }).then((res)=>res.json())
          .then((res)=>{
          
         fetch(res.uploadURL, {
             
             method: "PUT",
             headers: {
               "ContentType": "image/jpeg",
             
             },
       
           body: img
           
       
           })
              .then((res)=>{
             
                 if(res.status === 200){
     
                   let resnew= res.url.split('?')
                   let imgurl= resnew[0]

                   temparray.push(imgurl)
                  
                  window.alert('Images added successfully')
                 document.getElementById("updatefileimage").value = ''

                 }
     
              })
              .catch((err)=>console.log(err))
            
          })
          .catch((err)=>console.log(err))

       }
      }
      const newarray = [...singleclientdata]
 
      newarray[0]['images'] = temparray

      setSingleClientData(newarray)
    
     
    }


    const handleupdatedatasubmit = async ()=>{
          
         const response = await axios.post(updateclientdataurl, singleclientdata[0]).catch(err=>{
          console.log(err)
         })

 
         if(response.status === 200){
          window.alert('Data updated successfully')
          setImageFile([])
         
         setDataUpdate(true)
         setTimeout(() => {
       
         setEdit(false)
         setDataUpdate(false)
          
         }, 2000);

         }

    }

  return (
    <div>

    <Navbar/>
    <div className='statusbardiv'>
    <button onClick={()=>setCurrentStatus('Images Uploaded')} >Images Uploaded</button>

          <button onClick={()=>setCurrentStatus('Image Rejected')} >Images Rejected</button>
          <button onClick={()=>setCurrentStatus('Modeler assigned')} >Modeler Assigned</button>

          <button onClick={()=>setCurrentStatus('Models Uploaded')} >Models Uploaded</button>
          <button onClick={()=>setCurrentStatus('Model Accepted')} >Models Accepted</button>
          <button onClick={()=>setCurrentStatus('Model Rejected')} >Models Rejected</button>

          {/* <button onClick={()=>setCurrentStatus('Product live')}>Product Live</button>
          <button onClick={()=>setCurrentStatus('Live on client site')}>Live on client site</button> */}

      </div>

      <div>
        <p>Product Count : {clientdata && clientdata.length}</p>
      </div>

    <div className='clientalldatacontainer'>
      
    <Dialog open= {edit} onClose={handleeditclose}   >
      <div className='editdiv'>
      <DialogContent>

        {
          singleclientdata && singleclientdata.map(item=>(
            
            <div>
                 <label>Product name</label>
       <TextField  value= {item.productname} onChange={handleinputchange} name='productname' ></TextField>
       <label>Platform name</label>
       <TextField value={item.platformname} onChange={handleinputchange} name='brandname' ></TextField>
       <label>Product pageurl</label>
       <TextField value={item.productpageurl} onChange={handleinputchange} name='productpageurl'></TextField>
       <label>Product length</label>
       <TextField value={item.productlength} onChange={handleinputchange} name='productlength'></TextField>
       <label>Product width</label>
       <TextField value={item.productwidth} onChange={handleinputchange} name='productwidth'></TextField>
       <label>Product height</label>
       <TextField value={item.productheight} onChange={handleinputchange} name='productheight'></TextField>
       <label>Unit</label>
       <TextField value={item.dimensionunit} onChange={handleinputchange} name='dimensionunit'></TextField>
        <div style={{marginTop:'10px'}}>
          <input type='file' id = {'updatefileimage'}  onChange={(e)=>handleselectupdateimage(e)} multiple />

            <div style={{marginTop:"10px", borderRadius:"5px", maxWidth: '500px', display:'flex', justifyContent:'center', overflowX:'scroll', border:'2px solid grey', margin:'10px'}}>
            {
           item.images.map(item=>(
              <img  src={item} style={{width:'200px' ,height:'200px', padding:'10px'}}/>
            ))
            }

            </div>
        
           <div style={{marginTop:'10px', display:'flex'}}>
            <div>
           <Button variant='contained' onClick={handleuploadeditimages} >Upload image</Button>
              <div className='alertstatusimage' id = {`alertupdateimageupload`} >
                   <Alert severity="success" variant='filled' ></Alert>
                      </div>

            </div>
        
           </div>
              
         
        </div>

            <div style={{marginTop:'10px', display:'flex'}}>
              <div>
              <Button variant='contained' onClick={handleupdatedatasubmit} >Submit</Button>

              </div>
            </div>
               <div className='alertstatusimage' id = {`alertupdatesubmit`} >
                               <Alert severity="success" variant='filled' ></Alert>
                                </div>

            </div>  
          ))
        }
    

      </DialogContent>

      </div>

</Dialog>

      
      <Dialog open= {popup} onClose={handlepopupclose} >
      <div id= 'productqrcode' className='qrcodecontainer'>

<QRCode
  size={80}
  style={{ height: "auto", maxWidth: "100%", width: "100%", padding: '20px'}}

value = {`https://www.admin.arnxt.com/viewmodel?id=${clientprodid}`}

/>

</div>
{/* <div style={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}>
 <button onClick={handlesaveqrcode} style={{margin:'5px', border:'1px solid grey', borderRadius:'5px', backgroundColor:'transparent'}}>Save QR code</button>
</div> */}

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
                            <span style={{display:'flex'}}>  <p className='labelclient'>platform name : </p>  <p>{item.platformname}</p></span>
                            <span style={{display:'flex'}}>  <p className='labelclient'>Uploaded by :</p>  <p>{item.uploadedby}</p></span>
                            <span style={{display:'flex'}}>  <p className='labelclient'>uploaded date :</p>  <p>{item.uploaddate?.split(' ').slice(0,4).join(' ')}</p></span>
                            <span style={{display:'flex'}}>  <p className='labelclient'>Assigned date :</p>  <p>{item.modelerassigntime?.split(' ').slice(0,5).join(' ')}</p></span>
                            <span style={{display:'flex'}}>  <p className='labelclient'>Time given :</p>  <p>{item.timegiven}</p></span>
                            <span style={{display:'flex'}}>  <p className='labelclient'>Models uploaded :</p>  <p>{item.modeluploaddate?.split(' ').slice(0,5).join(' ')}</p></span>

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
                         
                                 <option><p>Image Rejected</p></option>
 
                              </select>
                              <div style={{marginLeft:'5px'}}>
                              <Button variant='contained' onClick={()=>updateimgstatus(item.Id, index)}>Submit</Button>
                              </div>

                               <div className='alertstatusimage' id = {`alertstatus_${index}`} >
                               <Alert severity="success" variant='filled' ></Alert>
                                </div>
                           
                         </div>
                         <div style={{marginTop:'5px', display:'flex', justifyContent:'start', alignItems:'start', width:'100%'}}>
                          <div className='clientdatadiv1'>
                          <span style={{display:'flex'}}> <TextField variant='outlined' id={`timegiven_${index}`} label='Time given'  /> </span>

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
                         <div style={{marginTop:'5px', display:'flex', width:'100%'}}>



                                    <div style={{marginLeft:'5px', display:'flex', gap:'5px'}}>
                        <Button variant='contained' color='primary' onClick={()=>handleeditopen(item.Id)}>
                        Edit 
                        </Button>
                        {/* <Button variant='contained'>
                        <a href={item.glburl} target= '_blank' style={{color:'white'}} >Download glb</a>
                        </Button> */}
                       
                      

                      </div> 

</div>

                          <div style={{marginTop:'5px', display:'flex', width:'100%'}}>

                            {
                              item.glburl === undefined && item.renderedimage === undefined ?  '' 

                              : 
                              <div style={{marginLeft:'5px', display:'flex', gap:'5px'}}>
                               
                              <Button variant='contained' color='primary' onClick={()=>handlemodelopen(item.Id)}>
                               View Model
                              </Button>
                              <Button variant='contained' color='primary' onClick={()=>handelopenimage(item.renderedimage)}>
                                 View Rendered image
                              </Button>
                      
                            </div> 

                              
                      
                            }
                   

                     </div>
                   
                         <div style={{marginTop:'10px', display:'flex', width:'100%'}}>
                         <select  style={{minWidth: '140px'}} id= {`finalstatus_${index}`} onChange={(e)=>handlefinalstatuschange(e,index)} >
                                 <option  disabled selected value={''}>Change final status</option>
                                 <option value = {'Model Accepted'}><p>Model Accepted</p></option>
                                 <option value = {'Model Rejected'}><p>Model Rejected</p></option>
                                  {/* <option value = {'Product live'}><p>Product live</p></option>
                                  <option value = {'Live on client site'}><p>Live on client site</p></option> */}

 
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
                     
 
                     
                     </div>    
 
                 </div>



                ))
            }
     
         </div>

    </div>
  
</div>
  )
}

export default Modelerassignquleep
