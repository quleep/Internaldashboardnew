import React, { useEffect, useState } from 'react'
import Papa from 'papaparse';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';
import axios from 'axios';


const Uploadbulk = () => {
    
  const registerUrl= 'https://eh16rizdbi.execute-api.ap-south-1.amazonaws.com/production/productsalldetails';

  const [value, setValue] = useState()
    const [jsonData, setJsonData] = useState([]);
  const [error, setError] = useState(null);
  const [file, setFile] = useState()
  const [filename, setFileName] = useState()
  const [images, setImages] = useState([
      
  ])
  const [imagespreview, setImagesPreview] = useState([])

  const [imageurlarray, setImageUrlArray] = useState([])

  const [finalimageurl, setFinalImageUrl] = useState()

  const uploadbutton = document.getElementById('convert-button')




const handleInputChange =(id, field,value)=>{
  setJsonData((prevFormData) =>
  prevFormData.map((data,i) =>
    i === id ? { ...data, [field]: value } : data
  )
);
}

const handlefilechange = (e)=>{
    let val= document.getElementById('csv-file').value;
    let indx = val.lastIndexOf(".") + 1;
    let filetype = val.substr(indx, val.length).toLowerCase();

    if(filetype != 'csv'){
        window.alert('please select a csv format file')
        return
    }
     const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const contents = e.target.result;

        Papa.parse(contents, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (result) => {
            setJsonData(result.data);
            setError(null);
          },
          error: (error) => {
            setJsonData([]);
            setError(error.message);
          },
        });
      };

      reader.readAsText(file);
    } else {
      setJsonData([]);
      setError('Please select a CSV file.');
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

const addItem = (newItem, id) => {
  
    
    const existingItem = images.findIndex(item => item.id === id);
  
    if (existingItem !== -1) {
        const updatedData = [...images];
        updatedData[existingItem] = {
          ...updatedData[existingItem],
          imagearray: [...updatedData[existingItem].imagearray, newItem],
        }
    } else {
        setImages(oldArray=>[...oldArray,{
            id: id,
            imagearray: [newItem]
          }])
         
    }
  };

const handleImageFileSelect =(e, len)=>{
   
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
    window.alert('please select a jpeg, jpg or png file')
     return
  }


}



const uploadimage= async (e, len)=>{

    if (document.getElementById(`imagefile_${len}`).value === ''){
        window.alert('please select an image file')
        return
    }

  let newarray = images.filter(item=>(
    item.id === len
  ))
   
 
  
let producturl = []

  if(newarray.length > 0){
    for(let i=0; i<newarray[0].imagearray.length;i++){

     
      const url= 'https://g98tqv1tn6.execute-api.ap-south-1.amazonaws.com/default/ImagesUploaderArnxt';
       await fetch(url,{
        method: "POST",
        body: newarray[0].imagearray[i].name
      
      }).then((res)=>res.json())
         .then((res)=>{
         
        fetch(res.uploadURL, {
            
            method: "PUT",
            headers: {
              "ContentType": "image/jpeg",
            
            },
      
          body:  newarray[0].imagearray[i]
          
      
          })
             .then((res)=>{
            
                if(res.status === 200){
    
                  let resnew= res.url.split('?')
                  let imgurl= resnew[0]
   
    
                  producturl.push(imgurl)
                  document.getElementById(`uploadimage_${len}`).style.display = 'block'
                 
                }
    
             })
             .catch((err)=>console.log(err))
           
         })
         .catch((err)=>console.log(err))
       
    }
    setImageUrlArray(oldArray => [...oldArray,{
      id: len,
      imageurl: producturl
    }])

    

  }else{
    window.alert('please select an image')
    return
  }



 
 }
 
 const handleRemoveImage=(val)=>{
    console.log(val)
  setImages((oldArray)=>oldArray.filter(

    
    
    (item)=> 
      item.id === val ?
    item.imagearray.filter((_,index)=> index != val) :''  ) ) 
 }

 console.log(images)


 const userEmail= sessionStorage.getItem('user')
 const emailID= JSON.parse(userEmail)
 let p_id=  emailID && emailID.userid
 

 let lastId = 0;

 function getId(){
   let currentId = new Date().getTime();
   if (lastId == currentId) {
     currentId++;
   }
   lastId = currentId;
   return lastId;
}
console.log(imageurlarray)

