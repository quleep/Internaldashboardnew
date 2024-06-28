import React, { useState } from 'react'
import { Container, TextField, Grid, Button, Select, MenuItem, InputLabel, FormControl, styled, Typography, autocompleteClasses } from '@mui/material';
import { FileType, Upload } from 'lucide-react';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import axios from 'axios'
import Alert from '@mui/material/Alert';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { FaCross, FaTimes } from 'react-icons/fa';

const InputFile = styled('input')({
  display: 'none',
});

const Uploadclient = () => {

    const user = sessionStorage.getItem('user')
    const emailID = JSON.parse(user);
  
  
    const uploadfileurl = 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/uploadfilerepo'
    const registerurl = 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/clientimagesupload'
    const deleteitemurl = 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/deletecenteralrepoitem'
      const [category, setCategory] = useState('');
      const [subcategory, setSubcategory] = useState('');
      const [tempglbfile, setTempGlbFile] = useState()
      const [errortext, setErrorText] = useState()
      const [uploadeditem, setUploadedItem] = useState()
      const [images, setImages] = useState([]);
  const [imagepreview, setImagesPreview] = useState([]);
  const [file, setFile] = useState()
  const [filename, setFileName] = useState()
      const [formdata, setFormData] = useState({
        productname : '',
        brandname : '',
      
        length: '',
        width : '',
        height : '',
        images : [],
        unit : '',
        pageurl: ''
     
      })
  
      const handleinputchange = (e)=>{
            const {name, value} = e.target;
            setFormData({
              ...formdata,
              [name] : value
            })
      }
      console.log(formdata)
    
      const handleCategoryChange = (event) => {
        setCategory(event.target.value);
      };
    
      const handleSubcategoryChange = (event) => {
        setSubcategory(event.target.value);
      };
    
  
      const handleformsubmit = async (e)=>{
      
        e.preventDefault()
  
        if(formdata.productname === ''){
          setErrorText('Product name is required')
          document.querySelector('.erroralert').style.display = 'flex'
          setTimeout(() => {
          document.querySelector('.erroralert').style.display = 'none'
            
          }, 3000);
          return
        }
        if(formdata.brandname === ''){
          setErrorText('Brand name is required')
          document.querySelector('.erroralert').style.display = 'flex'
          setTimeout(() => {
          document.querySelector('.erroralert').style.display = 'none'
            
          }, 3000);
          return
        }

        document.querySelector('.loadingbox').style.display = 'flex'
  
         const body = {
            Id : new Date().getTime().toString(),
            productname : formdata.productname.toLowerCase(),
            brandname : formdata.brandname.toLowerCase(),
            productpageurl: formdata.pageurl,
            productlength : formdata.length,
            productwidth : formdata.width,
            productheight : formdata.height,
            images : formdata.images,
            dimensionunit : formdata.unit.toLowerCase(),
            statusval: 'Images Uploaded',
            uploadedby : emailID?.email,
            uploaddate : new Date().toString()
         }
            try{
              await axios.post(registerurl, body).then(res=>{
                 if(res.status === 200){
                  setUploadedItem(res.data.Item)
                 
                   document.querySelector('.alertdiv').style.display = 'flex'
                   setTimeout(() => {
                   document.querySelector('.alertdiv').style.display = 'none'
                    
                   }, 3000);
  
               
                  setFormData({
                    productname : '',
                    brandname : '',
                    length: '',
                    width : '',
                    height : '',
                     images: [],
                    unit : '',
                    pageurl: ''
                  })
  
                 }
        document.querySelector('.loadingbox').style.display = 'none'
  
                 
              }).catch(error=>{
                console.log(error)
        document.querySelector('.loadingbox').style.display = 'none'
  
              })
            }catch(error){
              console.log(error)
        document.querySelector('.loadingbox').style.display = 'none'
  
            }
           
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
  
        async function  checktypeglb(filename , type){
          let newval= filename.name
          let indx = newval.lastIndexOf(".") + 1;
          let filetype = newval.substr(indx, newval.length).toLowerCase();
          if(filetype === type){
            return true
          }
          else{
            return false
          }
        }
        async function checkfiletypeimage(filename, type1, type2, type3){
          let newval= filename.name
          let indx = newval.lastIndexOf(".") + 1;
          let filetype = newval.substr(indx, newval.length).toLowerCase();
          if(filetype === type1 || filetype === type2 || filetype === type3){
            return true
          }
          else{
            return false
          }
  
        }
  
        const handlefileselectglb = async (e,type, type2, type3)=>{
        
            let val = document.getElementById("glbfile").value;
            let indx = val.lastIndexOf(".") + 1;
            let filetype = val.substr(indx, val.length).toLowerCase();
        
            if (filetype === "jpg" || filetype === "png" || filetype === "jpeg") {
              let files = Array.from(e.target.files);
              files.forEach((file) => {
                fileToBase64(file, (err, result) => {
                  if (result) {
                    setFile(result);
                    setFileName(file);
                  }
                });
        
                const reader = new FileReader();
        
                reader.onload = () => {
                  if (reader.readyState === 2) {
                    setImagesPreview((oldArray) => [...oldArray, reader.result]);
                    setImages((oldArray) => [...oldArray, file]);
                  }
                };
        
                reader.readAsDataURL(file);
              });
            } else {
          
            }
         
         }
         
     
  
         const handleuploadfileglb = async (e)=>{

            let temparray = []
              
          {

           for(let img of images){

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
                      
                   document.querySelector('.alertdivimage').style.display = 'flex'

                   setTimeout(() => {
                   document.querySelector('.alertdivimage').style.display = 'none'
                    
                   }, 3000);

                       setImages([])
                     

                      
                     }
         
                  })
                  .catch((err)=>console.log(err))
                
              })
              .catch((err)=>console.log(err))

           }
          }

            setFormData({
                ...formdata,
                 images : temparray
            })
         
  
         }

  
         const handledeleteitem = async (idvalue)=>{
            const body = {
              id: idvalue
            }
            try{
              await axios.post(deleteitemurl, body).then(res=>{
                 if(res.status === 200){
                  window.alert('Item deleted')
                 }
                 document.querySelector('.uploadedmodal').style.display = 'none'
  
              }).catch(error=>{
                console.log(error)
              })
            }catch(error){
               console.log(error)
            }
         }
         const handlecloseuploadedmodel = ()=>{
             document.querySelector('.uploadedmodal').style.display ='none'
         }

         const removeImage = (val) => {
            setImages((oldArray) => oldArray.filter((item) => item !== val));
          };


  return (
    <div className='uploadrepomain'>
       
    <Container maxWidth="md" >
    <Grid container display={'none'}  position={'absolute'} marginTop={'20px'} left={'0'} top={'0'} xs= {8} className='erroralert'  alignContent={'center'} justifyContent={'center'}>
     <Alert severity="error" variant='filled' > {errortext}</Alert>
     </Grid>
 <form  autoComplete="off">
   <Grid container spacing={3} alignItems="center">
     <Grid item xs={3}>
       <TextField fullWidth label="Product name" value={formdata.productname} name='productname' onChange={handleinputchange} variant="outlined" />
     </Grid>
     <Grid item xs={3}>
       <TextField fullWidth label="Brand name" value={formdata.brandname} name = 'brandname' onChange={handleinputchange} variant="outlined" />
     </Grid>
     <Grid item xs={3}>
       <TextField fullWidth label="Length" type='number' name='length' value={formdata.length} onChange={handleinputchange} variant="outlined" />
     </Grid>
     <Grid item xs={3}>
       <TextField fullWidth label="Width" type='number' name = 'width' value={formdata.width} onChange={handleinputchange} variant="outlined" />
     </Grid>
     <Grid item xs={3}>
       <TextField fullWidth label="Height" type='number' name = 'height' value={formdata.height} onChange={handleinputchange} variant="outlined" />
     </Grid>
     <Grid item xs={3}>
       <TextField fullWidth label="Unit" type='text' name = 'unit' value={formdata.unit} onChange={handleinputchange} variant="outlined" />
     </Grid>
     <Grid item xs={3}>
       <TextField fullWidth label="Product page url" type='text' name = 'pageurl' value={formdata.pageurl} onChange={handleinputchange} variant="outlined" />
     </Grid>

       < >

       <Grid item xs= {12} style={{ display:'flex'}} >
       <Grid item xs={3} style={{paddingTop:'10px'}}>
        <Typography variant="body2" gutterBottom>
         Please upload the image files
       </Typography>
        </Grid>
        <Grid item xs={5}  style={{ display:'flex'}}>
     
     <label htmlFor= 'glbfile' >
       <InputFile  id={`glbfile`} type="file"  multiple  onChange={(e)=>handlefileselectglb(e, 'image')} />
       <Button 
      
         variant="contained" 
         component="span" 
         sx={{ width: '100%' }}>
         Choose File
       </Button>
     </label>
     <Grid item xs={3}>
   <Button 
         onClick={(e)=>handleuploadfileglb(e ,'glburl', 'image')}
         variant="contained" 
         component="span" 
         startIcon={<Upload />}
         sx={{ width: '50%' }}>
     
       </Button>
       <DoneAllIcon style={{display:'none'}} className='iconglburl' />

     
      
   </Grid>
   </Grid>
  
       </Grid>
 
      
       </>
   
   </Grid>
   <Grid item xs={12}  style={{ display:'flex', justifyContent:'center', alignItems:'center', marginTop:"60px"}}>
     
  
     <Button 
       type='submit'
       onClick={handleformsubmit}
       variant="contained" 
       component="span" 
       sx={{ width: '50%' }}>
      Submit
      <Box sx={{ display: 'none' }} className = 'loadingbox'>
    <CircularProgress  style={{color:'white', marginLeft:'10px'}}  size={20} />
         </Box>
     </Button>
   
  

 </Grid>
 </form>
 <Grid container display={'none'} xs= {12} marginTop={'20px'} className='alertdiv' alignContent={'center'} justifyContent={'center'}>
     <Alert severity="success" variant='filled' > Data Uploaded</Alert>
     </Grid>
     <Grid container display={'none'} xs= {12} marginTop={'20px'} className='alertdivimage' alignContent={'center'} justifyContent={'center'}>
     <Alert severity="success" variant='filled' > Images uploaded</Alert>
     </Grid>
</Container>

  <Container>
      <Grid width={'1000px'} overflow={'scroll'} height={'300px'}  display={'flex'} marginTop={'20px'} flexWrap={'wrap'} flexDirection={'column'} > 
        {
            images && images.map(img=>(
                 <div style={{display:'flex', flexDirection:'row-reverse'}} > 

                         <FaTimes onClick={() => removeImage(img)} style={{fontSize:'15px', cursor:'pointer'}}/>
                              <img
                src={URL.createObjectURL(img)}
                key={img}
                alt="image preview"
                style={{
                  width: "250px",
                  height: " 250px",
                  marginRight: "",
                  borderRadius: "10px",
                }}
              />

                 </div>  
      

            ))
        }

         <img/>

      </Grid>
  </Container>


 
</div>
  )
}

export default Uploadclient
