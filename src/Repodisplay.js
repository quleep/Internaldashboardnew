import React from 'react'
import { Box, TextField, Button, Card, CardContent, Typography, Grid } from '@mui/material';
import { Search as SearchIcon } from 'lucide-react';

const Repodisplay = () => {
    const mockData = [
        {
            productName: 'Product 1',
            brandName: 'Brand A',
            category: 'Electronics',
            subcategory: 'Mobile Phones',
            dimensions: '5.5 x 2.9 x 0.30 inches',
            imageUrl: 'https://via.placeholder.com/150'
        },
        {
            productName: 'Product 1',
            brandName: 'Brand A',
            category: 'Electronics',
            subcategory: 'Mobile Phones',
            dimensions: '5.5 x 2.9 x 0.30 inches',
            imageUrl: 'https://via.placeholder.com/150'
        },
        {
            productName: 'Product 1',
            brandName: 'Brand A',
            category: 'Electronics',
            subcategory: 'Mobile Phones',
            dimensions: '5.5 x 2.9 x 0.30 inches',
            imageUrl: 'https://via.placeholder.com/150'
        },
        {
            productName: 'Product 1',
            brandName: 'Brand A',
            category: 'Electronics',
            subcategory: 'Mobile Phones',
            dimensions: '5.5 x 2.9 x 0.30 inches',
            imageUrl: 'https://via.placeholder.com/150'
        },     {
            productName: 'Product 1',
            brandName: 'Brand A',
            category: 'Electronics',
            subcategory: 'Mobile Phones',
            dimensions: '5.5 x 2.9 x 0.30 inches',
            imageUrl: 'https://via.placeholder.com/150'
        },     {
            productName: 'Product 1',
            brandName: 'Brand A',
            category: 'Electronics',
            subcategory: 'Mobile Phones',
            dimensions: '5.5 x 2.9 x 0.30 inches',
            imageUrl: 'https://via.placeholder.com/150'
        },     {
            productName: 'Product 1',
            brandName: 'Brand A',
            category: 'Electronics',
            subcategory: 'Mobile Phones',
            dimensions: '5.5 x 2.9 x 0.30 inches',
            imageUrl: 'https://via.placeholder.com/150'
        },
    ];
  return (
    <div>
 <Box sx={{ flexGrow: 1, p: 3 }}>
            <Box sx={{ pb: 2, display: 'flex', gap: 2 }}>
                <TextField id="search-field" label="Search" variant="outlined" size="small" />
                <Button variant="contained" endIcon={<SearchIcon size={20} />} >
                    Search
                </Button>
            </Box>
            <Grid container spacing={2} >
                {mockData.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <Card >
                            <CardContent  sx={{display:'flex', flexDirection:'column', justifyContent:'flex-start', alignItems:'start'}}>
                                <Typography variant="h6" gutterBottom>
                                    {item.productName}
                                </Typography>
                                <img src={item.imageUrl} alt={item.productName} style={{ maxWidth: '100%', maxHeight: '200px', marginBottom: '10px'}} />
                                <Typography variant="body1">Brand: {item.brandName}</Typography>
                                <Typography variant="body1">Category: {item.category} - {item.subcategory}</Typography>
                                <Typography variant="body1">Dimensions: {item.dimensions}</Typography>
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
