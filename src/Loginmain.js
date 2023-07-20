
import Navbar from './Navbar'
import Divider from './images/divider.svg'
import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { FaCheck, FaTimes } from 'react-icons/fa';
const searchurl= 'https://eh16rizdbi.execute-api.ap-south-1.amazonaws.com/production/fetchurl';
const getdimensionurl= 'https://eh16rizdbi.execute-api.ap-south-1.amazonaws.com/production/fetchdimension';
const uplodanameurl= 'https://eh16rizdbi.execute-api.ap-south-1.amazonaws.com/production/modelername';
const modelernameurl= 'https://eh16rizdbi.execute-api.ap-south-1.amazonaws.com/production/findmodeler';
const fetchmodelerdataurl= 'https://eh16rizdbi.execute-api.ap-south-1.amazonaws.com/production/fetchmodelerdata';
const updatestatuurl= 'https://eh16rizdbi.execute-api.ap-south-1.amazonaws.com/production/updatestatus';

const uploadmodelfbx= 'https://eh16rizdbi.execute-api.ap-south-1.amazonaws.com/production/uploadmodelfbx'

const urlimagesend= 'https://qt028wy4w7.execute-api.ap-south-1.amazonaws.com/default/ARnxt_models_new'
const getmodelfinaldataurl='https://eh16rizdbi.execute-api.ap-south-1.amazonaws.com/production/getfinalmodeldata'
const sendimagestatus= 'https://eh16rizdbi.execute-api.ap-south-1.amazonaws.com/production/imagestatus'

const allmerchantdataurl= 'https://eh16rizdbi.execute-api.ap-south-1.amazonaws.com/production/getallmerchant'
const getallmodelsurl= 'https://eh16rizdbi.execute-api.ap-south-1.amazonaws.com/production/getallmodeldata'
const allmerchantbymodelerurl='https://eh16rizdbi.execute-api.ap-south-1.amazonaws.com/production/allmerchantmodelername'
const getallproducts= 'https://eh16rizdbi.execute-api.ap-south-1.amazonaws.com/production/getallproducts'
const getimagestatus= 'https://eh16rizdbi.execute-api.ap-south-1.amazonaws.com/production/getimagestatus'
const getsinglemodelurl= 'https://eh16rizdbi.execute-api.ap-south-1.amazonaws.com/production/getsingleproduct'
const getsingleimagestatus= 'https://eh16rizdbi.execute-api.ap-south-1.amazonaws.com/production/getsingleimagestatus'
const getproducts= 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/getproducttable'
const getmodels = 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/modeltabledata'
const updatemodelstatus= 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/updatemodelstatus'

