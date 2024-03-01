import React, { useState } from 'react'
import { Container, TextField, Grid, Button, Select, MenuItem, InputLabel, FormControl, styled, Typography, autocompleteClasses } from '@mui/material';
import { FileType, Upload } from 'lucide-react';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import axios from 'axios'
import Alert from '@mui/material/Alert';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const InputFile = styled('input')({
  display: 'none',
});
const Repoupload = () => {


  const user = sessionStorage.getItem('user')
  const emailID = JSON.parse(user);


  const uploadfileurl = 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/uploadfilerepo'
  const registerurl = 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/registercenteralrepoitem'
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [tempglbfile, setTempGlbFile] = useState()
    const [errortext, setErrorText] = useState()
    const [formdata, setFormData] = useState({
      productname : '',
      brandname : '',
      category: '',
      subcategory: '',
      length: '',
      width : '',
      height : '',
      glburl : '',
      usdzurl : '',
      fbxurl : '',
      objurl: '',
      renderimage : '',
      unit : ''
   
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
      if(formdata.category === ''){
        setErrorText('Category is required')
        document.querySelector('.erroralert').style.display = 'flex'
        setTimeout(() => {
        document.querySelector('.erroralert').style.display = 'none'
          
        }, 3000);
        return
      }
      if(formdata.subcategory === ''){
        setErrorText('Sub-category is required')
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
          category: formdata.category.toLowerCase(),
          subcategory : formdata.subcategory.toLowerCase(),
          productlength : formdata.length,
          productwidth : formdata.width,
          productheight : formdata.height,
          glburl : formdata.glburl,
          usdzurl : formdata.usdzurl,
          objurl : formdata.objurl,
          fbxurl : formdata.fbxurl,
          imageurl : formdata.renderimage,
          dimensionunit : formdata.unit,
          uploadedby : emailID?.email,
          uploaddate : new Date().toString()
       }
          try{
            await axios.post(registerurl, body).then(res=>{
               if(res.status === 200){
                 document.querySelector('.alertdiv').style.display = 'flex'
                 setTimeout(() => {
                 document.querySelector('.alertdiv').style.display = 'none'
                  
                 }, 3000);
                setFormData({
                  productname : '',
                  brandname : '',
                  category: '',
                  subcategory: '',
                  length: '',
                  width : '',
                  height : '',
                  glburl : '',
                  usdzurl : '',
                  fbxurl : '',
                  objurl: '',
                  renderimage : '',
                  unit : ''
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
      
        let newres = ''
        let imageres = ''
        let files = Array.from(e.target.files) 
        files.forEach(file => {
         fileToBase64(file, async (err, result) => {

         
           if(type2 !== undefined || type3 !== undefined){
            await checkfiletypeimage(file, type, type2, type3).then(res=>{
              imageres = res
             })
           }
           if (result) {

            
          if(type2 === undefined || type3 === undefined){
            await checktypeglb(file, type).then(res=>{
                if(res){
                  setTempGlbFile(file)
                }else{
                  window.alert(`please select ${type} file`)
       
                  document.getElementById(`${type}file`).value = ''
                   return
                }
             })
          }
          if(type2 !== undefined || type3 !== undefined){
            await checkfiletypeimage(file, type, type2, type3).then(res=>{
                if(res){
                  setTempGlbFile(file)
                }else{
                  window.alert(`please select ${type},${type2}, ${type3} file`)
       
                  document.getElementById(`${type}file`).value = ''
                   return
                }
             })
          }
           
         
            
          }
         })
        
         const reader = new FileReader();
       
         reader.onload = () => {
             if (reader.readyState === 2) {
               }
           
         }
          
         reader.readAsDataURL(file)
         
       })
       
       }
       
   

       const handleuploadfileglb = async (e, type)=>{

        const url=  uploadfileurl;
        await fetch(url,{
         method: "POST",
         body:  tempglbfile.name
       
       }).then((res)=>res.json())
          .then((res)=>{
          
         fetch(res.uploadURL, {
             
             method: "PUT",
             headers: {
               "ContentType": "image/jpeg",
             
             },
       
           body: tempglbfile
           
       
           })
              .then((res)=>{
             
                 if(res.status === 200){
     
                   let resnew= res.url.split('?')
                   let imgurl= resnew[0]
                   setFormData({
                    ...formdata,
                    [type] : imgurl
                   })
              
                setTempGlbFile('')
                  document.querySelector(`.icon${type}`).style.display = 'block'
                  setTimeout(() => {
                  document.querySelector(`.icon${type}`).style.display = 'none'
                    
                  }, 3000);
                  
                 }
     
              })
              .catch((err)=>console.log(err))
            
          })
          .catch((err)=>console.log(err))

       }

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
            <TextField fullWidth label="Category" name = 'category' value={formdata.category} onChange={handleinputchange} variant="outlined" />
          </Grid>
          <Grid item xs={3}>
            <TextField fullWidth label="Sub-category" name = 'subcategory' value={formdata.subcategory} onChange={handleinputchange} variant="outlined" />
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
    
   
        
            < >

            <Grid item xs= {12} style={{ display:'flex'}} >
            <Grid item xs={3} style={{paddingTop:'10px'}}>
             <Typography variant="body2" gutterBottom>
              Please upload a glb file.
            </Typography>
             </Grid>
             <Grid item xs={5}  style={{ display:'flex'}}>
          
          <label htmlFor= 'glbfile' >
            <InputFile  id={`glbfile`} type="file"  onChange={(e)=>handlefileselectglb(e, 'glb')} />
            <Button 
           
              variant="contained" 
              component="span" 
              sx={{ width: '100%' }}>
              Choose File
            </Button>
          </label>
          <Grid item xs={3}>
        <Button 
              onClick={(e)=>handleuploadfileglb(e ,'glburl')}
              variant="contained" 
              component="span" 
              startIcon={<Upload />}
              sx={{ width: '50%' }}>
          
            </Button>
            <DoneAllIcon style={{display:'none'}} className='iconglburl' />
           
        </Grid>
        </Grid>
        <Grid item xs={3} style={{paddingTop:'10px'}} >
             <Typography variant="body2" gutterBottom>
              Please upload a usdz file.
            </Typography>
             </Grid>
             <Grid item xs={5} style={{ display:'flex'}}>
          
          <label htmlFor= 'usdzfile'>
            <InputFile  id={`usdzfile`} type="file"   onChange={(e)=>handlefileselectglb(e, 'usdz')}/>
            <Button 
              variant="contained" 
              component="span" 
              sx={{ width: '100%' }}>
              Choose File
            </Button>
          </label>
          <Grid item xs={3}>
        <Button 
         onClick={(e)=>handleuploadfileglb(e, 'usdzurl')}
              variant="contained" 
              component="span" 
              startIcon={<Upload />}
              sx={{ width: '50%' }}>
          
            </Button>
            <DoneAllIcon style={{display:'none'}} className='iconusdzurl' />

        </Grid>
        </Grid>

            </Grid>
            <Grid item xs= {12} style={{ display:'flex'}}>
            <Grid item xs={3} style={{paddingTop:'10px'}}>
             <Typography variant="body2" gutterBottom>
              Please upload a obj file.
            </Typography>
             </Grid>
             <Grid item xs={5}  style={{ display:'flex'}}>
          
          <label htmlFor= 'objfile'>
            <InputFile  id={`objfile`} type="file"  onChange={(e)=>handlefileselectglb(e, 'obj')}/>
            <Button 
              
              variant="contained" 
              component="span" 
              sx={{ width: '100%' }}>
              Choose File
            </Button>
          </label>
          <Grid item xs={3}>
        <Button 
        onClick={(e)=>handleuploadfileglb(e, 'objurl')}
              variant="contained" 
              component="span" 
              startIcon={<Upload />}
              sx={{ width: '50%' }}>
          
            </Button>
            <DoneAllIcon style={{display:'none'}} className='iconobjurl' />

        </Grid>
        </Grid>
        <Grid item xs={3} style={{paddingTop:'10px'}}>
             <Typography variant="body2" gutterBottom>
              Please upload a fbx file.
            </Typography>
             </Grid>
             <Grid item xs={5} style={{ display:'flex'}}>
          
          <label htmlFor= 'fbxfile'>
            <InputFile  id={`fbxfile`} type="file" onChange={(e)=>handlefileselectglb(e, 'fbx')} />
            <Button 
              variant="contained" 
              component="span" 
              sx={{ width: '100%' }}>
              Choose File
            </Button>
          </label>
          <Grid item xs={3}>
        <Button 
         onClick={(e)=>handleuploadfileglb(e, 'fbxurl')}
              variant="contained" 
              component="span" 
              startIcon={<Upload />}
              sx={{ width: '50%' }}>
          
            </Button>
            <DoneAllIcon style={{display:'none'}} className='iconfbxurl' />

        </Grid>
        </Grid>

            </Grid>
            <Grid item xs= {9} style={{ display:'flex'}}>
            <Grid item xs={3} style={{paddingTop:'10px'}}>
             <Typography variant="body2" gutterBottom>
              Please upload a render image.
            </Typography>
             </Grid>
             <Grid item xs={5}  style={{ display:'flex'}}>
          
          <label htmlFor= 'jpgfile'>
            <InputFile  id={`jpgfile`} type="file" onChange={(e)=>handlefileselectglb(e, 'jpg', 'png' , 'jpeg')} />
            <Button 
              variant="contained" 
              component="span" 
              sx={{ width: '100%' }}>
              Choose File
            </Button>
          </label>
          <Grid item xs={3}>
        <Button 
         onClick={(e)=>handleuploadfileglb(e, 'renderimage')}
              variant="contained" 
              component="span" 
              startIcon={<Upload />}
              
            >
          
            </Button>
            <DoneAllIcon style={{display:'none'}} className='iconrenderimage' />

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
    </Container>
      
    </div>
  )
}

export default Repoupload
