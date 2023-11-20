import axios from 'axios'
import React, { useState } from 'react'
import QRCode from "react-qr-code";
import * as htmlToImage from 'html-to-image';

const GenerateQrcode = () => {

    const [brandqrcodedata, setBrandQrCodeData] = useState([])
    const [inputvalue, setInputValue] = useState()

    const handleSubmit = ()=>{

     const inpvalue =    document.getElementById('inputvalue').value
      try{

        axios.get(inpvalue && inpvalue).then(res=>{
           setBrandQrCodeData(res.data.data)
        })

      }catch(error){
           console.log('error while fetching data', error)

      }

    }

    console.log(brandqrcodedata)
  return (
    <div>

        <div className='brandqrcode'>
            <div className='brandqrcodeinside'>

              <div className='brandapicontainer'>
                <div>
                    <input  id = 'inputvalue' onChange={(e)=>setInputValue(e.target.value)} />
                    <button onClick={handleSubmit} >Submit</button>

                </div>

              </div>
              <div className='brandqrcodecontainer'>
                <div className='qrcodeinsidediv' >
                    {
                        brandqrcodedata && brandqrcodedata.map((item,i)=>(
                            <div>
                            <div className='qrcodeimagedivcontainer'>
                               <img src={item.Imageurl2}/>
                            </div>
                            <div className='qrcodeimagecontainer'>
                            <div  id={`qrvalue_${i}`}  className='qrcodescanimage'>
            <QRCode  size={100}  viewBox='0 0 200 200' value={`arnxt.com/view?id=${item.Patternnumber}`} />
          </div>
                            </div>
                            <div className='qrcodepatternnocontainer'>
                              <p>{item.Patternnumber}</p>
                            </div>
                        </div>
                  
                        ))
                    }
                 


                </div>

              </div>

            </div>
            
        </div>
      
    </div>
  )
}

export default GenerateQrcode
