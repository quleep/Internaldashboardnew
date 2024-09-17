import React, { useEffect, useState } from 'react'
import axios from 'axios'
import html2pdf from 'html2pdf.js'
import { useLocation, useParams } from 'react-router-dom'

const orderurl= 'https://1t4lfd0rz7.execute-api.ap-south-1.amazonaws.com/razorpay/orderdetails'
const merchantprofileurl= 'https://eh16rizdbi.execute-api.ap-south-1.amazonaws.com/production/getmerchantprofile'


const Success = () => {
    const [amount, setAmount] = useState('');
    const [o_id, setO_id] = useState('');
    const [p_id, setP_id] = useState('');
    const [invoice, setInvoice] = useState('');
    const [date, setDate] = useState('');
    const [planname, setPlanName] = useState('');
    const[desc, setDesc] = useState('')

    const [merchantdata, setMerchantData] = useState('')

    
   let tax= amount- (amount*18/100);

   let percent= amount- tax
   
   const { search } = useLocation();
   const params= new URLSearchParams(search)
   const id= params.get('refid')

   useEffect(()=>{
     const body={
        merchantid: Number(id)
     }
     axios.post(merchantprofileurl, body).then(res=>{
        setMerchantData(res.data)
     }).catch(error=>[
        console.log(error)
     ])
   },[])
  
console.log(merchantdata)
  useEffect(()=>{
    const requestbody= {
      merchantid : id

    }

    axios.post(orderurl, requestbody).then(response=>{
     
      
       setAmount(response.data[0].amount)
       setO_id(response.data[0].order_Id)
       setP_id(response.data[0].payment_Id)
       setInvoice(response.data[0].invoiceid)
      

       let dat= response.data[0].transaction_Date.split(' ')
       setDate(dat.slice(0,4).join(' '))

       setPlanName(response.data[0].plan_name)
       setDesc(response.data[0].desc)
     
    

    
    }).catch(error=>{
      console.log(error)
    })


  },[])


  window.onload = function () {
    document.getElementById("download")
        .addEventListener("click", () => {
            const invoice = this.document.getElementById("invoice");
            console.log(invoice);
            console.log(window);
            var opt = {
                margin: 1,
                filename: 'myfile.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };
            html2pdf().from(invoice).set(opt).save();
        })
}

  return (
    <div>
       <div class="container d-flex justify-content-center mt-50 mb-50">
        <div class="row">
            <div class="col-md-12 text-right mb-3">
                <button class="btn btn-primary" id="download"> download pdf</button>
            </div>
            <div class="col-md-12">
                <div class="card" id="invoice">
                    <div class="card-header bg-transparent header-elements-inline">
                        <h6 class="card-title text-primary">Purchase Invoice</h6>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="mb-4 pull-left">
                                 
                                     <div  style={{display:'flex', marginLeft:'-20px', marginTop:'-30px'}}>
                                     <img  src='/images/logo.png' style={{width:'120px', height:'120px'}} />
                                      </div>     
                                    <ul class="list list-unstyled mb-0 text-left">
                                   
                                        <li>   Quleep Pvt Ltd AMN0202108, Aman, Jaypee Greens </li>

                                               <li>Sector 151, Noida, Uttar Pradesh – 201310</li>
                                        <li> +91 9883019518 </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="mb-4 ">
                                    <div class="text-sm-right">
                                        <h4 class="invoice-color mb-2 mt-md-2">Invoice #{invoice}</h4>
                                        <ul class="list list-unstyled mb-0">
                                            <li>Date: <span class="font-weight-semibold">{date}</span></li>
                                           
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="d-md-flex flex-md-wrap">
                            <div class="mb-4 mb-md-2 text-left"> <span class="text-muted">Invoice To:</span>
                                <ul class="list list-unstyled mb-0">
                                    <li>
                                        <h5 class="my-2">Name : {merchantdata && merchantdata[0].merchantname} </h5>
                                    </li>
                                    <li><span class="font-weight-semibold">Address : </span>{merchantdata && merchantdata[0].merchantaddress}</li>
                                    <li>state : {merchantdata && merchantdata[0].merchantstate}</li>
                                    <li>city: {merchantdata && merchantdata[0].merchantcity}</li>
                                    <li>email : {merchantdata && merchantdata[0].merchantemail}</li>
                                  
                                   
                                </ul>
                            </div>
                            <div class="mb-2 ml-auto"> <span class="text-muted">Payment Details:</span>
                                <div class="d-flex flex-wrap wmin-md-400">
                                    <ul class="list list-unstyled mb-0 text-left">
                                        <li>
                                            <h5 class="my-2">Total Amount:</h5>
                                        </li>
                                        <li>Order Id:</li>
                                        <li>Payment Id:</li>
                                        <li>GSTIN:</li>
                                        <li>CIN:</li>


                                      
                                    </ul>
                                    <ul class="list list-unstyled text-right mb-0 ml-auto">
                                        <li>
                                            <h5 class="font-weight-semibold my-2">₹{amount}</h5>
                                        </li>
                                        <li><span class="font-weight-semibold">{o_id}</span></li>
                                        <li>{p_id}</li>
                                        <li>09AAACQ7672F1Z6</li>
                                        <li>U72900UP2021PTC151552</li>
                                        

                                   
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-lg">
                            <thead>
                                <tr>
                                    <th>Plan name</th>
                                     
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Tax</th>
                                    <th>Total</th>
                                    

                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>{planname}</td>

                                    <td>
                                        <h6 class="mb-0">{desc}</h6> <span class="text-muted"></span>
                                    </td>
                                    <td>₹{tax}</td>
                                    <td>18%</td>
                                    <td><span class="font-weight-semibold">₹{amount}</span></td>
                                </tr>
                           
                           
                            </tbody>
                        </table>
                    </div>
                    <div class="card-body">
                        <div class="d-md-flex flex-md-wrap">
                            <div class="pt-2 mb-3 wmin-md-400 ml-auto">
                               
                                <div class="table-responsive">
                                    <table class="table">
                                        <tbody>
                                            <tr>
                                                <th class="text-left">Subtotal:</th>
                                                <td class="text-right">₹{tax}</td>
                                            </tr>
                                            <tr>
                                                <th class="text-left">Tax: <span class="font-weight-normal">(18%)</span></th>
                                                <td class="text-right">₹{percent}</td>
                                            </tr>
                                            <tr>
                                                <th class="text-left">Total:</th>
                                                <td class="text-right text-primary">
                                                    <h5 class="font-weight-semibold">₹{amount}</h5>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                    <div class="card-footer"> <span class="text-muted">
                      For any payment related issues react us at care@arnxt.com
                      </span> </div>
                </div>
            </div>
        </div>
    </div>
      
    </div>
  )
}

export default Success
