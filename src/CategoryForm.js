import React, { useState } from 'react'
import Navbar from './Navbar'
import { RxCross2 } from 'react-icons/rx';
import axios from 'axios';
const categoryuploadurl = 'https://eh16rizdbi.execute-api.ap-south-1.amazonaws.com/production/addcategoryandsubcategory'
const updatesubcaturl= 'https://eh16rizdbi.execute-api.ap-south-1.amazonaws.com/production/updatesubcategory'
const designstyleurl= 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/adddesigndata'
const addtagsurl= 'https://eh16rizdbi.execute-api.ap-south-1.amazonaws.com/production/addtags'
const addcolorurl= 'https://eh16rizdbi.execute-api.ap-south-1.amazonaws.com/production/addcolor'
const addcollectionurl= 'https://eh16rizdbi.execute-api.ap-south-1.amazonaws.com/production/addcollection'
const addroomtypeurl= 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/addroomtype'


const CategoryForm = () => {

    const [roomtypetag, setRoomTypeTag] = useState([])
    const [roomtypetext, setRoomTypeText] = useState('')
    const [roomtypereRender, setRoomTypeReRender] = useState(false)

    const [updatecategorytag, setUpdateCategoryTag] = useState([])
    const [updatecategorytext, setUpdateCategoryText] = useState('')
    const [updatecategoryreRender, setupdateCategoryreRender] = useState(false)


    const [colortag, setColorTag] = useState([])
    const [color, setColor] = useState('')
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





       
       
  return (
    <div>

                
  <Navbar/>

<div className='catagorysubmit' >

   <div className='catformdisplay'>

   <div>
    <h2>Add Category</h2>
    <label>Category</label>
    <input type='text' value={category} onChange={(e)=>setCategory(e.target.value)} />

    </div>
    <div>
    <label>Subcategory</label>
    <div className='AddTagContainer'>
    <div className="addTagBox">
      
        <div className="addTagInput">
            {
                roomtypetag.map((tag, index) => {
                    return (
                        <div className="tags" key={index}>
                            <span>{tag}</span>
                            <div className="crossIcon"
                                onClick={() => handleDeleteRoomTag(index)}>
                                <RxCross2 />
                            </div>

                        </div>
                    )
                })
            }


            <input className='input' type="text" autoFocus
             placeholder='Add subcategory'
                value={roomtypetext}
                onKeyUpCapture={(e) => { handleRoomTypeTag(e) }}
                onChange={(e) => setRoomTypeText(e.target.value)}
            />
          
        </div>
    </div>
</div>

    </div>

    <div>
        <button type='submit' onClick={handleSubmit} >Submit</button>
    </div>

    <p id='catmessagered' style={{color:'red', fontSize:'15px'}}></p>
    <p id='catmessagegreen' style={{color:'green', fontSize:'15px'}}></p>


    </div> 

    <div className='catformdisplay'>

   <div  className='inputcategory'>
    <h2>Update Subcategory</h2>
    <label>Category</label>
    <input type='text' value={updatecategory} onChange={(e)=>setUpdateCategory(e.target.value)} />

    </div>
    <div>
    <label>Subcategory</label>
    <div className='AddTagContainer'>
    <div className="addTagBox">
      
        <div className="addTagInput">
            {
                updatecategorytag.map((tag, index) => {
                    return (
                        <div className="tags" key={index}>
                            <span>{tag}</span>
                            <div className="crossIcon"
                                onClick={() => handleDeleteUpdateTag(index)}>
                                <RxCross2 />
                            </div>

                        </div>
                    )
                })
            }


            <input className='input' type="text" autoFocus
             placeholder='Add subcategory'
                value={updatecategorytext}
                onKeyUpCapture={(e) => { handleUpdateTag(e) }}
                onChange={(e) => setUpdateCategoryText(e.target.value)}
            />
          
        </div>
    </div>
</div>

    </div>

    <div>
        <button type='submit' onClick={handleUpdate} >Update</button>
    </div>

    <p id='updatemessagered' style={{color:'red', fontSize:'15px'}}></p>
    <p id='updatemessagegreen' style={{color:'green', fontSize:'15px'}}></p>


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
