import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import { Container, TextField, Grid, Button, Select, MenuItem, InputLabel, FormControl, styled, Typography, autocompleteClasses, Alert } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';



const Uploadclientmodel = () => {

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
      });

      const [glbfilename, setGlbFileName] = useState()
      const [usdzfilename, setUsdzFileName] = useState()
      const [imagefilename, setImageFileName] = useState()

      const [glbfile, setGlbFile] = useState()
      const [usdzfile, setUsdzFile] = useState()
      const [imagefile, setImageFile] = useState()


const modelernameurl= 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/fetchmodelerclient';
const uploadfileurl = 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/uploadfilerepo'
const uploadallfilesurl = 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/uploadfilesclient'


  const [clientdata, setClientData] = useState()

  const [uploadurls, setUploadUrls] = useState({
      glburl : '',
      usdzurl : '',
      imageurl: ''
       
  })

    useEffect(()=>{

        const userdata= sessionStorage.getItem('user')
        let useremail= JSON.parse(userdata)
         let loginuser= useremail.email

        const fetchuser = async()=>{
            
    const emailbody={
        modeler: loginuser
      }

      try{
        const response = await   axios.post(modelernameurl, emailbody )

        
          if(response.data.length > 0){
            setClientData(response.data)
          }else{
            window.alert('currently you dont have any task assigned')
          }
    

      }catch(error){
        console.log(error)
      }

        }

        fetchuser()

    },[])
    
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

    const fileselectglb = (e)=>{
          
        let val = document.getElementById("glbfile").value;
        let indx = val.lastIndexOf(".") + 1;
        let filetype = val.substr(indx, val.length).toLowerCase();
    
        if (filetype === 'glb') {
          let files = Array.from(e.target.files);
          files.forEach((file) => {
            fileToBase64(file, (err, result) => {
              if (result) {
                setGlbFile(file);
             
              }
            });
    
            const reader = new FileReader();
    
            reader.onload = () => {
              if (reader.readyState === 2) {
             
              }
            };
    
            reader.readAsDataURL(file);
          });
        } else {

            window.alert('please select a glb file')
             document.getElementById("glbfile").value = ''
            
            return
      
        }
    }

    
    const fileselectusdz = (e)=>{
          
        let val = document.getElementById("usdzfile").value;
        let indx = val.lastIndexOf(".") + 1;
        let filetype = val.substr(indx, val.length).toLowerCase();
    
        if (filetype === 'usdz') {
          let files = Array.from(e.target.files);
          files.forEach((file) => {
            fileToBase64(file, (err, result) => {
              if (result) {
                setUsdzFile(file);
             
              }
            });
    
            const reader = new FileReader();
    
            reader.onload = () => {
              if (reader.readyState === 2) {
             
              }
            };
    
            reader.readAsDataURL(file);
          });
        } else {

            window.alert('please select an usdz file')
             document.getElementById("usdzfile").value = ''
            
            return
      
        }
    }

    const uploadUsdzFile = async ()=>{

       if(document.getElementById('usdzfile').value === ''){
          window.alert('Please select an usdz file')
          return
       }

        const url=  uploadfileurl;
        await fetch(url,{
         method: "POST",
         body:  usdzfile.name
       
       }).then((res)=>res.json())
          .then((res)=>{
          
         fetch(res.uploadURL, {
             
             method: "PUT",
             headers: {
               "ContentType": "image/jpeg",
             
             },
       
           body: usdzfile
           
       
           })
              .then((res)=>{
             
                 if(res.status === 200){
     
                   let resnew= res.url.split('?')
                   let imgurl= resnew[0]

                  setUploadUrls({
                    ...uploadurls,
                    ['usdzurl'] : imgurl
                  })
   
               document.getElementById('alertdivusdzfile').style.display = 'flex'

          
 
                 }
     
              })
              .catch((err)=>console.log(err))
            
          })
          .catch((err)=>console.log(err))

     
    }


    const uploadGlbFile = async ()=>{
      if(document.getElementById('glbfile').value === ''){
        window.alert('Please select a glb file')
        return
     }

        const url=  uploadfileurl;
        await fetch(url,{
         method: "POST",
         body:  glbfile.name
       
       }).then((res)=>res.json())
          .then((res)=>{
          
         fetch(res.uploadURL, {
             
             method: "PUT",
             headers: {
               "ContentType": "image/jpeg",
             
             },
       
           body: glbfile
           
       
           })
              .then((res)=>{
             
                 if(res.status === 200){
     
                   let resnew= res.url.split('?')
                   let imgurl= resnew[0]

                  setUploadUrls({
                    ...uploadurls,
                    ['glburl'] : imgurl
                  })
   
               document.getElementById('alertdivglbfile').style.display = 'flex'

          
 
                 }
     
              })
              .catch((err)=>console.log(err))
            
          })
          .catch((err)=>console.log(err))

     
    }

    async function getImageDimensions(base64) {
      return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
              resolve({ width: img.width, height: img.height });
          };
          img.onerror = (error) => {
              reject(error);
          };
          img.src = base64;
      });
  }
 

    const fileselectimage = (e)=>{
          
        let val = document.getElementById("imagefile").value;
        let indx = val.lastIndexOf(".") + 1;
        let filetype = val.substr(indx, val.length).toLowerCase();
    
        if (filetype === 'jpeg' || filetype === 'jpg' || filetype === 'png'  ) {


          let files = Array.from(e.target.files);
          files.forEach((file) => {
            fileToBase64(file, async (err, result) => {
              if (result) {

              await getImageDimensions(result).then(res=>{
                  if(res.width !== 600 && res.height !== 600){
                    window.alert('Image should be 600 * 600')
                    return
                  }else{
                    setImageFile(file);
                  }
              })
               
             
              }
            });
    
            const reader = new FileReader();
    
            reader.onload = () => {
              if (reader.readyState === 2) {
             
              }
            };
    
            reader.readAsDataURL(file);
          });
        } else {

            window.alert('Only jpeg jpg png files are allowed')
             document.getElementById("imagefile").value = ''
            
            return
      
        }
    }

    console.log(imagefile)

    const uploadImageFile = async ()=>{
      if(document.getElementById('imagefile').value === ''){
        window.alert('Please select an jpeg,jpg,png file')
        return
     }

        const url=  uploadfileurl;
        await fetch(url,{
         method: "POST",
         body:  imagefile.name
       
       }).then((res)=>res.json())
          .then((res)=>{
          
         fetch(res.uploadURL, {
             
             method: "PUT",
             headers: {
               "ContentType": "image/jpeg",
             
             },
       
           body: imagefile
           
       
           })
              .then((res)=>{
             
                 if(res.status === 200){
     
                   let resnew= res.url.split('?')
                   let imgurl= resnew[0]

                  setUploadUrls({
                    ...uploadurls,
                    ['imageurl'] : imgurl
                  })
   
               document.getElementById('alertdivimagefile').style.display = 'flex'

                 }
     
              })
              .catch((err)=>console.log(err))
            
          })
          .catch((err)=>console.log(err))

     
    }


   

    const handlesubmitdata = async (id)=>{
         if(uploadurls.glburl === '' || uploadurls.imageurl === '' || uploadurls.usdzurl === ''){
            window.alert('please upload all files')
            return
         }else{
            
          const body ={
             Id: id,
             glburl: uploadurls.glburl,
             usdzurl : uploadurls.usdzurl,
             imageurl : uploadurls.imageurl,
             modeluploaddate: new Date().toString()
          }

          const response = await axios.post(uploadallfilesurl, body)
          if(response.status === 200){
            window.alert('Date submitted')
            setUploadUrls({
              glburl : '',
              usdzurl : '',
              imageurl: ''
            })

          }

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
                             <div >
                <Button
             component="label"
      
             role={undefined}
               variant="contained"
              tabIndex={-1}
               startIcon={<CloudUploadIcon />}
              
               >
             Upload Glb file
      <VisuallyHiddenInput type="file"   id= 'glbfile'  onChange={fileselectglb} />
    </Button>

                </div>
                                  <div style={{marginLeft:'5px'}}>
                                  <Button variant='contained'  onClick={()=>uploadGlbFile()} >Upload</Button>
                                  </div>

                                   <div className='alertstatusimage'  id = {`alertdivglbfile`} >
                                   <Alert severity="success" variant='filled' ></Alert>
                                    </div>

                              
     
                             </div>
                             <div style={{marginTop:'10px', display:'flex', width:'100%'}}>

                             <div >
                <Button
             component="label"
             role={undefined}
               variant="contained"
              tabIndex={-1}
               startIcon={<CloudUploadIcon />}
               >
             Upload Usdz file
      <VisuallyHiddenInput type="file" id ='usdzfile' onChange={fileselectusdz} />
    </Button>

                </div>
                     
                                  <div style={{marginLeft:'5px'}}>
                                  <Button variant='contained' onClick={()=>uploadUsdzFile()} >Upload</Button>

                                  </div>
                                  <div className='alertstatusimage' id = {`alertdivusdzfile`} >
                                   <Alert severity="success" variant='filled' ></Alert>
                                    </div>
                                 
     
                             </div>
                             <div style={{marginTop:'10px', display:'flex', width:'100%'}}>

        <div >
<Button
component="label"
role={undefined}
variant="contained"
tabIndex={-1}
startIcon={<CloudUploadIcon />}
>
Upload image
<VisuallyHiddenInput type="file" id='imagefile' onChange={fileselectimage} />
</Button>

</div>

     <div style={{marginLeft:'5px'}}>
     <Button variant='contained' onClick={()=>uploadImageFile()} >Upload</Button>

     </div>
     <div className='alertstatusimage' id = {`alertdivimagefile`} >
      <Alert severity="success" variant='filled' ></Alert>
       </div>
</div>
                          

<div style={{marginTop:'20px', display:'flex', justifyContent:'center', alignItems:'center', width:'100%'}}>
<div >
                                  <Button variant='contained' color='secondary' onClick={()=>handlesubmitdata(item.Id)} >Submit Data</Button>

                                  </div>
      
    </div>
                       
                             <div style={{marginTop:'5px', display:'flex', justifyContent:'start', alignItems:'start', width:'100%'}}>
                                <div className='clientdatadiv1'>
                                <span style={{display:'flex'}}>  <p className='labelclient'> status : </p>  <p style={ item.statusval === 'Models Uploaded' ?   {backgroundColor:"green", color:'white'}: {backgroundColor:'yellow'}}  >{item.statusval}</p></span>

                               </div>
                                 
     
                             </div>
                             <div style={{marginTop:'5px', display:'flex', justifyContent:'start',alignItems:'start', width:'100%'}}>
                                <div className='clientdatadiv1'>
                                <span style={{display:'flex'}}>  <p className='labelclient'>Modeler : </p>  <p >{item.modeler}</p></span>

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

export default Uploadclientmodel
