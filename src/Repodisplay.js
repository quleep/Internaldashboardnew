import React, { useState } from 'react'
import { Box, TextField, Button, Card, CardContent, Typography, Grid } from '@mui/material';
import { Search as SearchIcon } from 'lucide-react';
import axios from 'axios';
import QRCode from 'react-qr-code';

const Repodisplay = () => {

    const [searchdata, setSearchData] = useState()
    const searchurl = 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/searchcenteralrepo'
    const [searchoutput, setSearchOutput] = useState()

    const handlesearch = async (e)=>{
        e.preventDefault()
        const body = {
            item : searchdata.toLowerCase()
        }

        try{
            await axios.post(searchurl, body).then(res=>{
                if(res.status === 200){
                    setSearchOutput(res.data)
                }
            })
        }catch(error){
            window.alert(error.response.data)
        }
    }
  return (
    <div className='uploadrepomain'>
            <Box sx={{ pb: 2, display: 'flex', gap: 2 , justifyContent:'center', alignItems:'center'}}>
                <TextField id="search-field" label="Search" onChange={(e)=>setSearchData(e.target.value)} variant="outlined" size="small" />
                <Button variant="contained" onClick={handlesearch} endIcon={<SearchIcon size={20} />} >
                    Search
                </Button>
            </Box>
 <Box sx={{ flexGrow: 1, p: 3 }}>
        
            
            <Grid container spacing={2} >
                {searchoutput?.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <Card sx={{width:'max-content'}} >
                            <CardContent  sx={{display:'flex', flexDirection:'column', justifyContent:'flex-start', alignItems:'start'}}>
                                <Typography variant="h6" gutterBottom>
                                    {item.productname}
                                </Typography>
                                <img src={item.imageurl} alt={item.productname} style={{ maxWidth: '100%', maxHeight: '200px', marginBottom: '10px'}} />
                                <Typography variant="body1">Brand: {item.brandname}</Typography>
                                <Typography variant="body1">Category: {item.category} - {item.subcategory}</Typography>
                                <Typography variant="body1">Dimensions: {item.productlength} * {item.productwidth} * {item.productheight} {item.dimensionunit}</Typography>
                                 <Button
                                   sx={{margin:'5px'}}
                                 variant='contained'
                                 >
                                 Download glb url
                                 </Button>
                                 <Button
                                  sx={{margin:'5px'}}
                                 variant='contained'
                                 >
                                 Download usdz url
                                 </Button>
                                 <Button
                                 variant='contained'
                                 sx={{margin:'5px'}}
                                 >
                                 Download fbx url
                                 </Button>
                                 <Button
                                 variant='contained'
                                 sx={{margin:'5px'}}
                                 >
                                 Download obj url
                                 </Button>
                                 <QRCode  size={100}  viewBox='0 0 200 200' value={`arnxt.com/view?id=${item.Id}`} />
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
      
    </div>
  )
}

export default Repodisplay
