
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import QRCode from "react-qr-code";
// import './ModelRequestedTable.css'; // Import external CSS for custom styles
import './App.css'
import { Toaster, toast } from "react-hot-toast";
const ClientRequestModelTable = () => {
	const location = useLocation();
	const { data,productkey} = location.state || {}; 
	console.log("data of table is ",data)


	const [modelData, setModelData] = useState([]);

	const columns = [
		{ field: 'productId', headerName: 'Model Id',  headerAlign: 'center', width: 200 ,cellClassName: 'center-cell',headerClassName: 'header-theme',},
		// {
		//   field: 'productId',
		//   headerName: 'Product Id',
		//   disableColumnMenu: true,
		//   sortable: false,
		//   filterable: true,
		//   width: 200,
		//   editable: false,
		//   headerClassName: 'header-theme',
		//   cellClassName: 'center-cell'
		// },
		{
			field: 'image',
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
			headerName: 'Action',
			headerAlign: 'center',
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
						 width:'80%',
						 height:'40%',
						borderRadius: '5px',
						padding: '5px 10px',
					}}
					onClick={() => sendModel(params.row)}
				>
					Request Model
				</Button>
			),
		},
	];

	const sendModel = async(rowData) => {
	 console.log("row data is",rowData)
	 try {
		const userEmail = JSON.parse(sessionStorage.getItem("user"));
		console.log(userEmail.email)
		const obj = { updateKey: "modelerRequest", data: { modelerId: userEmail.email, status: true, productId: rowData.productId }, productKey: productkey };
		console.log("obj is ",obj);
		const res = await axios.patch("https://eozoyxa2xl.execute-api.ap-south-1.amazonaws.com/prod/quleepdataformodel", obj);
		console.log("res is ",res)

		console.log(res);
		if (res.data === "Reassigned") {
			return toast.error("Model Already requested!!!");
		}
		toast.success("Model requested Successfully!!!")
	} catch (error) {
		toast.error("Something Went Wrong!!!");
		console.log(error);
	}
	};

	useEffect(() => {
		const fetchDataForProducts =  () => {
			if (data && Array.isArray(data)) {
				
					const results= data.map(async (item, index) => {
						
						
						return {
							id: index, // Unique `id` for DataGrid
							modelerId: item.modelerId, 
							productId: item.Id, 
							Image: item.image && item.images[0], 
						};
					});

				 console.log("resuts is ",results)
					setModelData(results); 
				 
			}
		};

		fetchDataForProducts();
	}, [data]);
 
	useEffect(() => {
		if (data && Array.isArray(data)) {
			const results = data?.map((item, index) => {
				return {
					id: index, // Unique `id` for DataGrid
					productId: item.id,
					image: item.image && item.image[0], // Assuming `images` is an array
				};
			});
	
			console.log("results is", results);
			setModelData(results); // Directly set the transformed data
		}
	}, [data]);
	
	console.log("modeldata is ",modelData)
	return (
		<div className="model-requested-table">
			<Navbar />
			<Toaster />
			<div style={{ 
			display: 'flex', 
			justifyContent: 'center', 
			 backgroundColor: '#f8f9fa',
			height: '100vh' // Full viewport height for vertical centering
		}}>
			<Box   sx={{ 
					display: 'flex', 
					justifyContent: 'center', 
					marginTop: '50px', 
					
				}}>
			<Box 
					sx={{ 
						height: 520, 
						width: '100%', // Set a width percentage to keep it centered
						backgroundColor: '#f8f9fa', 
						padding: '20px', 
						borderRadius: '10px' 
					}}
				>
					 <h2 className='requestmodelheading'>Request Models</h2>
					
				<DataGrid
					rows={modelData} 
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
							fontSize:'18px',
							display: 'flex',
						 justifyContent: 'center',  
							 alignItems: 'center',
						},
						'& .MuiDataGrid-row': {
							backgroundColor: '#fff', // Set background color for rows
							marginBottom: '20px', // Margin between rows
						},
					 '& .MuiDataGrid-columnHeaders': {
					 backgroundColor:'red',
			 marginBottom: '20px',
						
		fontWeight: 'bold',
		fontSize: '16px',
		textAlign: 'center',
	}
					}}
				/>
				</Box>
			</Box>
			</div>
		</div>
	);
};

export default ClientRequestModelTable;
