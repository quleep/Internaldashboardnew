import React, { useState } from 'react'
import Navbar from './Navbar'
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { FaTimes } from 'react-icons/fa';


const Luxeadmin = () => {
        
 const [serviceList, setServiceList] = useState([{ productsize: "", productpriceinr:'', productpriceusd:'', productdeliverytime: ''}]);

 const [servicevalue, setServiceValue] = useState();

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
       
const handleServiceChange = (e, index) => {
 
 
    const { name, value } = e.target;
    const list = [...serviceList];

    list[index][name] = value;
   
    setServiceList(list);

}


      const handleServiceRemove = (index) => {
        const list = [...serviceList];

         list.splice(index, 1)
        setServiceList(list);
      };
      
      const handleServiceAdd = () => {
        setServiceList([...serviceList, { productsize: "", productpriceinr:'', productpriceusd:'', productdeliverytime: '' }]);
      };


    const handletagchange = (e)=>{
        if(e.target.value.includes(',')){
         let   newval= Array.from(e.target.value)
            newval.pop()
        let  finalval=  newval.join('')
        console.log(finalval)
        
    }
      
}

console.log(serviceList)


  return (
    <div>
        <Navbar/>
        <div className='luxeuploadpage'>

            <div className='luxecontentinside'>
                <div className=''>
                <TextField id="outlined-basic" label="Prouduct name" variant="outlined" />

                </div>
            
                <div className=''>
                <TextField id="outlined-basic" label="category name" variant="outlined" />

                </div>
                <div className=''>
                <TextField id="outlined-basic" label="style" variant="outlined" />
                
                </div>
                <div className=''>
                <TextField id="outlined-basic" label="design" variant="outlined" />

                </div>
                <div className=''>
                <TextField id="outlined-basic" label="collection" variant="outlined" />

                </div>
                <div className=''>
                <TextField id="outlined-basic" label="discount" variant="outlined" />

                </div>
                 <div className=''>
                <TextField id="outlined-basic" label="Ratings" variant="outlined" />

                </div>
                <div className=''>
                <TextField id="outlined-basic" label="Description" variant="outlined" />

                </div>
                <div className=''>
                <TextField id="outlined-basic" onChange={handletagchange} label="Add tags" variant="outlined" />

                </div>

                 <div>
                 <div>
            <div  >
             
               {
                serviceList && serviceList.map((item, index)=>(

               <div key={index}  className='' style={{ display:'flex', gap:'5px', marginLeft:'10px', justifyContent:'center', alignItems:'center', marginTop:'15px'}} >
                

               <TextField  
                name="productsize"
                type="text"
                id="service"
                 label="productsize"
              
                variant='outlined'
              
                onChange={(e) => handleServiceChange(e, index)}
                required
              />
               <TextField
                name="productpriceinr"
                type="number"
                id="service"
             variant='outlined'
               label="productpriceinr"
            
              
                onChange={(e) => handleServiceChange(e, index)}
                required
              />
                       <TextField
                name="productpriceusd"
                type="number"
                id="service"
             variant='outlined'
               label="productpriceusd"

                onChange={(e) => handleServiceChange(e, index)}
                required
              />

                   <TextField
                name="productdeliverytime"
                type="text"
                id="service"
              label="deliverytime"
                  variant='outlined'
              
                onChange={(e) => handleServiceChange(e, index)}
                required
              />


               {serviceList.length - 1 === index  && (

                <div >
               
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
            </div>
                 </div>
           
                <div >
                <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload file
      <VisuallyHiddenInput type="file" />
    </Button>

                </div>
                <div>
                    
           <Button variant='contained'>
             Submit images
           </Button>
                </div>

                <div>
                    
                    <Button variant='contained'>
                      Submit Data
                    </Button>
                         </div>

            </div>

        </div>

      
    </div>
  )
}

export default Luxeadmin
