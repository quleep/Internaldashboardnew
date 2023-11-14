import axios from 'axios';
import React, { useState } from 'react'
import { FaCheckCircle, FaTimes } from 'react-icons/fa';
import QRCode from "react-qr-code";
import * as htmlToImage from 'html-to-image';

const Editproducts = () => {

    const [value, setValue] = useState()
    const [jsonData, setJsonData] = useState([]);
  const [error, setError] = useState(null);
  const [file, setFile] = useState()
  const [filename, setFileName] = useState()
  const [images, setImages] = useState([
      
  ])
  const [imagespreview, setImagesPreview] = useState([])

  const [imageurlarray, setImageUrlArray] = useState([])
  const [glburlfiles, setGlbUrlFiles] = useState([])
  const [usdzurlfiles, setUsdzUrlFiles] = useState([])

  const [finalimageurl, setFinalImageUrl] = useState()
  const [allproductsdata, setAllProductData] = useState()
  const [modeldetails, setModelDetails] = useState()
  const [glbfiles, setGlbFiles] = useState([])
  const [usdzfiles, setUsdzFiles] = useState([])
  const [brandname, setBrandName] = useState('')
  const [productname, setProductName] = useState('')
  const getproducts= 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/getallproducts'
  const getmodels = 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/modeltabledata'
  const urlimagesend= 'https://qt028wy4w7.execute-api.ap-south-1.amazonaws.com/default/ARnxt_models_new'
  const updateproducturl = 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/updateproductdata'
  const branddetailsurl = 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/getbranddetails'
  const searchmodelurl = 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/searchmodel'


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
  const handleInputChange = (id, field,value, modelvalue, modellen)=>{
    setAllProductData((prevFormData) =>
    prevFormData.map((data,i) =>
      i === id ? { ...data, [field]: value } : data
    )
  );

   if(modelvalue === 'modeldata'){

  
    setModelDetails((prevFormData) =>
    prevFormData.map((data,i) =>
      i === modellen ? { ...data, [field]: value } : data
    )
  );
   }

  }
  const addItem = (newItem, id) => {
    const existingItem = images.find(item => item.id === id);
  
    if (existingItem) {
      console.log(`Item with id ${id} already exists.`);
    } else {
      
      setImages(oldArray=>[...oldArray,{
        id: id,
        imagearray: newItem
      }])  
    }
  };
  const addGlb = (newItem, id) => {
    const existingItem = glbfiles.find(item => item.id === id);
  
    if (existingItem) {
      console.log(`Item with id ${id} already exists.`);
    } else {
      
      setGlbFiles(oldArray=>[...oldArray,{
        id: id,
        glbfile: newItem
      }])  
    }
  };

  const addUsdz = (newItem, id)=>{
    const existingItem = usdzfiles.find(item => item.id === id);
  
    if (existingItem) {
      console.log(`Item with id ${id} already exists.`);
    } else {
      
      setUsdzFiles(oldArray=>[...oldArray,{
        id: id,
        usdzfile: newItem
      }])  
    }

  }
 

  const handleRemoveItem = (id)=>{
    let newarray = images.filter(item=>(
       item.id != id 
    ))
    setImages(newarray)
  }

  const handleImageFileSelect = (e, len)=>{
   
    let val= document.getElementById(`imagefile_${len}`).value;

    let indx = val.lastIndexOf(".") + 1;
    let filetype = val.substr(indx, val.length).toLowerCase();
    
    if(filetype === "jpg"  || filetype === "png" || filetype === "jpeg" )
    {
  
   let files = Array.from(e.target.files) 
  
   
   
    
  
   files.forEach(file => {
    fileToBase64(file, (err, result) => {
     
      if (result) {
        setFile(result)
        setFileName(file)

    
        addItem(file, len)
     
   
      }
    })
   
  
    const reader = new FileReader();
  
    reader.onload = () => {
        if (reader.readyState === 2) {

            setImagesPreview(oldArray => [...oldArray, reader.result])
          
            }
         
    }
     
    reader.readAsDataURL(file)
    
  })
  
  
  
    }
  
    else{
       window.alert('please select jpeg, jpg or png file')
       return
    }

  }

  const handleGetProducts = ()=>{
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
  const handleSelectGlb = (e, len)=>{
    let files = Array.from(e.target.files) 

    files.forEach(file => {
     fileToBase64(file, (err, result) => {
       if (result) {
   
         let newval= file.name
         let indx = newval.lastIndexOf(".") + 1;
         let filetype = newval.substr(indx, newval.length).toLowerCase();
   
         if( filetype === 'glb' ){
   
         addGlb(file, len)
           
           
         }
         else{
            window.alert('upload a glb file')
     
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

  const uploadUsdz = async (e, len, modellen)=>{
    let newarray = usdzfiles.filter(item=>(
      item.id === len
    ))
   
  let producturl = []
  
    if(newarray.length > 0){
  
  
       
        const url=  urlimagesend;
         await fetch(url,{
          method: "POST",
          body: newarray[0].usdzfile.name
        
        }).then((res)=>res.json())
           .then((res)=>{
           
          fetch(res.uploadURL, {
              
              method: "PUT",
              headers: {
                "ContentType": "image/jpeg",
              
              },
        
            body:  newarray[0].usdzfile
            
        
            })
               .then((res)=>{
              
                  if(res.status === 200){
      
                    let resnew= res.url.split('?')
                    let imgurl= resnew[0]
     
                    setUsdzUrlFiles(oldArray => [...oldArray,{
                      id: len,
                      usdzurl: imgurl
                    }])
                    handleInputChange(len,'usdz', imgurl, 'modeldata', modellen)
                    document.getElementById(`checkcircleusdz_${len}`).style.display = 'block' 
                    setTimeout(() => {
                    document.getElementById(`checkcircleusdz_${len}`).style.display = 'none' 
                      
                    }, 3000);
                   
                  }
      
               })
               .catch((err)=>console.log(err))
             
           })
           .catch((err)=>console.log(err))
         
      
   
  
    }else{
      window.alert('please select an usdz file')
      return
    }
  

  }

  const uploadGlb = async (e, len, modellen)=>{
    let newarray = glbfiles.filter(item=>(
      item.id === len
    ))
   
  let producturl = []
  
    if(newarray.length > 0){
  
  
       
        const url=  urlimagesend;
         await fetch(url,{
          method: "POST",
          body: newarray[0].glbfile.name
        
        }).then((res)=>res.json())
           .then((res)=>{
           
          fetch(res.uploadURL, {
              
              method: "PUT",
              headers: {
                "ContentType": "image/jpeg",
              
              },
        
            body:  newarray[0].glbfile
            
        
            })
               .then((res)=>{
              
                  if(res.status === 200){
      
                    let resnew= res.url.split('?')
                    let imgurl= resnew[0]
     
                    setGlbUrlFiles(oldArray => [...oldArray,{
                      id: len,
                      glburl: imgurl
                    }])
                    handleInputChange(len,'glb', imgurl, 'modeldata', modellen)
                    document.getElementById(`checkcircleglb_${len}`).style.display = 'block'
                    setTimeout(() => {
                    document.getElementById(`checkcircleglb_${len}`).style.display = 'none'
                      
                    }, 3000);
                   
                  }
      
               })
               .catch((err)=>console.log(err))
             
           })
           .catch((err)=>console.log(err))
         
      
   
  
    }else{
      window.alert('please select an glbfile')
      return
    }
  
  }
  

  
const uploadimage= async (e, len)=>{

  let newarray = images.filter(item=>(
    item.id === len
  ))
 
let producturl = []

  if(newarray.length > 0){


     
      const url= 'https://g98tqv1tn6.execute-api.ap-south-1.amazonaws.com/default/ImagesUploaderArnxt';
       await fetch(url,{
        method: "POST",
        body: newarray[0].imagearray.name
      
      }).then((res)=>res.json())
         .then((res)=>{
         
        fetch(res.uploadURL, {
            
            method: "PUT",
            headers: {
              "ContentType": "image/jpeg",
            
            },
      
          body:  newarray[0].imagearray
          
      
          })
             .then((res)=>{
            
                if(res.status === 200){
    
                  let resnew= res.url.split('?')
                  let imgurl= resnew[0]
   
                  setImageUrlArray(oldArray => [...oldArray,{
                    id: len,
                    imageurl: imgurl
                  }])
                  handleInputChange(len,'imageurl', imgurl)
                  
                 document.getElementById(`checkcircleimage_${len}`).style.display = 'block'
                 setTimeout(() => {
                 document.getElementById(`checkcircleimage_${len}`).style.display = 'none'
                  
                 }, 3000);
                }
    
             })
             .catch((err)=>console.log(err))
           
         })
         .catch((err)=>console.log(err))
       
    
 

  }else{
    window.alert('please select an image file')
    return
  }



 
 }



const handleSelectUsdz = (e,len)=>{
    
 let files = Array.from(e.target.files) 
 files.forEach(file => {
  fileToBase64(file, (err, result) => {

    let newval= file.name
    let indx = newval.lastIndexOf(".") + 1;
    let filetype = newval.substr(indx, newval.length).toLowerCase();
   
    if (result) {
      
      if( filetype === 'usdz' || filetype === 'usdc' || filetype === 'usd'){

        addUsdz(file,len)
        
      }
      else{
      window.alert('please select usdz file')

      
        return
  
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

const handleUpdateClick =(e, len)=>{

  const newproduct = {
      productdetails : allproductsdata[len],
      glburl : document.getElementById(`glbfileurl_${len}`).value,
      usdzurl : document.getElementById(`usdzfileurl_${len}`).value,
      qrcodeurl: document.getElementById(`qrcodeurl_${len}`).value
  }

  axios.post(updateproducturl, newproduct).then(res=>{
    if(res.status === 200){
      document.getElementById(`checkcircleupdatedata_${len}`).style.display = 'block'
      setTimeout(() => {
      document.getElementById(`checkcircleupdatedata_${len}`).style.display = 'none'
        
      }, 3000);
    }
  }).catch(error=>{
    console.log(error)
  })
   

}
const handleBrandClickSubmit = ()=>{
  if(brandname === ''){
    window.alert('please type the brandname')
    return
  }
  const body ={
    brand: brandname
  }

  axios.post(branddetailsurl, body).then(res=>{
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

const handleProductNameSearch = ()=>{

  if(productname === ''){
    window.alert('Please type the product name')
    return
  }
  const body={
    searchdata: productname
  }
  axios.post(searchmodelurl, body).then(res=>{
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

              console.log(imgurl)
              document.getElementById(`qrcodeurl_${len}`).value = imgurl
            
            }

         })
         .catch((err)=>console.log(err))
       
     })
     .catch((err)=>console.log(err))
  


}


const handleQrcodeGeneration = (e,pid, len)=>{
  const qrcodevalue = document.getElementById(`qrvalue_${len}`)
  
  
    htmlToImage.toJpeg(qrcodevalue).then((url)=>{
      
     base64ToImageFile(url, fileName, fileType,len)
    })
  
}

  return (
    <div>
        <div  className='bulkmain'> 
        <div className='filesubmit'>
          <input  placeholder='Brandname' onChange={(e)=>setBrandName(e.target.value)} />
        <button  style={{width:'120px', height:'50px'}} onClick={handleBrandClickSubmit} > Submit</button>
        <input  placeholder='Productname' onChange={(e)=>setProductName(e.target.value)} />
        <button  style={{width:'120px', height:'50px'}} onClick={handleProductNameSearch} > Submit</button>
        <button  style={{width:'120px', height:'50px'}} onClick={handleGetProducts} > Get All products</button>
    
        </div>
     
       
       

          <div className='bulkuploaddiv'>
            {

              allproductsdata && allproductsdata.map((item, i)=>(
                 

                
                <div > 
                <div className='bulkuploadfields' >
                  <div>

                      <span   className='bulkinputs'> <p>Productname:</p> <input value={item.productname}  onChange={(e)=> handleInputChange(i, 'productname', e.target.value)} /></span>
                    
                       
                    </div>
                    <div>
                    <span   className='bulkinputs'> <p>Brand:</p> <input value={item.brand} onChange={(e)=> handleInputChange(i, 'brand', e.target.value)} /></span>
                    </div>
                    <div>
                    <span   className='bulkinputs'> <p>Length:</p> <input value={item.lengthprod} onChange={(e)=> handleInputChange(i, 'lengthprod', e.target.value)} /></span>
                    </div>
                    <div>
                    <span   className='bulkinputs'> <p>Breadth:</p> <input value={item.breadthprod} onChange={(e)=> handleInputChange(i, 'breadthprod', e.target.value)} /></span>
                    </div>
                    <div>
                    <span   className='bulkinputs'> <p>Height:</p> <input value={item.height}  onChange={(e)=> handleInputChange(i, 'height', e.target.value)}/></span>
                    </div>
                      
                          <div>
                    <span   className='bulkinputs'> <p>DimensionUnit:</p> <input value={item.unit}  onChange={(e)=> handleInputChange(i, 'unit', e.target.value)}/></span>
                    </div>
                    <div>
                    <span   className='bulkinputs'> <p>MRP:</p> <input value={item.mrp}  onChange={(e)=> handleInputChange(i, 'mrp', e.target.value)}/></span>
                    </div>
                      <div>
                    <span   className='bulkinputs'> <p>OfferPrice:</p> <input value={item.offerprice}  onChange={(e)=> handleInputChange(i, 'offerprice', e.target.value)}/></span>
                    </div>
                      <div>
                    <span   className='bulkinputs'> <p>Discount:</p> <input value={item.discount}  onChange={(e)=> handleInputChange(i, 'discount', e.target.value)}/></span>
                    </div>
                      <div>
                    <span   className='bulkinputs'> <p>INR:</p> <input value={item.currency}  onChange={(e)=> handleInputChange(i, 'currency', e.target.value)}/></span>
                    </div>
                      <div>
                    <span   className='bulkinputs'> <p>Collection:</p> <input value={item.collection}  onChange={(e)=> handleInputChange(i, 'collection', e.target.value)}/></span>
                    </div>
                      <div>
                    <span   className='bulkinputs'> <p>Designstyle:</p> <input value={item.designstyle}  onChange={(e)=> handleInputChange(i, 'designstyle', e.target.value)}/></span>
                    </div>
                      <div>
                    <span   className='bulkinputs'> <p>Category:</p> <input value={item.category}  onChange={(e)=> handleInputChange(i, 'category', e.target.value)}/></span>
                    </div>
                      <div>
                    <span   className='bulkinputs'> <p>Subcategory:</p> <input value={item.subcategory}  onChange={(e)=> handleInputChange(i, 'subcategory', e.target.value)}/></span>
                    </div>
                      <div>
                    <span   className='bulkinputs'> <p>SubCategoryDetails:</p> <input value={item.subcatdetails}  onChange={(e)=> handleInputChange(i, 'subcatdetails', e.target.value)}/></span>
                    </div>
                      <div>
                    <span   className='bulkinputs'> <p>ModelNo:</p> <input value={item.modelno}  onChange={(e)=> handleInputChange(i, 'modelno', e.target.value)}/></span>
                    </div>
                      <div>
                    <span   className='bulkinputs'> <p>Weight:</p> <input value={item.weight}  onChange={(e)=> handleInputChange(i, 'weight', e.target.value)}/></span>
                    </div>
                      <div>
                    <span   className='bulkinputs'> <p>WeightUnit:</p> <input value={item.weightunit}  onChange={(e)=> handleInputChange(i, 'weightunit', e.target.value)}/></span>
                    </div>
                      <div>
                    <span   className='bulkinputs'> <p>Placement:</p> <input value={item.placement}  onChange={(e)=> handleInputChange(i, 'placement', e.target.value)}/></span>
                    </div>
                      <div>
                    <span   className='bulkinputs'> <p>RoomType:</p> <input value={item.roomtype}  onChange={(e)=> handleInputChange(i, 'roomtype', e.target.value)}/></span>
                    </div>
                      <div>
                    <span   className='bulkinputs'> <p>Tags:</p> <input value={item.tags}  onChange={(e)=> handleInputChange(i, 'tags', e.target.value)}/></span>
                    </div>
                      <div>
                    <span   className='bulkinputs'> <p>Color:</p> <input value={item.colorvalue}  onChange={(e)=> handleInputChange(i, 'colorvalue', e.target.value)}/></span>
                    </div>
                      <div>
                    <span   className='bulkinputs'> <p>SKU:</p> <input value={item.sku}  onChange={(e)=> handleInputChange(i, 'sku', e.target.value)}/></span>
                    </div>
                      <div>
                    <span   className='bulkinputs'> <p>PrimaryMaterial:</p> <input value={item.primarymaterial}  onChange={(e)=> handleInputChange(i, 'primarymaterial', e.target.value)}/></span>
                    </div>
                      <div>
                    <span   className='bulkinputs'> <p>Specification:</p> <input value={item.specification}  onChange={(e)=> handleInputChange(i, 'specification', e.target.value)}/></span>
                    </div>
                      <div>
                    <span   className='bulkinputs'> <p>SellerInfo:</p> <input value={item.sellerinfo}  onChange={(e)=> handleInputChange(i, 'sellerinfo', e.target.value)}/></span>
                    </div>
                      <div>
                    <span   className='bulkinputs'> <p>Warranty:</p> <input value={item.warranty}  onChange={(e)=> handleInputChange(i, 'warranty', e.target.value)}/></span>
                    </div>
                      <div>
                    <span   className='bulkinputs'> <p>AdditionalInfo:</p> <input value={item.additional}  onChange={(e)=> handleInputChange(i, 'additional', e.target.value)}/></span>
                    </div>

                       
                       
                    <div >
                            <span className='bulkinputs'> <img src={item.imageurl}/></span>
                            </div>               
                        <div  >
                          <div className='tooltipbulkimage'  id= {`imagetooltip_${i}`}>
                             {
                              images && images.map(item=>(

                                item.id === i ?

                             

                                  <div style={{display:'flex', flexDirection:'column'}}>
                                     <img src= {URL.createObjectURL(item.imagearray)} />
                                       <FaTimes  style={{alignSelf:'center', cursor:'pointer'}}  onClick={()=>handleRemoveItem(item.id) }/>
                                    </div>
                               
                                 :''
                              
                              ))
                             }
                            </div>
                          
                       
                  
                    <span   className='bulkinputs'>   <input  type='file'  accept= "image"  id = {`imagefile_${i}`}  onChange={(e)=>handleImageFileSelect(e,i)}  /> <button  onClick={(e)=>uploadimage(e, i)} >Upload Image</button>   <FaCheckCircle  className='checkcircleimage' id= {`checkcircleimage_${i}`}/> </span>
                    </div>
                  
                           <div>
                           <span   className='bulkinputs'> <p>ImageUrl:</p> <input value={item.imageurl}  onChange={(e)=> handleInputChange(i, 'imageurl', e.target.value)}/></span>
                           </div>
                       
                         {
                          modeldetails && modeldetails.map((itemmodel,len)=>(
                            item.product_Id === itemmodel.product_Id ?
                            <div>
                            <span   className='bulkinputs'> <p>GlbUrl:</p> <input value={itemmodel.glb} id= {`glbfileurl_${i}`}  onChange={(e)=> handleInputChange(i, 'glburl', e.target.value)}/> <input  type='file'   id = {`glbfile_${i}`}  onChange={(e)=>handleSelectGlb(e,i)}  /> <button onClick={(e)=>uploadGlb(e,i,len)}  >Upload Glb</button>  <FaCheckCircle  className='checkcircleglb' id= {`checkcircleglb_${i}`}/></span>
                            </div>
                            : ''
                          ))
                         }
                         
                       
                         <div  >
                      
                       
                  
                    <span   className='bulkinputs'>    </span>
                    </div>
                    {
                          modeldetails && modeldetails.map((itemmodel,len)=>(
                            item.product_Id === itemmodel.product_Id ?
                            <div>
                            <span   className='bulkinputs'> <p>usdzUrl:</p> <input value={itemmodel.usdz} id= {`usdzfileurl_${i}`}  onChange={(e)=> handleInputChange(i, 'usdzurl', e.target.value)}/>  <input  type='file' id = {`usdzfile_${i}`} onChange={(e)=>handleSelectUsdz(e,i)}   /> <button  onClick={(e)=>uploadUsdz(e,i,len)} >Upload usdz</button>  <FaCheckCircle  className='checkcircleusdz' id= {`checkcircleusdz_${i}`}/> </span>
                            </div>
                            : ''
                          ))
                         }
                         
                       
                         <div  >
                     
                       
                  
                    <span   className='bulkinputs'>  </span>
                    </div>
                    <div>
                    <span   className='bulkinputs'> <p>QRcodeurl:</p> <input value={item.qrcode}  id= {`qrcodeurl_${i}`} />  <button onClick={(e)=>handleQrcodeGeneration(e, item.product_Id, i)} >Save QR code</button>   </span>
                    </div>
                

                    <div>
                    <div  id={`qrvalue_${i}`}  className='qrcodecontainer'>
            <QRCode  size={100}  viewBox='0 0 200 200' value={`arnxt.com/view?id=${item.product_Id}`} />
          </div>
                      </div>
                    <div>
                    <span   className='bulkinputs'> <FaCheckCircle  className='checkcircleupdatedata' id= {`checkcircleupdatedata_${i}`}/> <button onClick={(e)=>handleUpdateClick(e,i)} >Update data</button>   </span>
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

export default Editproducts
