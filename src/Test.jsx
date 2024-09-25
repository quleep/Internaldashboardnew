import axios from 'axios'
import React, { useState } from 'react'

const Test = () => {

  const videouploadurl = 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/arhorizonvideocontentupload'
  const imageuploadurl = 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/arhorizonimagefileupload'
  const submitformurl = 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/submitformvideoarhorizon'


  const [videofile, setVideoFile] = useState()
  const [imagefile, setImageFile] = useState()


  const [formdata, setFormData] = useState({
    imagefile : '',
  
   
  })


  const handleuploadvideofile = (e)=>{

    // let val= document.getElementById(`imagefile_${len}`).value;

    // let indx = val.lastIndexOf(".") + 1;
    // let filetype = val.substr(indx, val.length).toLowerCase();

  
   let files = Array.from(e.target.files) 
  
   files.forEach(file => {
     setVideoFile(file)
   
  
    const reader = new FileReader();
  
    reader.onload = () => {
        if (reader.readyState === 2) {

        
          
            }
         
    }
     
    reader.readAsDataURL(file)
    
  })
  
  }

  const handleuploadimagefile = (e)=>{

       let val= document.getElementById(`imagefile`).value;

    let indx = val.lastIndexOf(".") + 1;
    let filetype = val.substr(indx, val.length).toLowerCase();

  
   let files = Array.from(e.target.files) 
  
   files.forEach(file => {
     setImageFile(file)
   
  
    const reader = new FileReader();
  
    reader.onload = () => {
        if (reader.readyState === 2) {

            }
         
    }
     
    reader.readAsDataURL(file)
    
  })

  }
  const handlesubmitimagefile = async () => {
    try {
        const url = imageuploadurl;
        const response = await fetch(url, {
            method: "POST",
            body: imagefile.name
        });
        const data = await response.json();
        
        const uploadResponse = await fetch(data.uploadURL, {
            method: "PUT",
            headers: {
                "Content-Type": "image/jpeg",
            },
            body: imagefile
        });
        
        if (uploadResponse.status === 200) {
            let resnew = uploadResponse.url.split('?');
            let imgurl = resnew[0];
            const returndata = {
              item : imgurl,
              res : true
            }
            return returndata;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};

  const handlesubmitvideo = async () => {
    try {
        const url = videouploadurl;
        const response = await fetch(url, {
            method: "POST",
            body: videofile.name
        });
        const data = await response.json();
        
        const uploadResponse = await fetch(data.uploadURL, {
            method: "PUT",
            headers: {
                "Content-Type": "video/mp4",
            },
            body: videofile
        });
        
        if (uploadResponse.status === 200) {
            let resnew = uploadResponse.url.split('?');
            let imgurl = resnew[0];
         
            const returndata = {
              item : imgurl,
              res : true
            }
            return returndata;
        }
    } catch (error) {
        console.log(error);
        return false; 
    }
};



const handleinputchange = (e)=>{
  const{name, value} = e.target

  setFormData({
    ...formdata,
    [name] : value
  })


}




  const handlesubmit = async ()=>{


    const imageres = await handlesubmitimagefile();
 
    
    const videores = await handlesubmitvideo();
  

    if(imageres.res && videores.res) {
       
        const body = {
           Id : new Date().getTime().toString(),
           imagefile : imageres.item,
           videofile :   videores.item,
           brandname : formdata.brandname,
           regtime : new Date().getTime()
        }

        try {
          const response  = await axios.post(submitformurl , body).then(res=>{
            console.log(res)
          })
        }
        catch(error){
          console.log(error)
        }

    }
  
  }
  return (
    <div>
      <label>Name</label>
      <input  name='brandname'  onChange={handleinputchange}/>

      <label>Imagefile</label>
      <input onChange={handleuploadimagefile}  id = 'imagefile'  type='file'/>
      <label>video file</label>
      <input type='file'  onChange={handleuploadvideofile} />

      <button onClick={handlesubmit}>submit</button>
      
    </div>
  )
}

export default Test
