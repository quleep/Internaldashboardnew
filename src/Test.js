<div className='userdatanew'>

        
      
        
{
  newuserdata && newuserdata.map((item, i)=>(
<div>
   
  
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

          <div  className='previewimage'>
       

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