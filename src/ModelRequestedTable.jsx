

import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import QRCode from "react-qr-code";
import './App.css';

const ModelRequestedTable = () => {
  const location = useLocation();
  // const { data, requestedId } = location.state || {};
  const { requestedId } = location.state || {};
  const [fetchedData, setFetchedData] = useState([]);
  const [rejectionState, setRejectionState] = useState({}); // State to handle rejection input
  const [isdisable,setIsdisable]=useState(false)
  const [reason,setReason]=useState({})
  const [isstatus,setIsstatus]=useState({})
  const [isapprove,setIsapprove]=useState(true)
 
  const [data,setdata]=useState([]);
  useEffect(() => {

    const fetchdataofrequestedid= async () => {

      const body = {
        id: requestedId
      }
      try {

        const response = await axios.post('https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/getquleepstatusdata', body).catch(err => {
          console.log(err)
        })
        console.log(":response is ",response)

        setdata(response.data)
        // console.log(response.data)


      } catch (err) {
        console.log(err)

      }

    }

    fetchdataofrequestedid()

  }, [requestedId,isdisable,isapprove])


  

useEffect(() => {
  if (data && data.length > 0) {
    const productToReasonMap = {};
    const productTostatusmap={};
    data[0].modelerRequest.forEach(item => {
        productToReasonMap[item.productId] = item.rejectionreason;
        productTostatusmap[item.productId]=item.status;
      
    });
    setReason(productToReasonMap); 
    setIsstatus(productTostatusmap);
  }
}, [data]); // Only runs when 'data' changes


  console.log("isstatus usuh ",isstatus,reason)





  const handleRejectionChange = (e, productId) => {
    
    setRejectionState({ ...rejectionState, [productId]: e.target.value });
  };

  const handleCancelReject = (productId) => {
    
    setRejectionState({ ...rejectionState, [productId]: undefined });
  };

  const columns = [
    { field: 'modelerId', headerName: 'ModelerId', width: 200, cellClassName: 'center-cell', headerClassName: 'header-theme',  headerAlign: 'center'  },
    {
      field: 'productId',
      headerName: 'Product Id',
      headerAlign: 'center',
      disableColumnMenu: true,
      sortable: false,
      filterable: true,
      width: 200,
      editable: false,
      headerClassName: 'header-theme',
      cellClassName: 'center-cell'
    },
    {
      field: 'Image',
      headerName: 'Image',
      headerAlign: 'center',
      disableColumnMenu: true,
      sortable: false,
      width: 200,
      cellClassName: 'center-cell',
      headerClassName: 'header-theme',
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Profile"
          style={{ width: '100%', height: 'auto', borderRadius: '8px', objectFit: 'cover' }}
        />
      ),
    },
    {
      field: 'QrCode',
      headerName: 'QR Code',
      headerAlign: 'center',
      disableColumnMenu: true,
      sortable: false,
      width: 200,
      cellClassName: 'center-cell',
      headerClassName: 'header-theme',
      renderCell: (params) => (
        <QRCode
          className="qr-code"
          size={100}
          style={{ height: "auto", maxWidth: "100%", padding: '10px' }}
          value={`https://www.admin.arnxt.com/viewmodel?id=${params.row.productId}`}
        />
      ),
    },
   
    {
      field: 'sendModel',
      headerName: 'Send Model',
      headerAlign: 'center',  //for align content of header in center
      disableColumnMenu: true,
      sortable: false,
      width: 200,
      cellClassName: 'center-cell',
      headerClassName: 'header-theme',
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
         
          sx={{
            backgroundColor: '#007bff',
           
            color: '#fff',
            '&:hover': { backgroundColor: '#0056b3' },
            width: '50%',
            height: '40%',
            borderRadius: '5px',
            padding: '5px 10px',
          }}
          onClick={() => sendModel(params.row)}
          //  disabled={isstatus[params.row.productId] ? false : true  }
          disabled={isstatus[params.row.productId] && !reason[params.row.productId] ? false : true}

        >
             {isstatus[params.row.productId] ? 'Approve' :'Approved'}
        </Button>
      ),
    },
    {
      field: 'rejectModel',
      headerName: 'Reject Model',
      headerAlign: 'center',
      disableColumnMenu: true,
      sortable: false,
      width:400,
      cellClassName: 'center-cell',
      headerClassName: 'header-theme',
      
      renderCell: (params) => (
        <>
          {/* Reject Button and Input Field */}
          {/* {isstatus[params.row.productId] && */}
          { rejectionState[params.row.productId] === undefined ? (
            <Button
              variant="contained"
              color="primary"
            
              sx={{
                backgroundColor: 'red',
                color: '#fff',
                '&:hover': { backgroundColor: '#C9302C' },
                width: '25%',
                height: '40%',
                borderRadius: '5px',
                padding: '5px 10px',
                
              }}
              // disabled={reason[params.row.productId] ? true : false}
              disabled={reason[params.row.productId] || !isstatus[params.row.productId] ? true : false}
              
              onClick={() => setRejectionState({ ...rejectionState, [params.row.productId]: "" })}
            >
               {/* {reason[params.row.productId] ? 'Rejected' : 'Reject'} || {isdisable ? "Rejected" : "reject"} */}
               {reason[params.row.productId] ? 'Rejected' : 'Reject'}

              
            </Button>
          ) : (
            <div>
              <input
                type="text"
                maxLength={100}
                placeholder="Enter Rejection Reason"
                value={rejectionState[params.row.productId] || ""}
                onChange={(e) => handleRejectionChange(e, params.row.productId)}
                onKeyDown={(e) => {
                  if (e.key === ' ') {
                    e.stopPropagation();
                  }
                  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                    e.stopPropagation();
                  }
                }}
                
                style={{
                  width: '50%', 
                  padding: '2px 4px',
                  fontSize:'16px',
                  height:'40px',
                  borderRadius: '4px', 
                  border: '1px solid #ced4da',
                  outline: 'none', 
                  boxShadow: 'none', 
                  '&:focus': {
                    borderColor: '#007bff', // Change border color on focus
                    boxShadow: '0 0 5px rgba(0, 123, 255, 0.5)', // Shadow effect on focus
                  },
                }}
              />
              <Button
                variant="contained"
                sx={{
                  backgroundColor: 'green',
                  color: '#fff',
                  '&:hover': { backgroundColor: '#388e3c' },
                  marginLeft: '10px',
                }}
                onClick={() => rejectModel(params.row)}
              >
                Submit
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: 'red',
                  color: '#fff',
                  '&:hover': { backgroundColor: '#C9302C' },
                  marginLeft: '10px',
                }}
                onClick={() => handleCancelReject(params.row.productId)}
              >
                Cancel
              </Button>
            </div>
          )}
        </>
      
      ),
    
    
    },
  ];

  const rejectModel = async (rowData) => {
    if (!rejectionState[rowData.productId]) {
      alert('Rejection reason is required');
      return;
    }
    
    try {
      const data = {};
      data.modelerId = rowData?.modelerId;
      data.productId = requestedId;
      data.status = true;
      data.rejectionreason = rejectionState[rowData.productId];
       console.log("data of reject model",data)
      const res = await axios.patch("https://eozoyxa2xl.execute-api.ap-south-1.amazonaws.com/prod/arnxtrequestmodel", data);
      console.log("res data of reject model is ", res);
      if (res.status === 200) {
        setIsdisable(true)
        alert('Model rejected successfully');
        window.location.reload()
        // Reset the rejection state after submission
        setRejectionState({ ...rejectionState, [rowData.productId]: undefined });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendModel = async (rowData) => {
    console.log("row data is for sendmodel",rowData)
    try {
      const data = {};
      data.modelerId = rowData?.modelerId;
      data.productId = requestedId;
      data.status = false;
      data.glburl = rowData?.glburl || '';

      const res = await axios.patch("https://eozoyxa2xl.execute-api.ap-south-1.amazonaws.com/prod/arnxtrequestmodel", data);
      
      if (res.status === 200) {
        setIsapprove(false)
        alert('Model sent successfully');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchDataForProducts = async () => {
      console.log("data is ",data)
      if (data && Array.isArray(data)) {
        try {
          const fetchPromises = data[0].modelerRequest.map(async (item, index) => {
            const res = await axios.get(`https://eozoyxa2xl.execute-api.ap-south-1.amazonaws.com/prod/quleepdataformodel?Id=${item.productId}`);
             console.log("res is",res.data)
            return {
              id: index,
              modelerId: item.modelerId,
              productId: res.data.Item.Id,
              Image: res.data.Item.images && res.data.Item.images[0],
              glburl: res.data.Item.glburl,
              fbxurl: res.data.Item.fbxurl,
              
            };
          });

          const results = await Promise.all(fetchPromises);
          setFetchedData(results);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchDataForProducts();
  }, [data]);
  
  return (
    <div className="model-requested-table">
      <Navbar />
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        backgroundColor: '#f8f9fa',
        height: '100vh'
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
          <Box
            sx={{
              height: 400,
              width: '100%',
              backgroundColor: '#f8f9fa',
              padding: '20px',
              borderRadius: '10px'
            }}
          >
            <h2 className='requestmodelheading'>Requested Models</h2>
            <DataGrid
          rows={fetchedData} 
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
          rowHeight={100} // Adjust row height for QR Code and image
          sx={{
            boxShadow: 2,
            border: 2,
            borderColor: '#dee2e6',
        

            '& .MuiDataGrid-cell:hover': {
              color: 'primary.main',
              outline:'none',
            },
            '& .MuiDataGrid-cell':{
              
              display: 'flex',
             justifyContent: 'center',  
               alignItems: 'center',
              fontSize: '18px',
            },
            '& .MuiDataGrid-row': {
              backgroundColor: '#fff', // Set background color for rows
              marginBottom: '20px', // Margin between rows
            },
        
            '& .MuiDataGrid-columnHeaderTitle': {
             
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              
            },
        
          }}
        />
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default ModelRequestedTable