const Loginmain = ({history}) => {

 

  


    const [userid, setUserId] = useState('');
    const [modeluploadstatus, setModelUploadStatus] = useState('')
    const [modelrejectreason, setModelRejectReason] = useState('')

    const [admin, setAdmin] = useState(false);

    const [urldata, setUrlData]= useState();
    const [modelrequired, setModelRequired] = useState('')

    const [usermodel, setUserModel] = useState();
    const [dimension, setDimension] = useState(false);
    const [dimdata, setDimData] = useState();
    const [modname, setModName]= useState();
    const [loggeduser, setLoginUser]= useState(false)
    const [assigndate, setAssignDate]= useState();
    const [merchant, setMerchant]= useState();
    const [modelerdata, setModelerData] = useState();
    const [statusvalue, setStatusValue]= useState();
    const [dimensionmatch, setDimensionMatch] = useState(false)
    const [imagerejectreason, setImageRejectReason] = useState('')
    const [allproductdata, setAllProductData] = useState();
    

    const [dim, setDim] = useState();
    const [len, setLen] = useState();

    const [filename, setFileName] = useState();
    const [file, setFile ] = useState();
    const [imagepreview, setImagesPreview] = useState([]);
    const [images, setImages] = useState([]);
    const [message, setMessage] = useState();
    const [fbx, setFbx] = useState();

    const [uploaded, setUploaded] = useState(false);
    const [modelerfinaldata, setModelerFinaldata] = useState()
    const [modelsdata, setModelsData] = useState([])

    const [imgfile, setImgfile] = useState();

    const [imagestatus, setImageStatus] = useState();
    const [allmerchantdata, setAllMerchantData] = useState();
    const [statusall, setStatusAll] = useState([]);
    const [modelalldata, setModelAllData] = useState();
    const [modeldetails, setModelDetails] = useState();

    const [newuserdata, setNewUserData] = useState();
    const [resuserdata, setResUserData] = useState();
    const [fileglb, setFileGlv] = useState();
    const [filegltf, setFileGltf] = useState();
    const [filenewglb, setFileNewglb] = useState();
    const [filenewgltf, setFileNewGltf] = useState();

    const [messagemodel, setMessageModel] = useState();
    const [messageimage, setMessageImage] = useState();
    const [modelerexist, setModelerExist] = useState(false);
    const [datearray, setDateArray] = useState([]);
    const [productsget, setProductsGet] = useState();

    const [modeluploaddata, setModelUploadData] = useState();

    const [allproducts, setAllProducts] = useState();

    const [allimagestatus, setAllImageStatus] = useState();
    const [singlemerchant, setSingleMerchant] = useState();
    const [singleproductdetails, setSingleProductDetails] = useState();

    const [singleimagestatus, setSingleImageStatus] = useState();

    const modelerHandler=(e)=>{
        e.preventDefault();
        if(roleuse === 'modelhead' || roleuse === 'admin'){
            document.getElementById('main1').style.display= 'block'
          

        }
        else{
       
            document.getElementById('warning1').style.display= 'block'
            setTimeout(()=>{
              document.getElementById('warning1').style.display= 'none'
            },[2000])
      
            
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
  
 
const imageQualityHandler = (val, len)=>{
  const imgqualitybody={
    merchantid : Number(userid),
    productid: val,
    statusimage: imagestatus
  }
  axios.post(sendimagestatus, imgqualitybody).then(res=>{
    if(res.status === 201){
      document.getElementById(`${val}_imgstatus_${len}`).innerHTML= 'Submitted successfully'
        setTimeout(()=>{
            document.getElementById(`${val}_imgstatus_${len}`).innerHTML= ''
       
       

      },[2000])
    }
  }).catch(error=>{
    console.log(error)
  })


}


const imagequalitymerchant= (pid,  len)=>{
 
  const imgqualitybody={
  
    productid: pid,
    statusvalue: imagestatus,
    reason : imagerejectreason
  }
  axios.post(sendimagestatus, imgqualitybody).then(res=>{
    console.log(res)
    if(res.status === 200){
      console.log(res)
       document.getElementById(`${pid}_imgstatus_${len}`).innerHTML = 'Submitted successfully'
      setTimeout(()=>{
        document.getElementById(`${pid}_imgstatus_${len}`).innerHTML = ''
       

      },[2000])
    }
  
  }).catch(error=>{
    console.log(error)
  })


}



const img = new Image();

const onChangeimg =(e)=>{


 


    let files = Array.from(e.target.files) 
    files.forEach(file => {
     fileToBase64(file, (err, result) => {
       if (result) {


        let newval= file.name
        let indx = newval.lastIndexOf(".") + 1;
        let filetype = newval.substr(indx, newval.length).toLowerCase();



        img.src =  result;

        img.onload = function() {

          let imgstatus = true;
       const    imgWidth = img.naturalWidth;
       const  imgHeight = img.naturalHeight;


         
        if( filetype === 'jpeg' || filetype === 'png' || filetype === 'jpg' && imgWidth === 600 && imgHeight === 600 ){
         
      
          setImgfile(file)
         
          }
          else{
            document.querySelector('#imagemessage').innerHTML= '.jpg, .jpeg, .png files accepted'
          
            setTimeout(()=>{
            document.querySelector('#imagemessage').innerHTML= ''
  
              
            },[3000])
            setImgfile(null)
            imgstatus = false
      
          }
         

         if (imgWidth !== 600){

          document.querySelector('#imagemessage').innerHTML= 'image width and height should be 600 * 600'
          setImgfile(null)
          
          setTimeout(()=>{
          document.querySelector('#imagemessage').innerHTML= ''

            
          },[3000])
         
           imgstatus = false
        }
              
   
      if (imgHeight !==  600){
        document.querySelector('#imagemessage').innerHTML= 'image width and height should be 600 * 600'
        setImgfile(null)
      
        setTimeout(()=>{
        document.querySelector('#imagemessage').innerHTML= ''

        
          
        },[3000])
       

      
        imgstatus = false
      }
        if(!imgstatus){
          return
        }

        };
  
    
       
      

  
      
       
       
 
        
      
      }
     })
    
   
  
  
     
   
     const reader = new FileReader();
 
     reader.onload = () => {
         if (reader.readyState === 2) {
            
             setImagesPreview(oldArray => [...oldArray, reader.result])
             setImages(oldArray => [...oldArray, file])
         
 
            
             }
        
        
     }
       
 
     
     reader.readAsDataURL(file)
     
 })
 
 
 

 
 
 
 
 
 
 
      
 
   
   

    



  

}


const sendImage =(val, merid, len)=>{
 


  if(imgfile){

     

       
       
  
    fetch(urlimagesend,{
      method:'POST',
      body: imgfile.name
    }).then((res)=>res.json()).then((res)=>{

   fetch(res.uploadURL, {
    method:'PUT',
    headers: {
      "ContentType": "application/json",
    
    },

    body: imgfile
   }).then(res=>  {


    let resnew= res.url.split('?')
    let imgurl= resnew[0]
    
      

      const imgbody={
        merchantid: merid,
        productid: val,
        filetype: 'jpeg',
        imgurl: imgurl
      }
      axios.post(uploadmodelfbx, imgbody).then(res=>{
        if (res.status === 200){
          document.getElementById(`${val}_img_${len}` ).style.display= 'block'
        }
      }).catch(error=>{
        console.log(error)
      })

      

    
     
  
    
   })

    })

  } else{
    setMessage('please select file')
    setTimeout(()=>{
      setMessage('')
    },3000)
  }


}





    
  const onChangefbx = (e) => {
   
    
   let files = Array.from(e.target.files) 
   files.forEach(file => {
    fileToBase64(file, (err, result) => {
      if (result) {

        

      

        let newval= file.name
        let indx = newval.lastIndexOf(".") + 1;
        let filetype = newval.substr(indx, newval.length).toLowerCase();
       
        if(  filetype === 'zip'){
          setFileName(file)
          document.querySelector('#fbxmessage').innerHTML= ''
          }
      else{
        document.querySelector('#fbxmessage').innerHTML= 'upload a zip '
      setTimeout(() => {
        document.querySelector('#fbxmessage').innerHTML= ''

        
      }, [3000]);
        return
        }
  
     
     }
    })


    const reader = new FileReader();

    reader.onload = () => {
        if (reader.readyState === 2) {
           
            setImagesPreview(oldArray => [...oldArray, reader.result])
            setImages(oldArray => [...oldArray, file])
        

           
            }
       
       
    }
      

    
    reader.readAsDataURL(file)
    
})

 
}


const onChangeglb = e => {

   
 let files = Array.from(e.target.files) 

 files.forEach(file => {
  fileToBase64(file, (err, result) => {
    if (result) {

      let newval= file.name
      let indx = newval.lastIndexOf(".") + 1;
      let filetype = newval.substr(indx, newval.length).toLowerCase();

      if( filetype === 'glb' ){

        setFileNewglb(result)
        setFileGlv(file)
     
      }
      else{
       document.querySelector('#glbmessage').innerHTML= 'upload a glb file'
       setTimeout(() => {

       document.querySelector('#glbmessage').innerHTML= ''

        
       }, [3000]);
        return
  
      }
    
    
      
    
    

     
   
   }
  })
 



  

  const reader = new FileReader();

  reader.onload = () => {
      if (reader.readyState === 2) {
         
          setImagesPreview(oldArray => [...oldArray, reader.result])
          setImages(oldArray => [...oldArray, file])
      

         
          }
     
     
  }
    

  
  reader.readAsDataURL(file)
  
})











   


 
 
 
}


  
const onChangegltf = e => {




  
  

     
 let files = Array.from(e.target.files) 
 files.forEach(file => {
  fileToBase64(file, (err, result) => {

    let newval= file.name
    let indx = newval.lastIndexOf(".") + 1;
    let filetype = newval.substr(indx, newval.length).toLowerCase();
   
    if (result) {
      
      if( filetype === 'usdz' || filetype === 'usdc' || filetype === 'usd'){

        setFileNewGltf(result)
        setFileGltf(file)
     
      }
      else{
       document.querySelector('#usdzmessage').innerHTML= 'upload a usdz or usd or usdc file'
       setFileNewGltf(null)
       setFileGltf(null)
       setTimeout(() => {
       document.querySelector('#usdzmessage').innerHTML= ''

        
       }, [3000]);

      
        return
  
      }
    
     
     
    
    

     
   
   }
  })
 



  

  const reader = new FileReader();

  reader.onload = () => {
      if (reader.readyState === 2) {
         
          setImagesPreview(oldArray => [...oldArray, reader.result])
          setImages(oldArray => [...oldArray, file])
      

         
          }
     
     
  }
    

  
  reader.readAsDataURL(file)
  
})











   


 
 
 
}







    const searchHandler=(e)=>{
        e.preventDefault();
            getproduct()


        async function getproduct(){

           const requestBody={
            userid: Number(userid)
        }
         await  axios.post(searchurl, requestBody).then(res=>{
            
           
            setSingleMerchant(res.data)
            
           }).catch(error=>{
            console.log(error)
           })

           const newbody={
            userid: Number(userid)
           }

         await  axios.post(getsinglemodelurl, newbody).then(res=>{
          setSingleProductDetails(res.data)
            
           }).catch(error=>{
            console.log(error)
           })
          const imagebody={
            userid: Number(userid)
          }

           await axios.post(getsingleimagestatus, imagebody).then(res=>{
            setSingleImageStatus(res.data)
            
           }).catch(error=>{
            console.log(error)
           })
    
        
          document.querySelector('.defaultmerchant').style.display= 'block'
          document.querySelector('.allmerchantdata').style.display= 'none'


          document.querySelector('.merquality').style.display= 'block'
          document.querySelector('.allmerchantquality').style.display = 'none'

        


         
          
          
        
         

        }
       

        
}





    const sendfunctionglb=(val,merid,len)=>{
    
  
         
if (fileglb){

         fetch(urlimagesend,{
        method:'POST',
        body: fileglb.name
      }).then((res)=>res.json()).then((res)=>{

     fetch(res.uploadURL, {
      method:'PUT',
      headers: {
        "ContentType": "application/json",
      
      },

      body: fileglb
     }).then(res=>  {


      let resnew= res.url.split('?')
      let imgurl= resnew[0]
      
           

            const reqbody={
              merchantid: merid,
              productid: val,
              imgurl: imgurl,
              filetype: 'glb'
            }
           axios.post(uploadmodelfbx, reqbody).then(res=>{

            if(res.status === 200){
        
              setUploaded(true)
              document.getElementById(`${val}_glb_${len}`).style.display ='block'

            
              
            }
            console.log(res)
           }).catch(error=>{
            console.log(error)
           })

      
     })

      })
    }
    else{
      setMessage('please select file')
      setTimeout(()=>{
        setMessage('')
      },3000)
    }
        

      }
      const sendfunctiongltf=(val,merid,len)=>{
    

         
       if(filegltf){

     

       
       
  
        fetch(urlimagesend,{
          method:'POST',
          body: filegltf.name
        }).then((res)=>res.json()).then((res)=>{
  
       fetch(res.uploadURL, {
        method:'PUT',
        headers: {
          "ContentType": "application/json",
        
        },
  
        body: filegltf
       }).then(res=>  {
  
  
        let resnew= res.url.split('?')
        let imgurl= resnew[0]
        
             const reqbody={
                merchantid: merid,
                productid: val,
                imgurl: imgurl,
                filetype: 'gltf'
              }
             axios.post(uploadmodelfbx, reqbody).then(res=>{

              if(res.status === 200){
              
                setUploaded(true)
                document.getElementById(`${val}_gltf_${len}`).style.display ='block'

               
                
              }
              console.log(res)
             }).catch(error=>{
              console.log(error)
             })
      
        
       })
  
        })

      } else{
        setMessage('please select file')
        setTimeout(()=>{
          setMessage('')
        },3000)
      }
          
  
        }



    const sendfunctionfbx=(val, merid, len)=>{

      console.log(filename)
    
  
         if(filename){

  
        fetch(urlimagesend,{
          method:'POST',
          body: filename.name
        }).then((res)=>res.json()).then((res)=>{
  
       fetch(res.uploadURL, {
        method:'PUT',
        headers: {
          "ContentType": "application/json",
        
        },
  
        body: filename
       }).then(res=>  {
             
        let resnew= res.url.split('?')
        let imgurl= resnew[0]
              const reqbody={
                merchantid: merid,
                productid: val,
                imgurl: imgurl,
                filetype: 'fbx'
              }
             axios.post(uploadmodelfbx, reqbody).then(res=>{
              if(res.status === 200){
              
                setUploaded(true)
                document.getElementById(`${val}_fbx_${len}`).style.display ='block'
                
              }
            
             }).catch(error=>{
              console.log(error)
             })

       })
  
        })
      }
      else{
        setMessage('please select file')
        setTimeout(()=>{
          setMessage('')
        },3000)
      }
          
  
        }


const nameHandler=(val, len)=>{





  
  




  

 
  
      const body={
        merchant_Id: Number(userid),
        product_Id: Number(val),
        modelername: modname,
        modelstatus: ''
      }

   axios.post(uplodanameurl, body).then(res=>{
    console.log(res)
        if(res.status === 200){
          document.getElementById(`${val}_modelstatus_${len}`).innerHTML ='Submitted successfully'
          setTimeout(()=>{
             document.getElementById(`${val}_modelstatus_${len}`).innerHTML =''


          },[2000])
        }
      }).catch(error=>{
        console.log(error)
      })
  
  


  }
 





    let result;
    let newres;
    let length;
    let breadth;
    let height;
    let lenres;
    let breres;
    let heightres;
    let regtime;
    let regres;
    let assigndatefinal;
    let modelernameres;
    let regtimedata;
    let regtimedatares;

  
if(modelerdata){
assigndatefinal=  Object.values(modelerdata.reduce((r, {product_Id,modelername}) => {
  r[product_Id] = r[product_Id] || {product_Id,modelername: []};
  r[product_Id].modelername = r[product_Id].modelername.concat(Array.isArray(modelername) ? product_Id : [modelername]); 
  return r;
  
 
}, {}));

}
if(assigndatefinal){

  modelernameres=  assigndatefinal.map(item=>{
    return item.modelername
  })
}

  
if(modelerdata){
  regtimedata=  Object.values(modelerdata.reduce((r, {product_Id,registration_time}) => {
    r[product_Id] = r[product_Id] || {product_Id,registration_time: []};
    r[product_Id].registration_time = r[product_Id].registration_time.concat(Array.isArray(registration_time) ? product_Id : [registration_time]); 
    return r;
    
   
  }, {}));
  
  }
  if(regtimedata){
  
    regtimedatares=  regtimedata.map(item=>{
      return item.registration_time
    })
  }
  
 

    
    if(urldata){
      regtime=   Object.values(urldata.reduce((r, {product_Id,registration_time}) => {
             r[product_Id] = r[product_Id] || {product_Id,registration_time: []};
             r[product_Id].registration_time = r[product_Id].registration_time.concat(Array.isArray(registration_time) ? product_Id : [registration_time]); 
             return r;
             
            
           }, {}));
 

         
           
     }

  
    

      if(urldata){
         result=   Object.values(urldata.reduce((c, {product_Id,imgurl}) => {
                c[product_Id] = c[product_Id] || {product_Id,imgurl: []};
                c[product_Id].imgurl = c[product_Id].imgurl.concat(Array.isArray(imgurl) ? product_Id : [imgurl]); 
                return c;
                
               
              }, {}));
    

            
              
        }
       

        if(urldata){
          length=   Object.values(urldata.reduce((d, {product_Id,imagelength}) => {
            d[product_Id] = d[product_Id] || {product_Id,imagelength: []};
            d[product_Id].imagelength = d[product_Id].imagelength.concat(Array.isArray(imagelength) ? product_Id : [imagelength]); 
            return d;
            
           
          }, {}));
        }

        if(urldata){
          breadth=   Object.values(urldata.reduce((e, {product_Id,imagebreadth}) => {
            e[product_Id] = e[product_Id] || {product_Id,imagebreadth: []};
            e[product_Id].imagebreadth = e[product_Id].imagebreadth.concat(Array.isArray(imagebreadth) ? product_Id : [imagebreadth]); 
            return e;
            
           
          }, {}));
        }
        if(urldata){
          height=   Object.values(urldata.reduce((f, {product_Id,imageheight}) => {
            f[product_Id] = f[product_Id] || {product_Id,imageheight: []};
            f[product_Id].imageheight = f[product_Id].imageheight.concat(Array.isArray(imageheight) ? product_Id : [imageheight]); 
            return f;
            
           
          }, {}));
        }



      

    if(result){
        
         
         newres= result.map((item,i)=>{
            
        
            return item.imgurl
             
          })

      
            
    }


    let imgresnew;
if (newres){
   imgresnew=  newres.map(item=>{
      return item
  })
}
  
    if(length){
        
         
      lenres= length.map(item=>{
         
          
         return item.imagelength[0]
          
       })
         
 }

 if(regtime){
  regres= regtime.map(item=>{
    return item.registration_time[0]
  })

 }

 if(breadth){
        
         
  breres= breadth.map(item=>{
     
      
     return item.imagebreadth[0]
      
   })
     
}
if(height){
        
         
  heightres= height.map(item=>{
     
      
     return item.imageheight[0]
      
   })
     
}
  
  
 
   let newarr=[]; 
   let arrlatest=[];
  useEffect(()=>{


     
 },[])

  


 const userdata= sessionStorage.getItem('user')
 let useremail= JSON.parse(userdata)
  let loginuser= useremail.email
  let roleuse= useremail.role









  

  const handlemodelsubmit=(pid,len)=>{
      const body={
        productid: Number(pid),
        statusvalue: modeluploadstatus,
        reason: modelrejectreason
      }
      axios.post(updatemodelstatus, body).then(res=>{
        document.getElementById(`${pid}_finalstatus_${len}`).innerHTML= 'Submitted Successfully'
        setTimeout(()=>{
        document.getElementById(`${pid}_finalstatus_${len}`).innerHTML= ''
    
    
        }, [2000])
        console.log(res)
      }).catch(error=>{
        console.log(error)
      })

  }

  const viewproduct =(len)=>{
     document.querySelector(`#viewproduct_${len}`).style.display= 'block'
  }
  const closeproductview=(len)=>{
    document.querySelector(`#viewproduct_${len}`).style.display= 'none'

  }
  const viewproductall =(len)=>{
    document.querySelector(`#viewproductall_${len}`).style.display= 'block'
 }
 const closeproductviewall=(len)=>{
   document.querySelector(`#viewproductall_${len}`).style.display= 'none'

 }

const logoutHandler=(e)=>{
  e.preventDefault();
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('token');
  history.push('/')

}





const statussubmitHandler= (val, len)=>{

  const mbody={
    userid: Number(userid),
    productid: val,
    statusvalue: statusvalue
  }
  axios.post(updatestatuurl, mbody).then(res=>{
   
   if(res.status === 200){
    document.getElementById(`${val}_modelacceptstatus_${len}`).innerHTML = 'Submitted successfully'
    setTimeout(() => {
    document.getElementById(`${val}_modelacceptstatus_${len}`).innerHTML = ''


      
    }, [2000]);

   }
  }).catch(error=>{
    console.log(error)
  })
}



const modelerUploadHandler=(e)=>{
    
    if(roleuse === 'user'){
        document.getElementById('main2').style.display= 'block'
    }
    else{
       
      document.getElementById('warning2').style.display= 'block'
      setTimeout(()=>{
        document.getElementById('warning2').style.display= 'none'
      },[2000])

      
    }
    

}
const qualityHandler=(e)=>{
    e.preventDefault();
    if(roleuse === 'ql' || roleuse === 'admin'){
        document.getElementById('main3').style.display= 'block'
    }
    else{
       
        document.getElementById('warning3').style.display= 'block'
        setTimeout(()=>{
          document.getElementById('warning3').style.display= 'none'
        },[2000])
  
        
      }
      
   


}
let allmerdata;
let finalmerdata;
let lenall;
let breadthall;
let heightall;
let regtimeall;
let merchantdatanew;
let testmerdata;
let newdata;
const allMerchantHandler=()=>{

  document.querySelector('.merquality').style.display= 'none'
  document.querySelector('.allmerchantquality').style.display = 'block'

 
  axios.get(getproducts).then(res=>{
     setAllProductData(res.data)
  }).catch(error=>{
    console.log(error)
  })
  axios.get(getmodels).then(res=>{
    setModelDetails(res.data)
 }).catch(error=>{
   console.log(error)
 })



}



let newmerdata;

let modeliddata;
if(modelalldata){
  newmerdata =Object.values(modelalldata.reduce((r, {merchant_Id,product_Id}) => {
    r[merchant_Id] = r[merchant_Id] || {merchant_Id,product_Id: []};
    r[merchant_Id].product_Id = r[merchant_Id].product_Id.concat(Array.isArray(product_Id) ? merchant_Id : [product_Id]); 
    return r;
    
   
  }, {}));
}




if(allmerchantdata){
  allmerdata=  Object.values(allmerchantdata.reduce((r, {user_Id,product_Id}) => {
    r[user_Id] = r[user_Id] || {user_Id,product_Id: []};
    r[user_Id].product_Id = r[user_Id].product_Id.concat(Array.isArray(product_Id) ? user_Id : [product_Id]); 
    return r;
    
   
  }, {}));



}




if (allmerchantdata){
  merchantdatanew=  Object.values(allmerchantdata.reduce((r, {product_Id,user_Id}) => {
    r[product_Id] = r[product_Id] || {product_Id,user_Id: []};
    r[product_Id].user_Id = r[product_Id].user_Id.concat(Array.isArray(user_Id) ? product_Id : [user_Id]); 
    return r;
    
   
  }, {}));



}





 if(allmerchantdata){

 
finalmerdata=   Object.values(allmerchantdata.reduce((c, {product_Id,imgurl}) => {
  c[product_Id] = c[product_Id] || {product_Id,imgurl: []};
  c[product_Id].imgurl = c[product_Id].imgurl.concat(Array.isArray(imgurl) ? product_Id : [imgurl]); 
  return c;
  
 
}, {}));
 }








function removerepeat(data){
  return [...new Set(data)]
}


let newlenres;
if(lenall){
  newlenres = lenall.map(item=>{
    return item.imagelength[0]
  })
}

if(modelrequired === ''){
  setModelRequired('false')
}


const assignModeler=(uid, pid, len) =>{


  const newbody={
    merchant_Id: Number(uid),
        product_Id: pid,
        modelername: modname,
        modelstatus: imagestatus,
        modelrequired: modelrequired,
        rejectionreason: imagerejectreason 
        }
  axios.post(uplodanameurl, newbody).then(res=>{
    if(res.status === 200){
    document.getElementById(`${pid}_modstatus_${len}`).innerHTML= 'Assigned Successfully'
    setTimeout(()=>{
    document.getElementById(`${pid}_modstatus_${len}`).innerHTML= ''


    }, [2000])
    
    }
  }).catch(error=>{
    console.log(error)
  })
   
}


const merchantallHandler=()=>{


  document.querySelector('.defaultmerchant').style.display= 'none'
  document.querySelector('.allmerchantdata').style.display= 'block'

  
  axios.get(allmerchantdataurl).then(res=>{
   
    setAllMerchantData(res.data)
  }).catch(error=>{
    console.log(error)
  })

  axios.get(getallproducts).then(res=>{
   
    setProductsGet(res.data)
  }).catch(error=>{
    console.log(error)
  })

  axios.get(getallmodelsurl).then(res=>{
    setModelAllData(res.data)
  }).catch(error=>{
    console.log(error)
  })

  axios.get(getimagestatus).then(res=>{
    setAllImageStatus(res.data)
  }).catch(error=>{
    console.log(error)
  })

}


const submitStatus=(pid,uid, len)=>{
  const mbody={
    merchantid: Number(uid),
    productid: pid,
    statusvalue: statusvalue
  }
  axios.post(updatestatuurl, mbody).then(res=>{
    console.log(res)

    if(res.status === 200){

      document.getElementById(`${pid}_modelstatus_${len}`).innerHTML= 'Submitted Successfully'

      setTimeout(() => {
      document.getElementById(`${pid}_modelstatus_${len}`).innerHTML= ''
 
       
      },[2000]);

    }
    
  }).catch(error=>{
    console.log(error)
  })

}

let assignvalue= "Not assigned";
let assginvaluenot = ""


const testarr= [];
console.log(newuserdata)

const userHandler=()=>{




  if(roleuse === 'user' || roleuse === 'admin' ){


  

  

    const emailbody={
      email: loginuser
    }
      axios.post(modelernameurl, emailbody ).then(res=>{
        
      
        document.getElementById('main2').style.display= 'block'
  
    
    setNewUserData(res.data)
    
      
    }).catch(error=>{
      console.log(error)
    })
  

    axios.get(getallmodelsurl).then(res=>{
     
   let modelertest=  res.data.filter(item=>(
      item.modelername === loginuser
     ))
     if(modelertest.length === 0){
      setModelerExist(true)
     }
     
      setModelAllData(res.data)
    }).catch(error=>{
      console.log(error)
    })


    axios.get(getallproducts).then(res=>{
    setAllProducts(res.data)
    }).catch(error=>{
      console.log(error)
    })
  
  }else{
    
    document.getElementById('warning2').style.display= 'block'
    setTimeout(()=>{
      document.getElementById('warning2').style.display= 'none'
    },[2000])
   
  }

 




}
if(modelerexist){
  window.alert('Not Assigned')
}


let resmodeler;


let resmodelerbreadth;
let resmodelerheight;
   
 let resmodelerurl;
 let resmodelertime;




const setuserdetails=(mid,pid)=>{

   const newbody={
    merid: mid
   }
   axios.post(allmerchantbymodelerurl, newbody).then(res=>{
    setResUserData(res.data)

   
   }).then(error=>{
    console.log(error)
   })

}
  if(resuserdata){
    resmodeler= Object.values(resuserdata.reduce((d, {product_Id,imagelength}) => {
      d[product_Id] = d[product_Id] || {product_Id,imagelength: []};
      d[product_Id].imagelength = d[product_Id].imagelength.concat(Array.isArray(imagelength) ? product_Id : [imagelength]); 
      return d;
      
     
    }, {}));
  }

  if(resuserdata){
   resmodelerbreadth= Object.values(resuserdata.reduce((e, {product_Id,imagebreadth}) => {
      e[product_Id] = e[product_Id] || {product_Id,imagebreadth: []};
      e[product_Id].imagebreadth = e[product_Id].imagebreadth.concat(Array.isArray(imagebreadth) ? product_Id : [imagebreadth]); 
      return e;
      
     
    }, {}));
  }

  if(resuserdata){
    resmodelerheight=Object.values(resuserdata.reduce((f, {product_Id,imageheight}) => {
      f[product_Id] = f[product_Id] || {product_Id,imageheight: []};
      f[product_Id].imageheight = f[product_Id].imageheight.concat(Array.isArray(imageheight) ? product_Id : [imageheight]); 
      return f;
      
     
    }, {}));
  

  }

  if(resuserdata){
    resmodelerurl= Object.values(resuserdata.reduce((c, {product_Id,imgurl}) => {
      c[product_Id] = c[product_Id] || {product_Id,imgurl: []};
      c[product_Id].imgurl = c[product_Id].imgurl.concat(Array.isArray(imgurl) ? product_Id : [imgurl]); 
      return c;
      
     
    }, {}));
  }

  if(resuserdata){
    resmodelertime=Object.values(resuserdata.reduce((r, {product_Id,registration_time}) => {
      r[product_Id] = r[product_Id] || {product_Id,registration_time: []};
      r[product_Id].registration_time = r[product_Id].registration_time.concat(Array.isArray(registration_time) ? product_Id : [registration_time]); 
      return r;
      
     
    }, {}));
  
  }





console.log(modelrequired)






  return (
    <div>
    <div>
        <Navbar/>
        <div className="navbar">
      <div>
        <p className=" navoperation" style={{cursor:'pointer'}} >
        <a onClick={modelerHandler}   >Assign Modeler</a>
        </p>
        <div className="alert-box warning1" id='warning1' >Access Denied !</div>
       
      </div>
      <img src={Divider} alt="Your SVG" className="divider-svg" />
      <div >
        <p className="navoperation"  style={{cursor:'pointer'}}><a onClick={userHandler} >Upload Models</a></p>
        <div className="alert-box warning2" id='warning2' >Access Denied !</div>
      </div>
      <img src={Divider} alt="Your SVG" className="divider-svg" />
      <div >
        <p  className="navoperation"  style={{cursor:'pointer'}}><a href=""  onClick={qualityHandler} >Verify Models</a></p>
        <div className="alert-box warning3" id='warning3' >Access Denied !</div>
      </div>
    </div>

  
      
    </div>
    <div className='modmain1' id ='main1' >

      <div  className='allmerchantdata'>

      <div>

    

      <div className='inputdiv' >
                <div className='inputdiv' >
                <input  type='number'  onChange={event=> setUserId(event.target.value)} />


                </div>
                <div className='search'>
                    <button style={{width:'120px', height:'50px', marginTop:'20px'}}
                    onClick={searchHandler}
                    >Search</button>
                </div>
                <div className='search'>
                    <button style={{width:'120px', height:'50px', marginTop:'20px', marginLeft:'40px'}}
                    onClick={allMerchantHandler}
                    >All merchants</button>
                </div>
             

            </div>
            <div className='merchantdatacontainer'>
            {
              allproductdata && allproductdata .map((item,i)=>(

                <div className='merchantdatacontainerinside'>
                <div >
                  <div className='merchantdatadetail' >
                   <div>
                      <label>MerchantId</label>
                      <p>{item.merchant_Id}</p>
                      <label>product_Id</label>
                      <p>{item.product_Id}</p>
                     
                  
                     
                      <label>Image upload date</label>
                      <p>{item.registration_Time.split(' ').slice(0,4).join(' ')}</p>
                      <label>Model upload date</label>
                      {
                        modeldetails && modeldetails.map(itemnew=>(
                         itemnew.product_Id === item.product_Id ?
                         <p>{itemnew.modeluploaddate.split(' ').slice(0,4).join(' ')}</p>: ''
                        ))
                      }

                    </div> 
                   <div>
                    <label>Images</label>
                    <div className='imagesdivmerchant'>
                      {
                        item.imageurl.map(itemnew=>(
                          <div>
                            <img src= {itemnew}/>
                            <a href={itemnew}> Download</a>
                          </div>
                        ))
                          
                      }
                    
                   </div>
                   <div className='viewproductcontainer'>
                    <button type='submit' onClick={()=>viewproduct(i)} >View Product Details</button>
                    </div>
                    <div  id={`viewproduct_${i}`} className='viewproductsdata'>
                      <div className='closeproductview'  onClick={()=>closeproductview(i)}>
                        <FaTimes style={{color:"red", fontSize:'20px', cursor:'pointer'}}/>
                      </div>
                      <div className='productdetailsinside'>
                         <div >
                          <label>Product name</label>
                          <p>{item.productname}</p>
                         </div>
                         <div>
                         <label>Brand</label>

                          <p>{item.brand}</p>
                         </div>
                         <div>
                         <label>Length</label>

                          <p>{item.lengthprod}</p>
                         </div> <div>
                         <label>Breadth</label>

                          <p>{item.breadthprod}</p>
                         </div> 
                         <div>
                            <label>Height</label>

                          <p>{item.height}</p>
                         </div> 
                         <div>
                            <label>Unit</label>

                          <p>{item.unit}</p>
                         </div> 
                         <div>
                            <label>category</label>

                          <p>{item.category}</p>
                         </div> 
                         <div>
                            <label>Sub category</label>

                          <p>{item.subcategory}</p>
                         </div>
                         <div>
                            <label>Subcategory Details</label>

                          <p>{item.subcatdetails}</p>
                         </div>
                         <div>
                            <label>Weight</label>

                          <p>{item.weight}</p>
                         </div>
                         <div>
                            <label>Weight unit</label>

                          <p>{item.weightunit}</p>
                         </div>
                         <div>
                            <label>Tags</label>

                             {
                              item.tags.map(itemnew=>(
                                <p>{itemnew}</p>
                              ))
                             }
                         </div>
                         <div>
                            <label>Color</label>

                             {
                              item.colorvalue.map(itemnew=>(
                                <p>{itemnew}</p>
                              ))
                             }
                         </div>
                         <div>
                            <label>Room type</label>

                             {
                              item.roomtype.map(itemnew=>(
                                <p>{itemnew}</p>
                              ))
                             }
                         </div>
                         <div>
                            <label>Additional</label>

                          <p>{item.additional}</p>
                         </div>
                         <div>
                            <label>Care</label>

                          <p>{item.care}</p>
                         </div>
                         <div>
                            <label>Collection</label>

                          <p>{item.collection}</p>
                         </div>
                         <div>
                            <label>Currency</label>

                          <p>{item.currency}</p>
                         </div>
                         <div>
                            <label>Design style</label>

                          <p>{item.designstyle}</p>
                         </div>
                          <div>
                            <label>Discount</label>

                          <p>{item.discount}</p>
                         </div>
                         <div>
                            <label>Model no</label>

                          <p>{item.modelno}</p>
                         </div>
                         <div>
                            <label>Mrp</label>

                          <p>{item.mrp}</p>
                         </div>
                         <div>
                            <label>Offer price</label>

                          <p>{item.offerprice}</p>
                         </div>
                         <div>
                            <label>Primary material</label>

                          <p>{item.primarymaterial}</p>
                         </div>
                         <div>
                            <label>SKU</label>

                          <p>{item.sku}</p>
                         </div>
                         <div>
                            <label>Seller info</label>

                          <p>{item.sellerinfo}</p>
                         </div>
                         <div>
                            <label>Specification</label>

                          <p>{item.specification}</p>
                         </div>
                          
                          
                          
                          
                          
                          
                     

                         
                        </div>
                    </div>
                    </div>  
                   <div className='updatedatacontainer' >
                     <div className='statustab'>
                     <label>Status</label>
                     <p>{item.statusvalue}</p>
                     </div>
                
                     <div className='statustabthree'>
                      <div className='statustab1'>
                        <div style={{display:'flex', marginLeft:'35px'}}>
                        <label>3D Model required</label>
                          </div>
                     

                      </div>
                      <div className='statustab2'>
                        <div  className='statusinside' >
                        <select onChange={event=>setModelRequired(event.target.value)} >
                      
                         
                      <option value={item.modelrequired} >{item.modelrequired}</option>
                      
   
                  
                    <option value='true' >True</option>
                  
   
   
                 </select>
                          </div>
             
                        </div>
                        <div className='statustab1'>
                          <div style={{display:'flex', marginLeft:'35px'}}>
                          <label>Image quality</label>
                            </div>
                         

                        </div>
                        <div className='statustab2'>
                          <div style={{display:'flex', flexWrap:'wrap', flexDirection:'column'}}>
                          <select onChange={event=>setImageStatus(event.target.value)} >
                     <option></option>
                       <option value='Model in progress' >Accepted</option>
                           <option value='Image rejected'>Rejected</option>
                          </select>

                          <input type='text'  onChange={(e)=>setImageRejectReason(e.target.value)} placeholder='reason if rejected'/>
                          
                            </div>
                     

                          </div>
                          <div className='statustab1'>
                            <div style={{display:'flex', marginLeft:'35px'}}>
                            <label>Assign Modeler</label>
                              </div>
                           

                          </div>
                          <div className='statustab2'>
                            <div style={{display:'flex'}}>
                            <select onChange={event=>setModName(event.target.value)} >
                <option value= ''></option>
                <option value='modeler1@arnxt.com' >modeler1</option>
                <option value='modeler2@arnxt.com' >modeler2</option>

                <option value='modeler3@arnxt.com' >modeler3</option>

                <option value='modeler4@arnxt.com' >modeler4</option>
                <option value='modeler5@arnxt.com' >modeler5</option>
                <option value='modeler6@arnxt.com' >modeler6</option>
                <option value='modeler7@arnxt.com' >modeler7</option>
                <option value='modeler8@arnxt.com' >modeler8</option>
                <option value='modeler9@arnxt.com' >modeler9</option>

              </select>
                              </div>
                          
                            </div>
                        <div className='statustab3'>
                      
                      <button  type='submit'  onClick={()=>assignModeler(item.merchant_Id, item.product_Id,  i)} >Submit</button>
                      <p id={`${item.product_Id}_modstatus_${i}`} style={{color:'green' }}>  </p> 
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

      <div className='defaultmerchant' >
        <div className='homepage' >

            <div className='inputdiv' >
                <div className='inputdiv' >
                <input  type='number'  onChange={event=> setUserId(event.target.value)} />


                </div>
                <div className='search'>
                    <button style={{width:'120px', height:'50px', marginTop:'20px'}}
                    onClick={searchHandler}
                    >Search</button>
                </div>
                <div className='search'>
                    <button style={{width:'120px', height:'50px', marginTop:'20px', marginLeft:'40px'}}
                    onClick={merchantallHandler}
                    >All merchants</button>
                </div>
             

            </div>

            <div>
                           
            </div>

            <div className='urldiv' >
             <div className='urldiv1' >


                <p>merchantid</p>
                <p>{userid} {merchant && merchant} </p>

            
                

             </div>
             <div className='urldiv2'>
                <div>
                    <p  >productid</p>
                </div>
               
                {
                  singlemerchant && singlemerchant.map(item=>(
                    <p>{item.map(it=>(
                      <p>{it.product_Id}</p>
                    ))}</p>
                  ))
                }
               

          
       

             </div>
             <div className='urldiv3'>
                <div>
                    <p>image url</p>
                </div>

                   {
                    singlemerchant && singlemerchant.map(item=>(
                      item.map(it=>(
                        <div style={{margin:'10px', height:'150px', overflow:'scroll'}} >
                          {it.imageurl && it.imageurl.map(itemnew=>(
                            <p><a  style={{fontSize:'10px'}} href={itemnew}>{itemnew}</a></p>
                          ))}
                        </div>
                      ))
                    ))
                     

                   

                        
                    
                      
                       

                       
                  
                   }    
          
         
            </div>

            <div className='urldiv3' >
              <p>images quality</p>
              {
                    singlemerchant &&
                    singlemerchant.map((item,i)=>(
                      item.map((it, j)=>(

                      

                          <p id={i} value={it.product_Id} >
                            <div>
                              {
                                singleimagestatus && singleimagestatus.map(item=>(
                                  it.product_Id === item.product_Id ? 
                                  <p>{item.imagestatus}</p>: <p></p>
                                ))
                              }
                            </div>

                        <select onChange={event=>setImageStatus(event.target.value)} >
                  <option></option>
                <option value='accepted' >Accepted</option>
                <option value='rejected'>Rejected</option>
                </select>
              
                 <button  onClick={()=>imageQualityHandler(it.product_Id,j)}  style={{marginLeft:'20px'}}>submit</button>
                  <p  style={{color:'green'}} id={`${it.product_Id}_imgstatus_${j}`} >  </p> 



                    </p>

                    

                      ))
                      
                  

                

                    ))

                    

                }

            </div>
            <div className='urldiv4'>
              <p>length (inch)</p>
                 <div  className='dimdiv'> 

                 {
                   singlemerchant && singlemerchant.map(item=>(
                    item.map(it=>(
                      <p>{it.lengthprod}</p>
                    ))
                   ))
                 }
                
              

               

                

                 </div>
                

                </div>
                <div className='urldiv5'>
                  <p>breadth (inch)</p>

                  <div  className='dimdiv'> 

                    {
                   singlemerchant && singlemerchant.map(item=>(
                    item.map(it=>(
                      <p>{it.breadthprod}</p>
                    ))
                   ))
                 }
                






</div>
                </div>
                <div className='urldiv6'>
                  <p>height (inch)</p>
                  <div  className='dimdiv'> 

                          {
                   singlemerchant && singlemerchant.map(item=>(
                    item.map(it=>(
                      <p>{it.height}</p>
                    ))
                   ))
                 }
                






                       </div>
                </div>
                <div className='urldiv7'>
                  <p>upload Date(P)</p>
                  {



                      singlemerchant && singlemerchant.map(item=>(
                        item.map(it=>(
                          <p  style={{marginBottom:'50px'}}>{it.registration_Time.split(' ').slice(0,4).join(' ')}</p>

                        ))
                      ))
                  
                  }

                </div>
                <div className='urldiv8'> 
                <p>Modeler</p>


                {
                    singlemerchant &&
                    singlemerchant.map((item,i)=>(
                      item.map((it,j)=>(

                      
                            <p id={i} value={it.product_Id} >

                       <select onChange={event=>setModName(event.target.value)} >
                  <option></option>
                  <option value='modeler1@arnxt.com' >modeler1</option>
                  <option value='modeler2@arnxt.com' >modeler2</option>

                  <option value='modeler3@arnxt.com' >modeler3</option>

                  <option value='modeler4@arnxt.com' >modeler4</option>
                  <option value='modeler5@arnxt.com' >modeler5</option>
                  <option value='modeler6@arnxt.com' >modeler6</option>
                  <option value='modeler7@arnxt.com' >modeler7</option>
                  <option value='modeler8@arnxt.com' >modeler8</option>
                  <option value='modeler9@arnxt.com' >modeler9</option>


                </select>
                <button  onClick={()=>nameHandler(it.product_Id, j)} style={{marginLeft:'20px'}} >Submit</button>

                <div>
                  {
                    singleproductdetails && singleproductdetails.map(item=>(
                     item.map(itemnew=>(
                      itemnew.product_Id === it.product_Id ?
                      <p>{itemnew.modelername}</p>: <p></p>
                     ))
                    ))
                  }
                </div>
                  <p  style={{color:'green'}} id={`${it.product_Id}_modelstatus_${j}`} >  </p> 



                    </p>


                      ))
                    

                

                    ))

                    
                }




                </div>
                <div className='urldiv8'> 
                <p>status</p>
     {              
                  
                  singlemerchant && singlemerchant.map(item=>(
                    item.map(it=>(

                     singleproductdetails && singleproductdetails.map(item=>(
                        item.map(itemnew=>(
                          it.product_Id === itemnew.product_Id ?
                          <p>{itemnew.statusmod}</p> : <p></p>
                        ))
                      ))

                    ))
                  ))

                 
                  }
              


                </div>
             

          
          
            

            


            </div>

        </div>
        </div>


      
    </div>
    <div className='modmain2' id ='main2' >

    <div className=''>

        
      
        
{
  newuserdata && newuserdata.map((item, i)=>(
<div className='userdatanew'>
   
  
  <div  style={{display:'flex', flexDirection:'row', flexWrap:'wrap', margin:'10px'}}>
    <div style={{flex:'1', marginRight:'20px'}} className='merchantbodydiv' >
      <p className='merchanthead' > Merchant Id</p>

      <p className='merchantcell'> {item.merchant_Id}</p>
      
    </div>
   

  
    
 

  <div  style={{flex:'1', paddingRight:'20px', marginRight:'20px'}}  className='merchantbodydiv'>
    
      <div style={{flex:'1'}}>
      <p className='merchanthead'>Product Id</p>
        <div  style={{display:'flex', alignContent:'center', justifyContent:'center', borderBottom:'1px solid green', paddingBottom:'15px'}}>
          
        <p className='merchantcell'> {item.product_Id}</p>
      


        </div>

        <div style={{borderBottom:'1px solid green', paddingBottom:'15px'}}>
        <p  className='merchanthead' >Status</p>

          {

            modelalldata && modelalldata.map(itemnew=>(
               itemnew.product_Id === item.product_Id ?
               <p className='merchantcell'>{itemnew.statusmod ? itemnew.statusmod : 'pending'}</p>:<p></p>


            

            ))
         
                }
        </div>
        <div style={{borderBottom:'1px solid green', paddingBottom:'15px'}} >
          <p  className='merchanthead'>verified date</p>
          {

modelalldata && modelalldata.map(itemnew=>(
itemnew.product_Id === item.product_Id ?
<p className='merchantcell'>{itemnew.verifydate.split(' ').slice(0,4).join(' ')}</p>:<p></p>




))

}


        </div>
       

      </div>
     
    
  </div>

  <div className='dimensioncontainer'  >

  <div >
    <p className='merchanthead'>Length (inch)</p>

    {
      allproducts && allproducts.map(itemnew=>(
         item.product_Id === itemnew.product_Id
         ? 
         <p className='merchantcell'>{itemnew.lengthprod}</p> : <p></p>

      ))
    }
  </div>

  <div  >
    <p className='merchanthead'>Breadth (inch)</p>
  {
      allproducts && allproducts.map(itemnew=>(
         item.product_Id === itemnew.product_Id
         ? 
         <p className='merchantcell'>{itemnew.breadthprod}</p> : <p></p>

      ))
    }

      

  </div>
  <div  >

    <p className='merchanthead'>Height (inch)</p>
  {
      allproducts && allproducts.map(itemnew=>(
         item.product_Id === itemnew.product_Id
         ? 
         <p className='merchantcell'>{itemnew.height}</p> : <p></p>

      ))
    }
  </div>




  </div>



      <div className='imageurlcontainer' >

      <p className='merchanthead'>Image url</p>

     { allproducts && allproducts.map((itemnew )=> (
       item.product_Id === itemnew.product_Id ?
       

        itemnew.imageurl.map((it,k)=>(

         
       
             <div className='previewimage'>
             <img  src= {it}/>
          <button><a href={it}> download  </a></button>
              </div>

        
          
        

        )): <div></div>

      


        
     

     )) 
     
  
     }


       </div>


{
/*

             {
allproducts && allproducts.map((itemnew,k)=>(
<div  className='imageurlbuttondiv' >
{
item.product_Id === itemnew.product_Id ? 
<div  style={{border:'1px solid blue'}} >{itemnew.imageurl.map(it=>(
<button><a href={it}> Image {k+1}  </a>  </button>
))}</div>: <div></div>
}
</div>
))
}


*/
}      






  <div className='merchantbodydiv'  style={{marginRight:'20px'}}>
    <p className='merchanthead'>Assigned On</p>
  {
     modelalldata  && modelalldata.map(itemnew=>(
         item.product_Id === itemnew.product_Id
         ? 
         <p className='merchantcell'>{itemnew.modelassigndate.split(' ').slice(0,4).join(' ')}</p> : <p></p>

      ))
    }



  </div>

  
  <div  style={{flex:'1', marginRight:"20px"}}  className='merchantbodydiv'>
    <div  style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
    <p className='merchanthead'>fbx zip file</p>
    <input type='file' id='b1'  onChange={onChangefbx}  style={{marginBottom:'10px', paddingLeft:'30px'}} />
    <button  value={item.product_Id}  onClick={()=>sendfunctionfbx(item.product_Id, item.merchant_Id, i)}>upload model</button>
    <p id='fbxmessage' style={{color:'red'}} ></p>

    <p style={{color:'green', fontFamily:'Manrope, sanserif'}}  >{filename && filename.name}</p>

  

    {  <span id={`${item.product_Id}_fbx_${i}`}  className='tickmarkfbx' ><FaCheck/></span>  }


    </div>
   
  



  </div>
  <div  style={{flex:'1',marginRight:"20px"}}  className='merchantbodydiv'>

    <div style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}} >
    <p className='merchanthead'>glb file</p>
    <input type='file' id='b2' onChange={onChangeglb} style={{marginBottom:'10px', paddingLeft:'30px'}}  /> 
    <button  value={item.product_Id} onClick={()=>sendfunctionglb(item.product_Id, item.merchant_Id, i)} >upload model</button>
    <p id= 'glbmessage' style={{color:'red'}} ></p>

    <p style={{color:'green', fontFamily:'Manrope, sanserif'}} >{fileglb && fileglb.name}</p>

    {  <span id={`${item.product_Id}_glb_${i}`}  className='tickmarkfbx' ><FaCheck/></span>  }


      </div>
   





        </div>
      <div  style={{flex:'1',marginRight:"20px"}}  className='merchantbodydiv'>

       <div style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}} >
       <p className='merchanthead'>usdz file</p>
    <input type='file' id='b3' onChange={onChangegltf} style={{marginBottom:'10px', paddingLeft:'30px'}}  /> 
    <button  value={item.product_Id} onClick={()=>sendfunctiongltf(item.product_Id, item.merchant_Id, i)} >upload model</button>
    <p id= 'usdzmessage' style={{color:'red'}} ></p>

    <p style={{color:'green', fontFamily:'Manrope, sanserif'}} >{filegltf && filegltf.name}</p>

    {  <span id={`${item.product_Id}_gltf_${i}`}  className='tickmarkfbx' ><FaCheck/></span>  }



        </div>
        





      </div>
      <div  style={{flex:'1',marginRight:"20px"}}  className='merchantbodydiv'>


    <p className='merchanthead'>image upload</p>

     <input type='file' id='imgfile' onChange={onChangeimg}/>




      <p>    <button    className='' id={i} value={item.product_Id}  onClick={()=>sendImage(item.product_Id, item.merchant_Id, i)} >upload image </button>


     </p> 

     <p id='imagemessage' style={{color:'red'}} ></p>
     <p style={{color:'green', fontFamily:'Manrope, sanserif'}} >{imgfile && imgfile.name}</p>

     {  <span id={`${item.product_Id}_img_${i}`}  className='tickmarkfbx' ><FaCheck/></span>  }









</div>






  </div>
 



</div>
))
  }





</div>

   
        <div className='homepage' style={{display:'none'}} >

            <div className='inputdiv' >
              
                <div className='search'>
                    <button style={{width:'120px', height:'50px', marginTop:'20px'}}
                    onClick={userHandler}
                    >Search</button>
                </div>

             
              

            </div>

            <div>
                           
            </div>

            <div className='urldiv' >
             <div className='urldiv1' >
                <p>merchantid</p>
                <p>{userid} {merchant && merchant} </p>

             </div>
             <div className='urldiv2'>
                <div>
                    <p  >productid</p>
                </div>

          
                {
                    result &&
                    result.map((item,i)=>(
                    
                     
                    <div style={{
                     height:'120px', marginBottom:'40px', margin:'10px'}} 
                     
                   id={""} value={""} >{""}

                   <p  style={{marginTop:'30px'}} id={i} value={item.product_Id} >{item.product_Id}</p>
                    </div>

                    ))
                }
          
       

             </div>
             <div className='urldiv3'>
                <div>
                    <p>image url</p>
                </div>
          
                <div  >

{/*
{newres && newres.map((item,i)=>(
<p ><a className='linkimage' href={item[1]} >{item[1]}</a></p>
))}
*/}
<div  >

</div>
<div       >





{



imgresnew && imgresnew.map(item=>(


  
<div style={{height:'120px', marginBottom:'40px', margin:'10px', overflowY:'scroll'}}>
 

  
 
  
  {item.map(it=>(


  <p style={{fontSize:'10px'}} ><a href={it}>{it}</a></p>



  
))

  


  }
 


 </div>

)
)}





</div>

</div>
                   
         
            </div>
            <div className='urldiv4'>
              <p>length (inch)</p>
                 <div  className='dimdiv'> 

                 {
                  lenres && lenres.map(item=>(
                     <p>{item}</p>
                   
                  ))
                 }
                
              

               

                

                 </div>
                

                </div>
                <div className='urldiv5'>
                  <p>breadth (inch)</p>

                  <div  className='dimdiv'> 

                 {
                  breres && breres.map(item=>(
                      <p>{item}</p>
  
                        ))
                      }







</div>
                </div>
                <div className='urldiv6'>
                  <p>height (inch)</p>
                  <div  className='dimdiv'> 

                        {
                        heightres && heightres.map(item=>(
                        <p>{item}</p>
  
                          ))
                         }







                       </div>
                </div>
                <div className='urldiv7'>
                  <p>created date</p>
                  {
                    regres && regres.map(item=>(
                      <p  style={{marginBottom:'50px'}}>{item.split(' ').slice(0,4).join(' ')}</p>
                    ))
                  }

                </div>
          
                <div className='urldiv8'> 
                <p>status</p>
                {
                  modelsdata && modelsdata.map(item=>(
                    <p>{item.statusmod}</p>
                  ))
                }
              
              


                </div>
                <div className='urldiv8'>
                  <p>model (fbx)  </p>

                  <input type='file' id='b1' onChange={onChangefbx} /> 
                  {
                    result &&
                    result.map((item,i)=>(
                    
                   <div className='modelscontainer' >

                     <p>    <button   className='btnuploadmodel' id={i} value={item.product_Id}  onClick={()=>sendfunctionfbx(item.product_Id,i)} >upload file
                 
                 
                 </button>
                 {  <span id={`${item.product_Id}_fbx_${i}`}  className='tickmarkfbx' ><FaCheck/></span>  }
                
              
                </p> 

                   </div> 
                
                   
                     
                    ))
                }

                    <p>{message &&  <p> {message} </p> }</p>
                </div>
                <div className='urldiv8'>
                  <p>model (glb)  </p>
                  <input type='file' id='b2' onChange={onChangeglb} /> 
                  {
                    result &&
                    result.map((item,i)=>(
                    
                    
                 <p>    <button    className='btnuploadmodel' id={i} value={item.product_Id}  onClick={()=>sendfunctionglb(item.product_Id,i)} >upload file</button>
                 
                 {  <span id={`${item.product_Id}_glb_${i}`}  className='tickmarkglb' ><FaCheck/></span>  }
                 </p> 

               

                    ))
                }
                       <p>{message &&  <p> {message} </p> }</p>
                </div>
                <div className='urldiv8'>
                  <p>model (gltf) </p>

                  <input type='file' id='b3' onChange={onChangegltf} /> 
                  {
                    result &&
                    result.map((item,i)=>(
                    
                    
                 <p>    <button  className='btnuploadmodel' id={i} value={item.product_Id }  onClick={()=>sendfunctiongltf(item.product_Id, i)} >upload file </button>
                 
                 {  <span id={`${item.product_Id}_gltf_${i}`}  className='tickmarkgltf' ><FaCheck/></span>  }
                 </p> 

                 

                    ))
                }
                 <p>{message &&  <p> {message} </p> }</p>

                </div>

                <div className='urldiv8'>
                  <p>image upload</p>
                  
                  <input type='file' id='imgfile' onChange={onChangeimg}/>

                  {
                    result &&
                    result.map((item,i)=>(
                    
                    
                 <p>    <button    className='' id={i} value={item.product_Id}  onClick={()=>sendImage(item.product_Id,i)} >upload image </button>
                 
                 {  <span id={`${item.product_Id}_img_${i}`}  className='imagetickmark' ><FaCheck/></span>  }
                 </p> 

               

                    ))
                }

                
                </div>
                <div className='urldiv8'> 
                <p>Verified data</p>

                </div>

          
          
            

            


            </div>

        </div>


      
    </div>
    <div className='modmain3' id='main3' >

    <div  className='allmerchantquality'>
      
    <div className='inputdiv' >
                <div className='inputdiv' >
                <input  type='number'  onChange={event=> setUserId(event.target.value)} />


                </div>
                <div className='search'>
                    <button style={{width:'120px', height:'50px', marginTop:'20px'}}
                    onClick={searchHandler}
                    >Search</button>
                </div>
                <div className='search'>
                    <button style={{width:'120px', height:'50px', marginTop:'20px', marginLeft:'40px'}}
                    onClick={allMerchantHandler}
                    >All Merchant</button>
                </div>
              

            </div>
             <div className='merchantdatacontainer'>
            {
              allproductdata && allproductdata .map((item,i)=>(

                <div className='merchantdatacontainerinside'>
                <div >
                  <div className='merchantdatadetail' >
                   <div>
                      <label>MerchantId</label>
                      <p>{item.merchant_Id}</p>
                      <label>product_Id</label>
                      <p>{item.product_Id}</p>
                      <label>Modelername</label>
                      {
                        modeldetails && modeldetails.map(itemnew=>(
                         itemnew.product_Id === item.product_Id ?
                         <p>{itemnew.modelername}</p>: ''
                        ))
                      }
                     
                      <label>Image upload date</label>
                      <p>{item.registration_Time.split(' ').slice(0,4).join(' ')}</p>
                      <label>Model upload date</label>
                      {
                        modeldetails && modeldetails.map(itemnew=>(
                         itemnew.product_Id === item.product_Id ?
                         <p>{itemnew.modeluploaddate.split(' ').slice(0,4).join(' ')}</p>: ''
                        ))
                      }

                    </div> 
                   <div>
                    <label>Images</label>
                    <div className='imagesdivmerchant'>
                      {
                        item.imageurl.map(itemnew=>(
                          <div>
                            <img src= {itemnew}/>
                            <a href={itemnew}> Download</a>
                          </div>
                        ))
                          
                      }
                    
                   </div>
                   <div className='viewproductcontainer'>
                    <button type='submit' onClick={()=>viewproductall(i)} >View Product Details</button>
                    </div>
                    <div  id={`viewproductall_${i}`} className='viewproductsdata'>
                      <div className='closeproductview'  onClick={()=>closeproductviewall(i)}>
                        <FaTimes style={{color:"red", fontSize:'20px', cursor:'pointer'}}/>
                      </div>
                      <div className='productdetailsinside'>
                         <div >
                          <label>Product name</label>
                          <p>{item.productname}</p>
                         </div>
                         <div >
                          <label>fbx url</label>
                          {
                        modeldetails && modeldetails.map(itemnew=>(
                         itemnew.product_Id === item.product_Id ?
                         <a href= {itemnew.fbx} >{itemnew.fbx}</a>: ''
                        ))
                      }
                         </div>
                         <div >
                          <label>glb url</label>
                          {
                        modeldetails && modeldetails.map(itemnew=>(
                         itemnew.product_Id === item.product_Id ?
                         <a href= {itemnew.glb} >{itemnew.glb}</a>: ''
                        ))
                      }
                         </div>
                         <div >
                          <label>usdzurl</label>
                          {
                        modeldetails && modeldetails.map(itemnew=>(
                         itemnew.product_Id === item.product_Id ?
                         <a href= {itemnew.usdz} >{itemnew.usdz}</a>: ''
                        ))
                      }
                         </div>
                         <div >
                          <label>rendered image</label>
                          {
                        modeldetails && modeldetails.map(itemnew=>(
                         itemnew.product_Id === item.product_Id ?
                         <a href= {itemnew.imgfile} >{itemnew.imgfile}</a>: ''
                        ))
                      }
                         </div>
                         <div>
                         <label>Brand</label>

                          <p>{item.brand}</p>
                         </div>
                         <div>
                         <label>Length</label>

                          <p>{item.lengthprod}</p>
                         </div> <div>
                         <label>Breadth</label>

                          <p>{item.breadthprod}</p>
                         </div> 
                         <div>
                            <label>Height</label>

                          <p>{item.height}</p>
                         </div> 
                         <div>
                            <label>Unit</label>

                          <p>{item.unit}</p>
                         </div> 
                         <div>
                            <label>category</label>

                          <p>{item.category}</p>
                         </div> 
                         <div>
                            <label>Sub category</label>

                          <p>{item.subcategory}</p>
                         </div>
                         <div>
                            <label>Subcategory Details</label>

                          <p>{item.subcatdetails}</p>
                         </div>
                         <div>
                            <label>Weight</label>

                          <p>{item.weight}</p>
                         </div>
                         <div>
                            <label>Weight unit</label>

                          <p>{item.weightunit}</p>
                         </div>
                         <div>
                            <label>Tags</label>

                             {
                              item.tags.map(itemnew=>(
                                <p>{itemnew}</p>
                              ))
                             }
                         </div>
                         <div>
                            <label>Color</label>

                             {
                              item.colorvalue.map(itemnew=>(
                                <p>{itemnew}</p>
                              ))
                             }
                         </div>
                         <div>
                            <label>Room type</label>

                             {
                              item.roomtype.map(itemnew=>(
                                <p>{itemnew}</p>
                              ))
                             }
                         </div>
                         <div>
                            <label>Additional</label>

                          <p>{item.additional}</p>
                         </div>
                         <div>
                            <label>Care</label>

                          <p>{item.care}</p>
                         </div>
                         <div>
                            <label>Collection</label>

                          <p>{item.collection}</p>
                         </div>
                         <div>
                            <label>Currency</label>

                          <p>{item.currency}</p>
                         </div>
                         <div>
                            <label>Design style</label>

                          <p>{item.designstyle}</p>
                         </div>
                          <div>
                            <label>Discount</label>

                          <p>{item.discount}</p>
                         </div>
                         <div>
                            <label>Model no</label>

                          <p>{item.modelno}</p>
                         </div>
                         <div>
                            <label>Mrp</label>

                          <p>{item.mrp}</p>
                         </div>
                         <div>
                            <label>Offer price</label>

                          <p>{item.offerprice}</p>
                         </div>
                         <div>
                            <label>Primary material</label>

                          <p>{item.primarymaterial}</p>
                         </div>
                         <div>
                            <label>SKU</label>

                          <p>{item.sku}</p>
                         </div>
                         <div>
                            <label>Seller info</label>

                          <p>{item.sellerinfo}</p>
                         </div>
                         <div>
                            <label>Specification</label>

                          <p>{item.specification}</p>
                         </div>
                          
                          
                          
                          
                          
                          
                     

                         
                        </div>
                    </div>
                    </div>  
                   <div>
                     <div className='statustab'>
                     <label>Status</label>
                     <p >{item.statusvalue}</p>
                     </div>
                
                     <div className='statustabthree'>
                      <div className='statustab1'>
                      <label>Update Status</label>

                      </div>
                      <div className='statustab2'>
                      <select onChange={(e)=> setModelUploadStatus(e.target.value)} >
                        <option style={{display:'none'}}></option>
                        <option value='Models completed' >Models complete</option>
                        <option value= 'Models rejected'>Reject</option>
                        <option value= 'Product live'>Make product live</option>


                      </select>
                        </div>
                        <div className='statustab3'>
                        <input type='text' onChange={(e)=>setModelRejectReason(e.target.value)} placeholder='reason if rejected'/>
                      <button  type='submit' onClick={()=>handlemodelsubmit(item.product_Id,i)} >Submit</button>
                      <p id={`${item.product_Id}_finalstatus_${i}`} style={{color:'green' }}>  </p> 

                    
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

          <div  className='merquality'>

        <div className='homepage' >

            <div className='inputdiv' >
                <div className='inputdiv' >
                <input  type='number'  onChange={event=> setUserId(event.target.value)} />


                </div>
                <div className='search'>
                    <button style={{width:'120px', height:'50px', marginTop:'20px'}}
                    onClick={searchHandler}
                    >Search</button>
                </div>
                <div className='search'>
                    <button style={{width:'120px', height:'50px', marginTop:'20px', marginLeft:'40px'}}
                    onClick={allMerchantHandler}
                    >All Merchant</button>
                </div>
             

            </div>

            <div>
                           
            </div>

            <div className='urldiv' >
             <div className='urldiv1' >
                <p>merchantid</p>
                <p>{userid} {merchant && merchant} </p>

             </div>
             <div className='urldiv2'>
                <div>
                    <p  >productid</p>
                </div>

            
                 {
                  singlemerchant && singlemerchant.map(item=>(
                    <p>{item.map(it=>(
                      <p>{it.product_Id}</p>
                    ))}</p>
                  ))
                }
               


             </div>
             <div className='urldiv3'style={{overflow:'scroll'}} >
                <div>
                    <p>image url</p>
                </div>
          
                  
                   {
                    singlemerchant && singlemerchant.map(item=>(
                      item.map(it=>(
                        <div style={{margin:'10px', height:'150px', overflow:'scroll'}} >
                          {it.imageurl && it.imageurl.map(itemnew=>(
                            <p><a  style={{fontSize:'10px'}} href={itemnew}>{itemnew}</a></p>
                          ))}
                        </div>
                      ))
                    ))
                     

                   

                        
                    
                      
                       

                       
                  
                   } 
                 
                   
         
            </div>
            <div className='urldiv4'>
              <p>length (inch)</p>
                 <div  className='dimdiv'> 
   {
                   singlemerchant && singlemerchant.map(item=>(
                    item.map(it=>(
                      <p>{it.lengthprod}</p>
                    ))
                   ))
                 }
                
              

               

                

                 </div>
                

                </div>
                <div className='urldiv5'>
                  <p>breadth (inch)</p>

                  <div  className='dimdiv'> 

                  {
                   singlemerchant && singlemerchant.map(item=>(
                    item.map(it=>(
                      <p>{it.breadthprod}</p>
                    ))
                   ))
                 }
                






</div>
                </div>
                <div className='urldiv6'>
                  <p>height (inch)</p>
                  <div  className='dimdiv'> 

                        {
                   singlemerchant && singlemerchant.map(item=>(
                    item.map(it=>(
                      <p>{it.height}</p>
                    ))
                   ))
                 }
                






                       </div>
                </div>
                <div className='urldiv7' >
                  <p>fbx</p>

               {
                  singlemerchant && singlemerchant.map(item=>(
                    item.map(it=>(
                      <div>
                        {
                        singleproductdetails && singleproductdetails.map(item=>(
                            item.map(itemnew=>(
                              it.product_Id === itemnew.product_Id ? 
                              <p style={{fontSize:'6px', paddingBottom:'40px'}}><a href={itemnew.fbx} >{itemnew.fbx}</a></p>: <p></p>
                            ))
                          ))
                        }

                      </div>
                    ))
                  ))
                 
                }
                </div>
                <div className='urldiv7' >
                  <p>glb</p>
                   {
                  singlemerchant && singlemerchant.map(item=>(
                    item.map(it=>(
                      <div>
                        {
                        singleproductdetails && singleproductdetails.map(item=>(
                            item.map(itemnew=>(
                              it.product_Id === itemnew.product_Id ? 
                              <p style={{fontSize:'6px', paddingBottom:'40px'}}><a href={itemnew.glb} >{itemnew.glb}</a></p>: <p></p>
                            ))
                          ))
                        }

                      </div>
                    ))
                  ))
                 
                }
                </div>
                <div className='urldiv7' >
                  <p>gltf</p>

                   {
                  singlemerchant && singlemerchant.map(item=>(
                    item.map(it=>(
                      <div>
                        {
                        singleproductdetails && singleproductdetails.map(item=>(
                            item.map(itemnew=>(
                              it.product_Id === itemnew.product_Id ? 
                              <p style={{fontSize:'6px', paddingBottom:'40px'}}><a href={itemnew.gltf} >{itemnew.gltf}</a></p>: <p></p>
                            ))
                          ))
                        }

                      </div>
                    ))
                  ))
                 
                }
                
                </div>
                <div className='urldiv7' style={{overflow:'scroll'}}>
                  <p>Upload date(P)</p>
                    {



                      singlemerchant && singlemerchant.map(item=>(
                        item.map(it=>(
                          <p  style={{marginBottom:'50px'}}>{it.registration_Time.split(' ').slice(0,4).join(' ')}</p>

                        ))
                      ))
                  
                  }

                </div>
                   <div className='urldiv8'>
                  <p>Assigned date</p>
                     {
                  singlemerchant && singlemerchant.map(item=>(
                    item.map(it=>(
                      <div>
                        {
                        singleproductdetails && singleproductdetails.map(item=>(
                            item.map(itemnew=>(
                              it.product_Id === itemnew.product_Id ? 
                              <p >{itemnew.modelassigndate.split(' ').slice(0,4).join(' ')}</p>: <p></p>
                            ))
                          ))
                        }

                      </div>
                    ))
                  ))
                 
                }

  
                </div>
                <div className='urldiv8'>
                  <p>Upload date(M)</p>
                     {
                  singlemerchant && singlemerchant.map(item=>(
                    item.map(it=>(
                      <div>
                        {
                        singleproductdetails && singleproductdetails.map(item=>(
                            item.map(itemnew=>(
                              it.product_Id === itemnew.product_Id ? 
                              <p >{itemnew.modeluploaddate.split(' ').slice(0,4).join(' ')}</p>: <p></p>
                            ))
                          ))
                        }

                      </div>
                    ))
                  ))
                 
                }

  
                </div>
                <div className='urldiv8'> 
                <p>Modeler</p>

                      {
                  singlemerchant && singlemerchant.map(item=>(
                    item.map(it=>(
                      <div>
                        {
                        singleproductdetails && singleproductdetails.map(item=>(
                            item.map(itemnew=>(
                              it.product_Id === itemnew.product_Id ? 
                              <p >{itemnew.modelername}</p>: <p></p>
                            ))
                          ))
                        }

                      </div>
                    ))
                  ))
                 
                }
               
            

                </div>
                <div className='urldiv8'> 
                <p>status</p>

                          {
                    singlemerchant &&
                    singlemerchant.map((item,i)=>(
                      item.map((it, j)=>(

                      

                          <p id={i} value={it.product_Id} >
                            <div>
                              {
                                singleproductdetails && singleproductdetails.map(item=>(
                                item.map(itemnew=>(
                                  it.product_Id === itemnew.product_Id ?
                                  <p>{itemnew.statusmod}</p>:<p></p>
                                ))
                                ))
                              }
                            </div>

                        <select onChange={event=>setStatusValue(event.target.value)} >
                  <option></option>
                <option value='accepted' >Accepted</option>
                <option value='rejected'>Rejected</option>
                </select>
              
                 <button  onClick={()=>statussubmitHandler(it.product_Id,j)}  style={{marginLeft:'20px'}}>submit</button>
                  <p  style={{color:'green'}} id={`${it.product_Id}_modelacceptstatus_${j}`} >  </p> 



                    </p>

                    

                      ))
                      
                  

                

                    ))

                    

                }




             

              

                </div>
                <div className='urldiv8'> 
                <p>Verified date</p>

                  {
                  singlemerchant && singlemerchant.map(item=>(
                    item.map(it=>(
                      <div>
                        {
                        singleproductdetails && singleproductdetails.map(item=>(
                            item.map(itemnew=>(
                              it.product_Id === itemnew.product_Id ? 
                              <p >{itemnew.verifydate.split(' ').slice(0,4).join(' ')}</p>: <p></p>
                            ))
                          ))
                        }

                      </div>
                    ))
                  ))
                 
                }

                </div>

          
          
            

            


            </div>

        </div>
        </div>


      
    </div>

    
    </div>
  )
}




   
    

  
                



 





export default Loginmain
