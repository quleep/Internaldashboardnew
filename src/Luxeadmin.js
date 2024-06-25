import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import { FaTimes } from 'react-icons/fa';

//
import axios from 'axios';
import CancelIcon from '@mui/icons-material/Cancel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import CheckIcon from '@mui/icons-material/Check';
import './Luxeadmin.css'


//

const imageContainerLaptopView = {
  gridTemplateColumns: 'repeat(3, 1fr)',
  display: 'grid',
  gap: '7px',
  padding: '3px',
  marginTop: '5px'
}


const Luxeadmin = () => {

  const [serviceList, setServiceList] = useState([{ productsize: "", productpriceinr: '', productpriceusd: '', productdeliverytime: '', productgst: '', productfreight: '' }]);

  const [servicevalue, setServiceValue] = useState();
  const [glbFile, setGlbFile] = useState([]);


  //

  const handleServiceAdd = () => {
    setServiceList([...serviceList, { productsize: "", productpriceinr: '', productpriceusd: '', productdeliverytime: '', productgst: '', productfreight: '' }]);
  };

  const [formData, setFormData] = useState({
    Id: new Date().getTime().toString(),
    productName: '',
    categoryName: '',
    style: '',
    design: '',
    collection: '',
    discount: '',
    ratings: '',
    discription: '',
    tags: '',
    imagePath: ''
  })

  const [imageData, setImageData] = useState("");
  const [tagArr, setTagArr] = useState([]);
  const [paths, setImagePaths] = useState([]);

  const [uploading, setUploading] = useState(false);


  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageData(e.target.files[0]);
    } else {
      console.log("No file selected");
    }
  };

  useEffect(() => {
    setFormData({ ...formData, imagePath: paths, tags: tagArr });
  }, [paths, tagArr])

  async function storeData() {
    try {
      // console.log(formData)
      // setFormData({ ...formData, imagePath: paths, tags:tagArr});
      console.log(paths);
      const data = ({ ...formData, servicesData: serviceList });
      if (formData.productName === '' || formData.categoryName === '' || formData.style === '' || formData.design === '' || formData.collection === '' || formData.discount === '' || formData.ratings === '' || formData.discription === '' || formData.imagePath === '' || formData.tags.length <= 0) {
        return alert("Fill all the fields");
      }
      console.log(data);
      for (const service of serviceList) {
        if (service.productsize === '' || service.productpriceinr === '' || service.productpriceusd === '' || service.productdeliverytime === '') {
          return alert("Fill all the Product Details");
        }
      }
      var res = await axios.post('https://eozoyxa2xl.execute-api.ap-south-1.amazonaws.com/prod/newproducts', (data))
      // const jsonResponse = await res.json();
      console.log("Data Stored Successfully!!!", data);
      alert("Data Uploaded Successfully!!!");
      window.location.href = "luxeadmin"
    } catch (error) {
      console.log(error);
    }
  }




  const fileToBase64 = (file, cb) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      cb(null, reader.result)
    }
    reader.onerror = function (error) {
      cb(error, null)
    }
  }
  const fileselectglb = (e) => {

    let files = Array.from(e.target.files);
    files.forEach((file) => {
      fileToBase64(file, (err, result) => {
        if (result) {
          setGlbFile(prevFiles => [...prevFiles, file]);
          setImagePaths(prevPaths => [...prevPaths, `https://newiamuserbucket.s3.ap-south-1.amazonaws.com/user1/${file.name}`]);
          // setGlbFile(file);
        }
      });
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {

        }
      };

      reader.readAsDataURL(file);
    });
    // alert("Image Select Successfully!!!");
    console.log(files);
  }


  async function storeImage() {
    console.log(formData.imagePath, glbFile);
    try {
      setUploading(true);
      for (const glb of glbFile) {
        const res = await axios.post("https://eozoyxa2xl.execute-api.ap-south-1.amazonaws.com/prod/demo", glb.name);
        console.log(glb.name);

        console.log('successfull', res.data);
        const resp = await axios.put(res.data, glb, {
          headers: {
            "Content-Type": "image/jpeg"
          }
        });
        console.log("done", resp);
      }
      if (glbFile.length > 0) {
        // alert("Image Stored Successfully!!!")
        setGlbFile('');
      } else {
        alert("Select the Image first!!!")
      }
      setUploading(false);
    } catch (error) {
      console.log(error);
    }

  }



  const removeTag = (index) => {
    setTagArr(prevFiles => prevFiles.filter((_, i) => i !== index));
  };


  const removeImage = (index) => {
    setGlbFile(prevFiles => prevFiles.filter((e, i) => i !== index));
    setImagePaths(prevPaths => prevPaths.filter((e, i) => i !== index));
  };

  console.log(glbFile);


  const calculateGST = (price) => {
    return price ? ((price / 100) * 28).toFixed(2) : 'AUTO GST';
  };

  //



  const handleFreightChange = (e, index) => {
    if (e.key === 'Enter') {
      const list = [...serviceList];
      const freightValue = e.target.value;
      const inrValue = list[index]['productpriceinr'];
      if (inrValue) {
        list[index]['productfreight'] = ((freightValue / 100) * inrValue).toFixed(2);
        setServiceList(list);
      } else {
        alert('Enter the Inr value first!!!')
      }
    }
  };

  // */



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

    if (name === 'productpriceinr') {
      list[index]['productgst'] = calculateGST(value);
    }


    setServiceList(list);

  }


  const handleServiceRemove = (index) => {
    const list = [...serviceList];
    list.splice(index, 1)
    setServiceList(list);
  };


  const handletagchange = (e) => {
    const { value } = e.target;
    if (value !== '') {
      setTagArr(prevArr => [...prevArr, value]);
      // Clear the input value after adding the tag
      e.target.value = '';
    }
    if (tagArr.includes(value)) {
      setTagArr(prevFiles => prevFiles.filter((e) => e !== value));
    }
  };

  console.log(serviceList)


  return (
    <div>
      <Navbar />
      <div className='luxeuploadpage' style={{ marginBottom: '10px' }}>

        <div className='luxecontentinside'>
          <div className=''>
            <TextField id="outlined-basic" label="Prouduct name" className='allTheField' variant="outlined" name='productName' value={formData.productName} onChange={handleFormChange} required InputLabelProps={{ sx: { '& .MuiFormLabel-asterisk': { color: 'red', fontSize: '1.5rem' } } }} />

          </div>

          <div className=''>
            <Select id="categoryName" value={formData.categoryName} className='allTheField' name="categoryName" style={{ width: '223px', margin: 'auto', color: formData.categoryName === '' ? '#c4c4c4' : 'inherit' }} onChange={handleFormChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
              <MenuItem value="" >Select Category</MenuItem>
              <MenuItem value="NEW ARRIVAL">NEW ARRIVAL</MenuItem>
              <MenuItem value="VIEW ALL RUGS">VIEW ALL RUGS</MenuItem>
              <MenuItem value="BESTSELLERS">BEST SELLERS</MenuItem>
              <MenuItem value="RUG SWATCH">RUG SWATCH</MenuItem>
              <MenuItem value="ANTIQUE RUGS">ANTIQUE RUGS</MenuItem>
              <MenuItem value="SPECIAL PRICES">SPECIAL PRICES</MenuItem>
              <MenuItem value="MANCHAHA">MANCHAHA</MenuItem>
            </Select>
          </div>

          <div className=''>
            <Select id="styleName" value={formData.style} name="style" style={{ width: '223px', margin: 'auto', color: formData.style === '' ? '#c4c4c4' : 'inherit' }} onChange={handleFormChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
              <MenuItem value="">Select Style</MenuItem>
              <MenuItem value="Modern">Modern</MenuItem>
              <MenuItem value="Transitional">Transitional</MenuItem>
              <MenuItem value="Traditional">Traditional</MenuItem>
            </Select>
          </div>
          <div className=''>
            <Select id="designName" value={formData.design} name="design" style={{ width: '223px', color: formData.design === '' ? '#c4c4c4' : 'inherit' }} onChange={handleFormChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
              <MenuItem value="">Select Design</MenuItem>
              <MenuItem value="Abstract">Abstract</MenuItem>
              <MenuItem value="Oriental and Traditional">Oriental and Traditional</MenuItem>
              <MenuItem value="Moroccan and Tribal">Moroccan and Tribal</MenuItem>
              <MenuItem value="Vintage and Distressed">Vintage and Distressed</MenuItem>
              <MenuItem value="Floral and Tropical">Floral and Tropical</MenuItem>
              <MenuItem value="Geometric and Stripes">Geometric and Stripes</MenuItem>
              <MenuItem value="Graphic and Art Deco">Graphic and Art Deco</MenuItem>
              <MenuItem value="Solid">Solid</MenuItem>
              <MenuItem value="Patchwork">Patchwork</MenuItem>
            </Select>
          </div>
          <div className=''>
            <Select id="collectionName" value={formData.collection} name="collection" style={{ width: '223px', color: formData.collection === '' ? '#c4c4c4' : 'inherit' }} onChange={handleFormChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
              <MenuItem value="">Select Collection</MenuItem>
              <MenuItem value="Acar">Acar</MenuItem>
              <MenuItem value="Aurora">Aurora</MenuItem>
              <MenuItem value="Clan">Clan</MenuItem>
              <MenuItem value="Cyanna">Cyanna</MenuItem>
              <MenuItem value="Far East">Far East</MenuItem>
              <MenuItem value="Kasbah">Kasbah</MenuItem>
              <MenuItem value="Savana">Savana</MenuItem>
              <MenuItem value="Vintage">Vintage</MenuItem>
            </Select>
          </div>
          <div className=''>
            <TextField id="outlined-basic" label="Discount" variant="outlined" name='discount' value={formData.discount} onChange={handleFormChange} required InputLabelProps={{ sx: { '& .MuiFormLabel-asterisk': { color: 'red', fontSize: '1.5rem' } } }} />

          </div>
          <div className=''>
            <TextField id="outlined-basic" type='number' label="Ratings" variant="outlined" name='ratings' value={formData.ratings} onChange={handleFormChange} required InputLabelProps={{ sx: { '& .MuiFormLabel-asterisk': { color: 'red', fontSize: '1.5rem' } } }} />

          </div>
          <div className=''>
            <div style={{ height: '200px', width: '223px', margin: 'auto', padding: '7px', borderRadius: '5px', border: '1px solid #c4c4c4', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflowY: 'auto', overflowX: 'auto', }} variant="outlined">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '3px', marginBottom: '10px' }}>
                {tagArr.map((e, i) => {
                  return <div key={i} style={{ border: '1px solid black', borderRadius: '7px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '3px' }}>{e}
                    {console.log(e)}
                    <CancelIcon style={{ height: '2.5vh', width: '2.5vw', cursor: 'pointer' }} onClick={() => removeTag(i)} />
                  </div>
                })}
              </div>
              <Select id="styleTags" value={''} name="tags" style={{ width: '207px', color: formData.tags.length === 0 ? '#c4c4c4' : 'inherit' }} onChange={handletagchange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                <MenuItem value="">Select Tags</MenuItem>
                <MenuItem value="Acar"> {tagArr.includes("Acar") ? <CheckIcon style={{ color: 'green' }} /> : null} Acar</MenuItem>
                <MenuItem value="Aurora"> {tagArr.includes("Aurora") ? <CheckIcon style={{ color: 'green' }} /> : null} Aurora</MenuItem>
                <MenuItem value="Clan"> {tagArr.includes("Clan") ? <CheckIcon style={{ color: 'green' }} /> : null} Clan</MenuItem>
                <MenuItem value="Cyanna"> {tagArr.includes("Cyanna") ? <CheckIcon style={{ color: 'green' }} /> : null} Cyanna</MenuItem>
                <MenuItem value="Letest"> {tagArr.includes("Letest") ? <CheckIcon style={{ color: 'green' }} /> : null} Letest</MenuItem>
                <MenuItem value="Transitional">{tagArr.includes("Transitional") ? <CheckIcon style={{ color: 'green' }} /> : null} Transitional</MenuItem>
                <MenuItem value="Traditional">{tagArr.includes("Traditional") ? <CheckIcon style={{ color: 'green' }} /> : null} Traditional</MenuItem>
              </Select>
            </div>
          </div>

          <div className=''>
            <textarea id="AreaDescription" label="Description" variant="outlined" placeholder='Description *' name='discription' value={formData.discription} onChange={handleFormChange} required InputLabelProps={{ sx: { '& .MuiFormLabel-asterisk': { color: 'red', fontSize: '1.5rem' } } }} />
          </div>

          <div>
            <div>
              <i>About Product</i>
              <div  >
                {
                  serviceList && serviceList.map((item, index) => (
                    <div key={index} className='' style={{ display: 'grid', gridTemplateColumns: "repeat(4, 1fr)", gap: '10px', marginLeft: '10px', justifyContent: 'center', alignItems: 'center', marginTop: '15px' }} >
                      <Select id="styleSize" value={item.productsize ? item.productsize : ""} name="productsize" onChange={(e) => handleServiceChange(e, index)} style={{ color: item.productsize === '' ? '#c4c4c4' : 'inherit' }} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                        <MenuItem value="">Select Size</MenuItem>
                        <MenuItem value="60X90">60X90</MenuItem>
                        <MenuItem value="90X150">90X150</MenuItem>
                        <MenuItem value="120X180">120X180</MenuItem>
                        <MenuItem value="150X240">150X240</MenuItem>
                        <MenuItem value="180X270">180X270</MenuItem>
                        <MenuItem value="240X300">240X300</MenuItem>
                        <MenuItem value="270X360">270X360</MenuItem>
                        <MenuItem value="300X420">300X420</MenuItem>
                        <MenuItem value="360X450">360X450</MenuItem>
                        <MenuItem value="Oversize">Oversize</MenuItem>

                      </Select>


                      <TextField
                        name="productpriceinr"
                        type="number"
                        id="service"
                        variant='outlined'
                        // label="Product price inr"
                        label="INR"
                        value={item.productpriceinr}
                        onChange={(e) => handleServiceChange(e, index)}
                        required
                        InputLabelProps={{ sx: { '& .MuiFormLabel-asterisk': { color: 'red', fontSize: '1.5rem' } } }}
                      />
                      <TextField
                        name="productpriceusd"
                        type="number"
                        id="service"
                        variant='outlined'
                        // label="Product price usd"
                        label="USD"

                        value={item.productpriceusd}
                        onChange={(e) => handleServiceChange(e, index)}
                        required
                        InputLabelProps={{ sx: { '& .MuiFormLabel-asterisk': { color: 'red', fontSize: '1.5rem' } } }}
                      />

                      <TextField
                        name="productdeliverytime"
                        type="text"
                        id="service"
                        // label="Product delivery time"
                        label="Delivery Time"
                        variant='outlined'

                        value={item.productdeliverytime}
                        onChange={(e) => handleServiceChange(e, index)}
                        required
                        InputLabelProps={{ sx: { '& .MuiFormLabel-asterisk': { color: 'red', fontSize: '1.5rem' } } }}
                      />

                      <TextField
                        name="productgst"
                        type="text"
                        id="service"
                        label={"GST"}
                        // label={item.productpriceinr?null:"GST"}
                        variant='outlined'
                        disabled
                        value={item.productgst ? item.productgst : "GST"}
                        // onChange={(e) => handleServiceChange(e, index)}
                        required
                        InputLabelProps={{ sx: { '& .MuiFormLabel-asterisk': { color: 'red', fontSize: '1.5rem' } } }}
                      />


                      <TextField
                        name="productfreight"
                        type="text"
                        id="service"
                        label="Freight"
                        variant='outlined'

                        value={item.productfreight}
                        onChange={(e) => handleServiceChange(e, index)}
                        onKeyDown={(e) => handleFreightChange(e, index)}
                        required
                        InputLabelProps={{ sx: { '& .MuiFormLabel-asterisk': { color: 'red', fontSize: '1.5rem' } } }}
                      />

                      <div style={{ display: "flex", justifyContent: serviceList.length > 0 ? "center" : "space-evenly", alignItems: "center" }}>



                        <div >
                          {serviceList.length - 1 === index && (

                            <span
                              onClick={handleServiceAdd}
                              className="add-btn" ><i style={{ fontSize: '30px' }} class='bx bx-message-square-add'></i></span>
                          )}
                        </div>



                        <div className="second-division">
                          {serviceList.length !== 1 && (

                            <span
                              onClick={() => handleServiceRemove(index)}
                              className="remove-btn" ><i style={{ fontSize: '30px' }} class='bx bx-message-square-minus' ></i></span>

                          )}
                        </div>

                      </div>

                    </div>

                  ))}

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
              <VisuallyHiddenInput type="file" multiple onChange={fileselectglb} />
            </Button>

          </div>
          <div>

            {uploading ?
              // <LoadingButton loading variant="contained" >
              //   Submit
              // </LoadingButton>
              <Button disabled>Uploading...</Button> :
              <Button variant='contained' onClick={() => storeImage()}>
                Submit images
              </Button>
            }
          </div>

          <div>

            <Button variant='contained' onClick={() => storeData()}>
              Submit Data
            </Button>
          </div>

          {glbFile.length > 0 ? <div className='imageContainer' style={imageContainerLaptopView}>
            {/* {console.log(glbFile)} */}
            {glbFile.map((e, index) => {
              return <div style={{ marginTop: '5px', display: 'flex' }}>
                <div key={index} style={{}}>
                  <img src={URL.createObjectURL(e)} alt={e.name} style={{ height: '80px', width: '80px' }}></img>
                </div>
                <CancelIcon style={{ height: '2vh', width: '2vw', cursor: 'pointer' }} onClick={() => removeImage(index)} />
              </div>
            })}
          </div> : ''}

        </div>

      </div>


    </div>
  )
}

export default Luxeadmin