const handleSubmitForm = async ()=>{

    if (document.getElementById('csv-file').value  === ''){
        window.alert('please select a csv file')
        return
    }
 
    let count = 0

   for(let i =0; i< jsonData.length; i++){
    
        getId()
    const productdetails= {

  
      product_Id: lastId,
      merchant_Id: p_id,
    
      model_Id: '',
      modelno: jsonData[i].modelno,
      modelrequired: 'false',
      unit: jsonData[i].unit,
      placement: jsonData[i].placement,
      weightunit: jsonData[i].weightunit,
      brand: jsonData[i].brand.toLowerCase(),
      lengthprod: jsonData[i].lengthprod,
      breadthprod: jsonData[i].breadthprod,
      height: jsonData[i].height,
    
      productname: jsonData[i].productname.toLowerCase(),
     
      mrp : Number(jsonData[i].mrp),
      offerprice: Number(jsonData[i].offerprice),
      collection : jsonData[i].collection.toLowerCase(),
      primarymaterial: jsonData[i].primarymaterial,
      roomtype: jsonData[i].roomtype.split(),
      weight: jsonData[i].weight,
      warranty: jsonData[i].warranty,
      sku: jsonData[i].sku,
      discount: Number(jsonData[i].discount),
      colorvalue: jsonData[i].colorvalue.split(),
      tags: jsonData[i].tags.split(),
      category: jsonData[i].category,
      subcategory: jsonData[i].subcategory,
      specification: jsonData[i].specification,
      brandoverview: jsonData[i].specification,
      sellerinfo: jsonData[i].sellerinfo,
      care: jsonData[i].specification,
      imageurl: jsonData[i].imageurl === null ? imageurlarray[i] && imageurlarray[i].imageurl : [jsonData[i].imageurl],
      statusvalue : 'Image uploaded',
      imagerejection: '',
    
      currency: jsonData[i].currency,
      registration_Time: new Date().toString(),
      additional: jsonData[i].additional,
      subcatdetail: jsonData[i].subcatdetails,
      designstyle: jsonData[i].designstyle.toLowerCase()
    
    }

   await axios.post(registerUrl, productdetails).then((res)=>{
    if(res){
       if (res.status === 200){
        count = count+1
         if(count === jsonData.length){
            window.alert('uploaded successfully')
         }
       }
      
       
          }
         

})
    

   }
}
  return (
    <div>
          <div  className='bulkmain'> 
        <div className='filesubmit'>
        <button onClick={handleSubmitForm} style={{width:'120px', height:'50px'}} > Submit</button>
        <input type="file" id="csv-file" accept=".csv" onChange={handlefilechange} />
        </div>
       
       

          <div className='bulkuploaddiv'>
            {
              jsonData && jsonData.map((item, i)=>(
                <div > 
                <div className='bulkuploadfields' >
                  <div>

                      <span   className='bulkinputs'> <p>Productname :</p> <input value={item.productname}  onChange={(e)=> handleInputChange(i, 'productname', e.target.value)} /></span>
                    
                       
                    </div>
                    <div>
                    <span   className='bulkinputs'> <p>Brand :</p> <input value={item.brand} onChange={(e)=> handleInputChange(i, 'brand', e.target.value)} /></span>
                    </div>
                    <div>
                    <span   className='bulkinputs'> <p>Length :</p> <input value={item.lengthprod} onChange={(e)=> handleInputChange(i, 'lengthprod', e.target.value)} /></span>
                    </div>
                    <div>
                    <span   className='bulkinputs'> <p>Breadth :</p> <input value={item.breadthprod} onChange={(e)=> handleInputChange(i, 'breadthprod', e.target.value)} /></span>
                    </div>
                    <div>
                    <span   className='bulkinputs'> <p>Height:</p> <input value={item.height}  onChange={(e)=> handleInputChange(i, 'height', e.target.value)}/></span>
                    </div>
                      
                          <div>
                    <span   className='bulkinputs'> <p>Dimension Unit:</p> <input value={item.unit}  onChange={(e)=> handleInputChange(i, 'unit', e.target.value)}/></span>
                    </div>
                    <div>
                    <span   className='bulkinputs'> <p>MRP:</p> <input value={item.mrp}  onChange={(e)=> handleInputChange(i, 'mrp', e.target.value)}/></span>
                    </div>
                      <div>
                    <span   className='bulkinputs'> <p>Offer Price:</p> <input value={item.offerprice}  onChange={(e)=> handleInputChange(i, 'offerprice', e.target.value)}/></span>
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
                    <span   className='bulkinputs'> <p>Design style:</p> <input value={item.designstyle}  onChange={(e)=> handleInputChange(i, 'designstyle', e.target.value)}/></span>
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
                    <span   className='bulkinputs'> <p>Model No:</p> <input value={item.modelno}  onChange={(e)=> handleInputChange(i, 'modelno', e.target.value)}/></span>
                    </div>
                      <div>
                    <span   className='bulkinputs'> <p>Weight:</p> <input value={item.weight}  onChange={(e)=> handleInputChange(i, 'weight', e.target.value)}/></span>
                    </div>
                      <div>
                    <span   className='bulkinputs'> <p>Weight Unit:</p> <input value={item.weightunit}  onChange={(e)=> handleInputChange(i, 'weightunit', e.target.value)}/></span>
                    </div>
                      <div>
                    <span   className='bulkinputs'> <p>Placement:</p> <input value={item.placement}  onChange={(e)=> handleInputChange(i, 'placement', e.target.value)}/></span>
                    </div>
                      <div>
                    <span   className='bulkinputs'> <p>Room Type:</p> <input value={item.roomtype}  onChange={(e)=> handleInputChange(i, 'roomtype', e.target.value)}/></span>
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
                    <span   className='bulkinputs'> <p>Primary Material:</p> <input value={item.primarymaterial}  onChange={(e)=> handleInputChange(i, 'primarymaterial', e.target.value)}/></span>
                    </div>
                      <div>
                    <span   className='bulkinputs'> <p>Specification:</p> <input value={item.specification}  onChange={(e)=> handleInputChange(i, 'specification', e.target.value)}/></span>
                    </div>
                      <div>
                    <span   className='bulkinputs'> <p>Seller Info:</p> <input value={item.sellerinfo}  onChange={(e)=> handleInputChange(i, 'sellerinfo', e.target.value)}/></span>
                    </div>
                      <div>
                    <span   className='bulkinputs'> <p>Warranty:</p> <input value={item.warranty}  onChange={(e)=> handleInputChange(i, 'warranty', e.target.value)}/></span>
                    </div>
                      <div>
                    <span   className='bulkinputs'> <p>Additional Info:</p> <input value={item.additional}  onChange={(e)=> handleInputChange(i, 'additional', e.target.value)}/></span>
                    </div>

                       {
                        item.imageurl === null ? 
                                       
                        <div  >
                          <div className='tooltipbulkimage'  id= {`imagetooltip_${i}`}>
                             {
                              images && images.map(item=>(

                                item.id === i ?

                                 item.imagearray && item.imagearray.map((it,len)=>(

                                  <div style={{display:'flex', flexDirection:'column'}}>
                                     <img src= {URL.createObjectURL(it)} />
                                       <FaTimes  onClick={()=>handleRemoveImage(len)} style={{alignSelf:'center'}}/>
                                    </div>
                               
                                    
                                
                                
                               
                                 ))
                                 :''
                              
                              ))
                             }
                            </div>
                  
                    <span   className='bulkinputs'>   <input  type='file'  accept= "image/*" multiple id = {`imagefile_${i}`}  onChange={(e)=>handleImageFileSelect(e,i)}  /> <FaCheckCircle  id = {`uploadimage_${i}`} className='checkcirclebutton'/> <button disabled ={item.imageurl === null ? false : true}   onClick={(e)=>uploadimage(e, i)} >Upload Image</button> </span>
                    </div> : 
                           <div>
                           <span   className='bulkinputs'> <p>Image Url:</p> <input value={item.imageurl}  onChange={(e)=> handleInputChange(i, 'imageurl', e.target.value)}/></span>
                           </div>
                       }
                
                       

                  
                     
      

                </div>
             

            </div>
              ))
            }
       

 
            </div>

        </div>
      
      
    </div>
  )
}

export default Uploadbulk
