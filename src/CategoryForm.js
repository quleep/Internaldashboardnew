import React, { useState } from 'react'
import Navbar from './Navbar'
import { RxCross2 } from 'react-icons/rx';
import axios from 'axios';
import { FaCheck } from 'react-icons/fa';
const categoryuploadurl = 'https://eh16rizdbi.execute-api.ap-south-1.amazonaws.com/production/addcategoryandsubcategory'
const updatesubcaturl= 'https://eh16rizdbi.execute-api.ap-south-1.amazonaws.com/production/updatesubcategory'
const designstyleurl= 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/adddesigndata'
const addtagsurl= 'https://eh16rizdbi.execute-api.ap-south-1.amazonaws.com/production/addtags'
const addcolorurl= 'https://eh16rizdbi.execute-api.ap-south-1.amazonaws.com/production/addcolor'
const addcollectionurl= 'https://eh16rizdbi.execute-api.ap-south-1.amazonaws.com/production/addcollection'
const addroomtypeurl= 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/addroomtype'
const addcategoryimageurl = 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/addcategoryimage'
const uploadfileurl= 'https://6wxwjxwnyc.execute-api.ap-south-1.amazonaws.com/default/arnxt_products_category_functions'
const addsubcatdetails= 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/addsubcatdetail'



const CategoryForm = () => {

    const [roomtypetag, setRoomTypeTag] = useState([])
    const [roomtypetext, setRoomTypeText] = useState('')
    const [roomtypereRender, setRoomTypeReRender] = useState(false)

    const [updatecategorytag, setUpdateCategoryTag] = useState([])
    const [updatecategorytext, setUpdateCategoryText] = useState('')
    const [updatecategoryreRender, setupdateCategoryreRender] = useState(false)


    const [colortag, setColorTag] = useState([])
    const [color, setColor] = useState('')
    const [categoryimage, setCategoryImage] = useState()

    const [colorreRender, setColorreRender] = useState(false)

    

    const [category, setCategory] = useState()
    const [updatecategory, setUpdateCategory] = useState()

    const[designstyle, setDesginStyle] = useState('')
    const [designstylearray, setDesignStyleArray] = useState([])
    const [desginstylereRender, setDesignStylereRender] = useState(false)

    const [tags, setTags] = useState('')
    const [tagsarray, setTagsArray] = useState([])
    const [tagsreRender, setTagsreRender] = useState(false)


    const [collection, setCollection] = useState('')
    const [collectionarray, setCollectionArray] = useState([])
    const [collectionreRender, setCollectionreRender] = useState(false)

    const [rooms, setRooms] = useState('')
    const [roomsarray, setRoomsArray] = useState([])
    const [roomsreRender, setRoomsreRender] = useState(false)
    const [roomdata, setRoomData] = useState('')

    const [categoryname, setCategoryName] = useState()
    const [subcategoryname, setSubCategoryName] = useState();
 const [serviceList, setServiceList] = useState([{ itemname: "", itemvalue:''}]);
 const [subcategorylist, setSubCategoryList] = useState([{ itemname: "", itemvalue:''}]);

  let lastId;

 function getId(){
    let currentId = new Date().getTime();
    if (lastId == currentId) {
      currentId++;
    }
    lastId = currentId;
    return lastId;
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


    const  roomRender = () => {
        setRoomsreRender(!roomsreRender)
    }
   
    const handleRoomsAdd = (e) => {
        roomRender()
        if (e.key === 'Enter') {
            setRooms('')
            if (rooms !== '') {
                setRoomsArray([...roomsarray, rooms])
            }
            else {
                console.log('empty')
            }
        }
    }
    const handleDeleteRoom = (index) => {
        roomRender()
        roomsarray.splice(index, 1)
    }




    const collectionTagreRender = () => {
        setCollectionreRender(!collectionreRender)
    }
   
    const handleCollectionTag = (e) => {
        collectionTagreRender()
        if (e.key === 'Enter') {
            setCollection('')
            if (collection !== '') {
                setCollectionArray([...collectionarray, collection])
            }
            else {
                console.log('empty')
            }
        }
    }
    const handleDeleteCollectionTags = (index) => {
        collectionTagreRender()
        collectionarray.splice(index, 1)
    }





    const colorTagreRender = () => {
        setColorreRender(!colorreRender)
    }
   
    const handleColorTags = (e) => {
        colorTagreRender()
        if (e.key === 'Enter') {
            setColor('')
            if (color !== '') {
                setColorTag([...colortag, color])
            }
            else {
                console.log('empty')
            }
        }
    }
    const handleDeleteColorTags = (index) => {
        colorTagreRender()
        colortag.splice(index, 1)
    }










    const tagReRender = () => {
        setTagsreRender(!tagsreRender)
    }
   
    const handleTags = (e) => {
        tagReRender()
        if (e.key === 'Enter') {
            setTags('')
            if (tags !== '') {
                setTagsArray([...tagsarray, tags])
            }
            else {
                console.log('empty')
            }
        }
    }
    const handleDeleteTags = (index) => {
        tagReRender()
        tagsarray.splice(index, 1)
    }




    
    const designStyleRender = () => {
        setDesignStylereRender(!desginstylereRender)
    }
   
    const handleDesginStyleTag = (e) => {
        designStyleRender()
        if (e.key === 'Enter') {
            setDesginStyle('')
            if (designstyle !== '') {
                setDesignStyleArray([...designstylearray, designstyle])
            }
            else {
                console.log('empty')
            }
        }
    }
    const handleDesignStyleDelete = (index) => {
        designStyleRender()
        designstylearray.splice(index, 1)
    }


    
    

    const updatereRender = () => {
        setupdateCategoryreRender(!updatecategoryreRender)
    }
   
    const handleUpdateTag = (e) => {
        updatereRender()
        if (e.key === 'Enter') {
            setUpdateCategoryText('')
            if (updatecategorytext !== '') {
                setUpdateCategoryTag([...updatecategorytag, updatecategorytext])
            }
            else {
                console.log('empty')
            }
        }
    }
    const handleDeleteUpdateTag = (index) => {
        updatereRender()
        updatecategorytag.splice(index, 1)
    }



    
    
        const roomTypeRender = () => {
            setRoomTypeReRender(!roomtypereRender)
        }
       
        const handleRoomTypeTag = (e) => {
           roomTypeRender()
            if (e.key === 'Enter') {
                setRoomTypeText('')
                if (roomtypetext !== '') {
                    setRoomTypeTag([...roomtypetag, roomtypetext])
                }
                else {
                    console.log('empty')
                }
            }
        }
        const handleDeleteRoomTag = (index) => {
            roomTypeRender()
            roomtypetag.splice(index, 1)
        }

        const handleSubmit=()=>{

            const body={
                category: category,
                subcategory: roomtypetag
            }

            axios.post(categoryuploadurl, body).then(res=>{
                if(res.status === 200){
                    document.querySelector('#catmessagegreen').innerHTML= 'Added Category'
                    setTimeout(() => {
                    document.querySelector('#catmessagegreen').innerHTML= ''

                        
                    }, [3000]);

                }
             
            }).catch(error=>{

                
                if(error.response.status  === 402){
                    document.querySelector('#catmessagered').innerHTML= error.response.data
                    setTimeout(() => {
                    document.querySelector('#catmessagered').innerHTML= ''

                        
                    }, [3000]);
                }
            })

        }


        const handleUpdate=()=>{
            const body={
                category: updatecategory,
                subcategory: updatecategorytag
            }
            axios.post(updatesubcaturl, body).then(res=>{
                if(res.status === 200){
                    document.querySelector('#updatemessagegreen').innerHTML= 'Added Successfully'
                    setTimeout(() => {
                    document.querySelector('#updatemessagegreen').innerHTML= ''

                        
                    }, [3000]);
                
                }
            }).catch(error=>{
                if(error.response.status === 401){
                    document.querySelector('#updatemessagered').innerHTML = error.response.data
                    setTimeout(() => {
                    document.querySelector('#updatemessagered').innerHTML = ''

                        
                    }, [3000]);
                }

            })

        }


        const handleDesign=()=>{
            const body={
                designstylename: 'arnxtdesign',
                designstyle: designstylearray
            }

            axios.post(designstyleurl, body).then(res=>{
                if(res.status === 200){
                    document.querySelector('#designmessagegreen').innerHTML='Added desgin'
                    setTimeout(() => {
                    document.querySelector('#designmessagegreen').innerHTML=''

                        
                    }, [3000]);
                }
            }).catch(error=>{
                if(error.response.status === 401){
                    document.querySelector('#designmessagered').innerHTML= error.response.data
                    setTimeout(() => {
                        
                    document.querySelector('#designmessagered').innerHTML= ''

                    }, [3000]);

                }
            })
        }


        const handleAddTags =()=>{
            const body= {
                tagsname: 'arnxttags',
                tagsvalue: tagsarray
            }

            axios.post(addtagsurl, body).then(res=>{
               if(res.status === 200){
                document.querySelector('#tagsmessagegreen').innerHTML= 'Tags Added'
                setTimeout(() => {
                document.querySelector('#tagsmessagegreen').innerHTML= ''

                    
                }, [3000]);
               }

            }).catch(error=>{
                if(error.response.status === 401){
                document.querySelector('#tagsmessagered').innerHTML=  error.response.data
                setTimeout(() => {
                document.querySelector('#tagsmessagered').innerHTML=  ''

                    
                }, [3000]);


                }
            })
        }

        const handleAddColors =()=>{
            const body= {
                color: 'arnxtcolors',
                coloritems: colortag
            }

            axios.post(addcolorurl, body).then(res=>{
               if(res.status === 200){
                document.querySelector('#colormessagegreen').innerHTML= 'Colors Added'
                setTimeout(() => {
                document.querySelector('#colormessagegreen').innerHTML= ''

                    
                }, [3000]);
               }

            }).catch(error=>{
                if(error.response.status === 401){
                document.querySelector('#colormessagered').innerHTML=  error.response.data
                setTimeout(() => {
                document.querySelector('#colormessagered').innerHTML=  ''

                    
                }, [3000]);


                }
            })
        }



        const handleAddCollection =()=>{
            const body= {
                collection: 'arnxtcollection',
                collectionitems: collectionarray
            }

            axios.post(addcollectionurl, body).then(res=>{
               if(res.status === 200){
                document.querySelector('#collectionmessagegreen').innerHTML= 'Collection Added'
                setTimeout(() => {
                document.querySelector('#collectionmessagegreen').innerHTML= ''

                    
                }, [3000]);
               }

            }).catch(error=>{
                if(error.response.status === 401){
                document.querySelector('#collectionmessagered').innerHTML=  error.response.data
                setTimeout(() => {
                document.querySelector('#collectionmessagered').innerHTML=  ''

                    
                }, [3000]);


                }
            })
        }


        const handleAddRoom =()=>{
            const body= {
                roomtype: roomdata,
                roomtags : roomsarray
               
            }

            axios.post(addroomtypeurl, body).then(res=>{
               if(res.status === 200){
                document.querySelector('#roomsmessagegreen').innerHTML= 'Roomtype Added'
                setTimeout(() => {
                document.querySelector('#roomsmessagegreen').innerHTML= ''

                    
                }, [3000]);
               }

            }).catch(error=>{
                console.log(error)
                if(error.response.status === 402){
                document.querySelector('#roomsmessagered').innerHTML=  error.response.data
                setTimeout(() => {
                document.querySelector('#roomsmessagered').innerHTML=  ''

                    
                }, [3000]);


                }
            })
        }

        const handleSubcategoryAdd = (e, index) => {


            if(e.target.files){
              let files = Array.from(e.target.files) 
            files.forEach(file => {
             fileToBase64(file, (err, result) => {
               if (result) {
               
                     
            const url= uploadfileurl
            fetch(url,{
              method: "POST",
              body: file.name
            
            }).then((res)=>res.json())
               .then((res)=>{
            
                fetch(res.uploadURL, {
                  
                  method: "PUT",
                  headers: {
                    "ContentType": "application/json",
                  
                  },
            
                body: file
                
            
                })
                   .then((res)=>{
                  
                    if(res.status === 200){
          
                        let resnew= res.url.split('?')
                        let imgurl= resnew[0]
                       
                        let { name,value } = e.target;
           
                        const list = [...subcategorylist];
                         
                           value = imgurl
                        list[index][name] = value;
                       
                        setSubCategoryList(list);
                        document.querySelector(`#checkticksub_${index}`).style.display = 'block'
                      
                      }
                  
                   })
                   .catch((err)=>console.log(err))
                 
               })
               .catch((err)=>console.log(err))
          
               }
             })
            
             const reader = new FileReader();
          
             reader.readAsDataURL(file)
             
          })
          
          
            } else{
              let { name,value } = e.target;
           
              const list = [...subcategorylist];
              list[index][name] = value;
             
              setSubCategoryList(list);
            }
          
            
           
                  
             
          
          }

 
        const handleServiceChange = (e, index) => {


            if(e.target.files){
              let files = Array.from(e.target.files) 
            files.forEach(file => {
             fileToBase64(file, (err, result) => {
               if (result) {
               
                     
            const url= uploadfileurl
            fetch(url,{
              method: "POST",
              body: file.name
            
            }).then((res)=>res.json())
               .then((res)=>{
            
                fetch(res.uploadURL, {
                  
                  method: "PUT",
                  headers: {
                    "ContentType": "application/json",
                  
                  },
            
                body: file
                
            
                })
                   .then((res)=>{
                  
                    if(res.status === 200){
          
                        let resnew= res.url.split('?')
                        let imgurl= resnew[0]
                       
                        let { name,value } = e.target;
           
                        const list = [...serviceList];
                         
                           value = imgurl
                        list[index][name] = value;
                       
                        setServiceList(list);
                        document.querySelector(`#checktick_${index}`).style.display = 'block'
                      
                      }
                  
                   })
                   .catch((err)=>console.log(err))
                 
               })
               .catch((err)=>console.log(err))
          
               }
             })
            
             const reader = new FileReader();
          
             reader.readAsDataURL(file)
             
          })
          
          
            } else{
              let { name,value } = e.target;
           
              const list = [...serviceList];
              list[index][name] = value;
             
              setServiceList(list);
            }
          
            
           
                  
             
          
          }
          console.log(serviceList)
          
          const handleServiceRemove = (index) => {
            const list = [...serviceList];
            list.splice(index, 1);
            setServiceList(list);
          };
          const handleSubRemove = (index) => {
            const list = [...subcategorylist];
            list.splice(index, 1);
            setSubCategoryList(list);
          };
          
          
          const handleServiceAdd = () => {
            setServiceList([...serviceList, { itemname: "", itemvalue : "" }]);
          };
          const handleSubAdd = () => {
            setSubCategoryList([...subcategorylist, { itemname: "", itemvalue : "" }]);
          };
          
          
          
          const filechangecategoryimage = e=>{

       
            let files = Array.from(e.target.files) 
            files.forEach(file => {
             fileToBase64(file, (err, result) => {
               if (result) {
     
                    let newval= file.name
      
        
         
         let indx = newval.lastIndexOf(".") + 1;
         let filetype = newval.substr(indx, newval.length).toLowerCase();
     
         if(filetype === 'png' || filetype === 'jpeg' || filetype === 'jpg'){
     
     
            const url= uploadfileurl
         fetch(url,{
           method: "POST",
           body: file.name
         
       
       
         }).then((res)=>res.json())
            .then((res)=>{
         
             fetch(res.uploadURL, {
               
               method: "PUT",
               headers: {
                 "ContentType": "application/json",
               
               },
         
             body: file
           
             })
                .then((res)=>{
               
                 if(res.status === 200){
       
                     let resnew= res.url.split('?')
                     let imgurl= resnew[0]
                    
                     console.log(imgurl)
                     document.querySelector('#tickmarkcategory').style.display= 'block'
                    setCategoryImage(imgurl)
                   
     
                   }
               
                })
                .catch((err)=>console.log(err))
              
            })
            .catch((err)=>console.log(err))
           
       
         } else{
           document.querySelector('#glbmessage').innerHTML= 'jpeg, jpg, png required'
           setTimeout(() => {
           document.querySelector('#glbmessage').innerHTML= ''
     
             
           }, [5000]);
           return
         }
               
               }
             })
            
             const reader = new FileReader();
         
             reader.readAsDataURL(file)
             
         })
     
     } 
      

const handleCategorySubmit=()=>{
    const body={
        category: categoryname,
        categoryimage: categoryimage,
        subcategory: serviceList
    }
    axios.post(addcategoryimageurl, body).then(res=>{
        if(res.status === 200){
            document.querySelector('#submitmessage').innerHTML = 'Submitted'
            setTimeout(() => {
            document.querySelector('#submitmessage').innerHTML = ''
                
            }, 2000);
        }
    }).catch(error=>{
        console.log(error)
    })
}
const handleSubcategorySubmit=()=>{
    const body={
        subcategoryname: subcategoryname,
      
        subcategorydetails: subcategorylist
    }

    axios.post(addsubcatdetails, body).then(res=>{
        if(res.status === 200){
            document.querySelector('#submitmessagesub').innerHTML = 'Submitted'
            setTimeout(() => {
            document.querySelector('#submitmessagesub').innerHTML = ''
                
            }, 2000);
        }
    }).catch(error=>{
        console.log(error)
    })

}
    
       
     
  return (
    <div>

                
  <Navbar/>

<div className='catagorysubmit' >
    <div className='catformdisplay'>
        <label>Category name</label>
        <input type='text' onChange={(e)=>setCategoryName(e.target.value)} placeholder='categoryname'/>
        <label>category image</label>
        <div >
               
                <input type='file' onChange={filechangecategoryimage} />
                 <FaCheck  id='tickmarkcategory' className='tickdisplay' style={{color:'green'}}/>
               <p id ='glbmessage'></p>
            </div>

        <label>subcategory</label>
        <div className='itemnamevalue'>
               
               {
                serviceList && serviceList.map((item, index)=>(

               <div key={index}  className='keyvalueinput' >
                

               <input  
                name="itemname"
                type="text"
                id="service"
                className='inputfirst'
                placeholder='subcategoryname'
              
                onChange={(e) => handleServiceChange(e, index)}
                required
              />
               <input
                name="itemvalue"
                type="file"
                id="service"
                className='inputsecond'
              
                onChange={(e) => handleServiceChange(e, index)}
                required
              />
              <FaCheck id= {`checktick_${index}`} className='tickdisplay' style={{color:'green'}}/>


               {serviceList.length - 1 === index  && (

                <div>
               
                  <span   
                  onClick={handleServiceAdd}
                  className="add-btn" ><i style={{fontSize:'30px'}} class='bx bx-message-square-add'></i></span>
             


                  </div>
             
              )}


             <div className="second-division">
              {serviceList.length !== 1 && (
               
                
                
                  <span   
                  onClick={() => handleServiceRemove(index)}
                  className="remove-btn" ><i  style={{fontSize:'30px'}} class='bx bx-message-square-minus' ></i></span>
               
              )}
            </div>
              
                 </div>

                )) }

             </div>
             <button onClick={handleCategorySubmit}> submit</button>
             <p id='submitmessage' style={{color:'green'}}></p>

    </div>

    <div className='catformdisplay'>
        <label>Subcategory name</label>
        <input type='text' onChange={(e)=>setSubCategoryName(e.target.value)} placeholder='Subcategoryname'/>
      
   

        <label>subcategory details</label>
        <div className='itemnamevalue'>
               
               {
                subcategorylist && subcategorylist.map((item, index)=>(

               <div key={index}  className='keyvalueinput' >
                

               <input  
                name="itemname"
                type="text"
                id="service"
                className='inputfirst'
                placeholder='details name'
              
                onChange={(e) => handleSubcategoryAdd(e, index)}
                required
              />
               <input
                name="itemvalue"
                type="file"
                id="service"
                className='inputsecond'
              
                onChange={(e) => handleSubcategoryAdd(e, index)}
                required
              />
              <FaCheck id= {`checkticksub_${index}`} className='tickdisplay' style={{color:'green'}}/>


               {subcategorylist.length - 1 === index  && (

                <div>
               
                  <span   
                  onClick={handleSubAdd}
                  className="add-btn" ><i style={{fontSize:'30px'}} class='bx bx-message-square-add'></i></span>
             


                  </div>
             
              )}


             <div className="second-division">
              {subcategorylist.length !== 1 && (
               
                
                
                  <span   
                  onClick={() => handleSubRemove(index)}
                  className="remove-btn" ><i  style={{fontSize:'30px'}} class='bx bx-message-square-minus' ></i></span>
               
              )}
            </div>
              
                 </div>

                )) }

             </div>
             <button onClick={handleSubcategorySubmit}> submit</button>
             <p id='submitmessagesub' style={{color:'green'}}></p>

    </div>

   



  


    <div className='catformdisplay'>

<div>
 <h2>Add Design Styles</h2>



 </div>
 <div>
 <label>Add Design Styles</label>
 <div className='AddTagContainer'>
 <div className="addTagBox">
   
     <div className="addTagInput">
         {
             designstylearray.map((tag, index) => {
                 return (
                     <div className="tags" key={index}>
                         <span>{tag}</span>
                         <div className="crossIcon"
                             onClick={() => handleDesignStyleDelete(index)}>
                             <RxCross2 />
                         </div>

                     </div>
                 )
             })
         }


         <input className='input' type="text" autoFocus
          placeholder='Add designs'
             value={designstyle}
             onKeyUpCapture={(e) => { handleDesginStyleTag(e) }}
             onChange={(e) => setDesginStyle(e.target.value)}
         />
      
     </div>
 </div>
</div>

 </div>

 <div>
     <button type='submit' onClick={handleDesign} >Add</button>
 </div>

 <p id='designmessagered' style={{color:'red', fontSize:'15px'}}></p>
 <p id='designmessagegreen' style={{color:'green', fontSize:'15px'}}></p>


 </div> 



 <div className='catformdisplay'>

<div>
 <h2>Add Tags</h2>



 </div>
 <div>
 <label>Add Tags</label>
 <div className='AddTagContainer'>
 <div className="addTagBox">
   
     <div className="addTagInput">
         {
             tagsarray.map((tag, index) => {
                 return (
                     <div className="tags" key={index}>
                         <span>{tag}</span>
                         <div className="crossIcon"
                             onClick={() => handleDeleteTags(index)}>
                             <RxCross2 />
                         </div>

                     </div>
                 )
             })
         }


         <input className='input' type="text" autoFocus
          placeholder='Add Tags'
             value={tags}
             onKeyUpCapture={(e) => { handleTags(e) }}
             onChange={(e) => setTags(e.target.value)}
         />
      
     </div>
 </div>
</div>

 </div>

 <div>
     <button type='submit' onClick={handleAddTags} >Add</button>

    
 </div>

 <p id='tagsmessagered' style={{color:'red', fontSize:'15px'}}></p>
 <p id='tagsmessagegreen' style={{color:'green', fontSize:'15px'}}></p>


 </div> 




 <div className='catformdisplay'>

<div>
 <h2>Add Colors</h2>



 </div>
 <div>
 <label>Add Colors</label>
 <div className='AddTagContainer'>
 <div className="addTagBox">
   
     <div className="addTagInput">
         {
             colortag.map((tag, index) => {
                 return (
                     <div className="tags" key={index}>
                         <span>{tag}</span>
                         <div className="crossIcon"
                             onClick={() => handleDeleteColorTags(index)}>
                             <RxCross2 />
                         </div>

                     </div>
                 )
             })
         }


         <input className='input' type="text" autoFocus
          placeholder='Add Colors'
             value= {color}
             onKeyUpCapture={(e) => {handleColorTags(e) }}
             onChange= {(e) => setColor(e.target.value)}
         />
      
     </div>
 </div>
</div>

 </div>

 <div>
     <button type='submit' onClick={handleAddColors} >Add</button>

    
 </div>

 <p id='colormessagered' style={{color:'red', fontSize:'15px'}}></p>
 <p id='colormessagegreen' style={{color:'green', fontSize:'15px'}}></p>


 </div> 


 <div className='catformdisplay'>

<div>
 <h2>Add Collections</h2>



 </div>
 <div>
 <label>Add Collections</label>
 <div className='AddTagContainer'>
 <div className="addTagBox">
   
     <div className="addTagInput">
         {
             collectionarray.map((tag, index) => {
                 return (
                     <div className="tags" key={index}>
                         <span>{tag}</span>
                         <div className="crossIcon"
                             onClick={() => handleDeleteCollectionTags(index)}>
                             <RxCross2 />
                         </div>

                     </div>
                 )
             })
         }


         <input className='input' type="text" autoFocus
          placeholder='Add Collections'
             value= {collection}
             onKeyUpCapture={(e) => {handleCollectionTag(e) }}
             onChange= {(e) => setCollection(e.target.value)}
         />
      
     </div>
 </div>
</div>

 </div>

 <div>
     <button type='submit' onClick={handleAddCollection} >Add</button>

    
 </div>

 <p id='collectionmessagered' style={{color:'red', fontSize:'15px'}}></p>
 <p id='collectionmessagegreen' style={{color:'green', fontSize:'15px'}}></p>


 </div> 



 <div className='catformdisplay'>


 <div>

 
 <div>
    <h2>Add RoomType</h2>
    <label>Roomtype</label>
    <input type='text' value={roomdata} onChange={(e)=>setRoomData(e.target.value)} />

    </div>
 <div className='AddTagContainer'>
 <div className="addTagBox">
   
     <div className="addTagInput">
         {
             roomsarray.map((tag, index) => {
                 return (
                     <div className="tags" key={index}>
                         <span>{tag}</span>
                         <div className="crossIcon"
                             onClick={() => handleDeleteRoom(index)}>
                             <RxCross2 />
                         </div>

                     </div>
                 )
             })
         }


         <input className='input' type="text" autoFocus
          placeholder='Add Roomtype tags'
             value= {rooms}
             onKeyUpCapture={(e) => {handleRoomsAdd(e) }}
             onChange= {(e) => setRooms(e.target.value)}
         />
      
     </div>
 </div>
</div>

 </div>

 <div>
     <button type='submit' onClick={handleAddRoom} >Add</button>

    
 </div>

 <p id='roomsmessagered' style={{color:'red', fontSize:'15px'}}></p>
 <p id='roomsmessagegreen' style={{color:'green', fontSize:'15px'}}></p>


 </div> 



 <div></div>
 <div></div>
 <div></div>
 <div></div>
 <div></div>

    
</div>


   
      
    </div>
  )
}

export default CategoryForm
