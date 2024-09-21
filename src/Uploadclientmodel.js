import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import { Container, TextField, Grid, Button, Select, MenuItem, InputLabel, FormControl, styled, Typography, autocompleteClasses, Alert } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { Toaster, toast } from "react-hot-toast";


const Uploadclientmodel = () => {

  const history = useHistory()

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

  const [glbfilename, setGlbFileName] = useState()
  const [usdzfilename, setUsdzFileName] = useState()
  const [imagefilename, setImageFileName] = useState()

  const [glbfile, setGlbFile] = useState()
  const [fbxfile, setFbxFile] = useState()

  const [usdzfile, setUsdzFile] = useState()
  const [imagefile, setImageFile] = useState()


  const modelernameurl = 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/fetchmodelerclient';
  const modelernameurlquleep = 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/getmodelertaskquleep';

  const uploadfileurl = 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/uploadfilerepo'
  const uploadallfilesquleepurl = 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/uploadfilesquleep'
  const uploadallfilesurl = 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/uploadfilesclient'

  const [clientdata, setClientData] = useState()


  const [uploadurls, setUploadUrls] = useState({
    glburl: '',
    usdzurl: '',
    imageurl: '',
    fbxurl: ''


  })


  const userdata = sessionStorage.getItem('user')
  let useremail = JSON.parse(userdata)
  let loginuser = useremail.email

  useEffect(() => {





  }, [])

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

  const fileselectglb = (e, index) => {



    let val = document.getElementById(`glbfile_${index}`).value;
    let indx = val.lastIndexOf(".") + 1;
    let filetype = val.substr(indx, val.length).toLowerCase();


    if (filetype === 'glb') {
      let files = Array.from(e.target.files);
      files.forEach((file) => {
        fileToBase64(file, (err, result) => {
          if (result) {
            setGlbFile(file);

          }
        });

        const reader = new FileReader();

        reader.onload = () => {
          if (reader.readyState === 2) {

          }
        };

        reader.readAsDataURL(file);
      });


    } else {

      window.alert('please select a glb file')
      document.getElementById(`glbfile_${index}`).value = ''

      return

    }


  }

  const fileselectusdz = (e, index) => {

    let val = document.getElementById(`usdzfile_${index}`).value;
    let indx = val.lastIndexOf(".") + 1;
    let filetype = val.substr(indx, val.length).toLowerCase();

    if (filetype === 'usdz') {
      let files = Array.from(e.target.files);
      files.forEach((file) => {
        fileToBase64(file, (err, result) => {
          if (result) {
            setUsdzFile(file);

          }
        });

        const reader = new FileReader();

        reader.onload = () => {
          if (reader.readyState === 2) {

          }
        };

        reader.readAsDataURL(file);
      });
    } else {

      window.alert('please select an usdz file')
      document.getElementById(`usdzfile_${index}`).value = ''

      return

    }
  }

  const uploadUsdzFile = async (index) => {

    if (document.getElementById(`usdzfile_${index}`).value === '') {
      window.alert('Please select an usdz file')
      return
    }

    const url = uploadfileurl;
    await fetch(url, {
      method: "POST",
      body: usdzfile.name

    }).then((res) => res.json())
      .then((res) => {

        fetch(res.uploadURL, {

          method: "PUT",
          headers: {
            "ContentType": "image/jpeg",

          },

          body: usdzfile


        })
          .then((res) => {

            if (res.status === 200) {

              let resnew = res.url.split('?')
              let imgurl = resnew[0]

              setUploadUrls({
                ...uploadurls,
                ['usdzurl']: imgurl
              })

              document.getElementById(`alertdivusdzfile_${index}`).style.display = 'flex'



            }

          })
          .catch((err) => console.log(err))

      })
      .catch((err) => console.log(err))


  }


  const uploadFbxFile = async (index) => {

    console.log(document.getElementById(`fbxfile_${index}`).value)
    if (document.getElementById(`fbxfile_${index}`).value === '') {
      window.alert('Please select a fbx file')
      return
    }

    const url = uploadfileurl;
    await fetch(url, {
      method: "POST",
      body: fbxfile.name

    }).then((res) => res.json())
      .then((res) => {

        fetch(res.uploadURL, {

          method: "PUT",
          headers: {
            "ContentType": "image/jpeg",

          },

          body: fbxfile


        })
          .then((res) => {

            if (res.status === 200) {

              let resnew = res.url.split('?')
              let imgurl = resnew[0]

              setUploadUrls({
                ...uploadurls,
                ['fbxurl']: imgurl
              })

              document.getElementById(`alertdivfbxfile_${index}`).style.display = 'flex'



            }

          })
          .catch((err) => console.log(err))

      })
      .catch((err) => console.log(err))


  }




  const uploadGlbFile = async (index) => {

    console.log(document.getElementById(`glbfile_${index}`).value)
    if (document.getElementById(`glbfile_${index}`).value === '') {
      window.alert('Please select a glb file')
      return
    }

    const url = uploadfileurl;
    await fetch(url, {
      method: "POST",
      body: glbfile.name

    }).then((res) => res.json())
      .then((res) => {

        fetch(res.uploadURL, {

          method: "PUT",
          headers: {
            "ContentType": "image/jpeg",

          },

          body: glbfile


        })
          .then((res) => {

            if (res.status === 200) {

              let resnew = res.url.split('?')
              let imgurl = resnew[0]

              setUploadUrls({
                ...uploadurls,
                ['glburl']: imgurl
              })

              document.getElementById(`alertdivglbfile_${index}`).style.display = 'flex'



            }

          })
          .catch((err) => console.log(err))

      })
      .catch((err) => console.log(err))


  }

  async function getImageDimensions(base64) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.onerror = (error) => {
        reject(error);
      };
      img.src = base64;
    });
  }


  const fileselectfbx = (e, index) => {

    let val = document.getElementById(`fbxfile_${index}`).value;
    let indx = val.lastIndexOf(".") + 1;
    let filetype = val.substr(indx, val.length).toLowerCase();


    if (filetype === 'fbx') {
      let files = Array.from(e.target.files);
      files.forEach((file) => {
        fileToBase64(file, (err, result) => {
          if (result) {
            setFbxFile(file);

          }
        });

        const reader = new FileReader();

        reader.onload = () => {
          if (reader.readyState === 2) {

          }
        };

        reader.readAsDataURL(file);
      });


    } else {

      window.alert('please select a fbx file')
      document.getElementById(`fbxfile_${index}`).value = ''

      return

    }

  }


  const fileselectimage = (e, index) => {

    let val = document.getElementById(`imagefile_${index}`).value;
    let indx = val.lastIndexOf(".") + 1;
    let filetype = val.substr(indx, val.length).toLowerCase();

    if (filetype === 'jpeg' || filetype === 'jpg' || filetype === 'png') {


      let files = Array.from(e.target.files);
      files.forEach((file) => {
        fileToBase64(file, async (err, result) => {
          if (result) {

            await getImageDimensions(result).then(res => {
              if (res.width !== 600 && res.height !== 600) {
                window.alert('Image should be 600 * 600')
                return
              } else {
                setImageFile(file);
              }
            })


          }
        });

        const reader = new FileReader();

        reader.onload = () => {
          if (reader.readyState === 2) {

          }
        };

        reader.readAsDataURL(file);
      });
    } else {

      window.alert('Only jpeg jpg png files are allowed')
      document.getElementById(`imagefile_${index}`).value = ''

      return

    }
  }

  const uploadImageFile = async (index) => {
    if (document.getElementById(`imagefile_${index}`).value === '') {
      window.alert('Please select an jpeg,jpg,png file')
      return
    }

    const url = uploadfileurl;
    await fetch(url, {
      method: "POST",
      body: imagefile.name

    }).then((res) => res.json())
      .then((res) => {

        fetch(res.uploadURL, {

          method: "PUT",
          headers: {
            "ContentType": "image/jpeg",

          },

          body: imagefile


        })
          .then((res) => {

            if (res.status === 200) {

              let resnew = res.url.split('?')
              let imgurl = resnew[0]

              setUploadUrls({
                ...uploadurls,
                ['imageurl']: imgurl
              })

              document.getElementById(`alertdivimagefile_${index}`).style.display = 'flex'

            }

          })
          .catch((err) => console.log(err))

      })
      .catch((err) => console.log(err))


  }




  const handlesubmitdata = async (id, index) => {
    if (uploadurls.glburl === '' || uploadurls.imageurl === '' || uploadurls.usdzurl === '') {
      window.alert('please upload all files')
      return
    } else {

      const body = {
        Id: id,
        glburl: uploadurls.glburl,
        usdzurl: uploadurls.usdzurl,
        imageurl: uploadurls.imageurl,
        modeluploaddate: new Date().toString()
      }

      const response = await axios.post(uploadallfilesurl, body)
      if (response.status === 200) {
        window.alert('Date submitted')
        document.getElementById(`glbfile_${index}`).value = ''
        document.getElementById(`alertdivglbfile_${index}`).style.display = 'none'
        document.getElementById(`usdzfile_${index}`).value = ''
        document.getElementById(`alertdivusdzfile_${index}`).style.display = 'none'

        document.getElementById(`imagefile_${index}`).value = ''
        document.getElementById(`alertdivimagefile_${index}`).style.display = 'none'
        setUploadUrls({
          glburl: '',
          usdzurl: '',
          imageurl: '',

        })
        handlecheckclienttask()

      }

    }

  }

  const handlesubmitdataquleep = async (id, index) => {

    if (uploadurls.glburl === '' || uploadurls.imageurl === '' || uploadurls.usdzurl === '' || uploadurls.fbxurl === '') {
      window.alert('please upload all files')
      return
    } else {

      const body = {
        Id: id,
        glburl: uploadurls.glburl,
        usdzurl: uploadurls.usdzurl,
        fbxurl: uploadurls.fbxurl,
        imageurl: uploadurls.imageurl,
        modeluploaddate: new Date().toString()
      }

      const response = await axios.post(uploadallfilesquleepurl, body)
      if (response.status === 200) {
        window.alert('Date submitted')
        document.getElementById(`glbfile_${index}`).value = ''
        document.getElementById(`alertdivglbfile_${index}`).style.display = 'none'
        document.getElementById(`usdzfile_${index}`).value = ''
        document.getElementById(`alertdivusdzfile_${index}`).style.display = 'none'
        document.getElementById(`fbxfile_${index}`).value = ''
        document.getElementById(`alertdivfbxfile_${index}`).style.display = 'none'
        document.getElementById(`imagefile_${index}`).value = ''
        document.getElementById(`alertdivimagefile_${index}`).style.display = 'none'
        setUploadUrls({
          glburl: '',
          usdzurl: '',
          imageurl: '',
          fbxurl: ''
        })
        handlecheckquleeptask()

      }

    }

  }

  const handlecheckclienttask = () => {

    const fetchuser = async () => {

      const emailbody = {
        modeler: loginuser
      }

      try {
        const response = await axios.post(modelernameurl, emailbody)


        if (response.data.length > 0) {
          setClientData(response.data)
        } else {
          window.alert('currently you dont have any task assigned')
          setClientData()
        }


      } catch (error) {
        console.log(error)
      }

    }

    fetchuser()

  }

  const handlecheckquleeptask = () => {
    const fetchuser = async () => {

      const emailbody = {
        modeler: loginuser
      }

      try {
        const response = await axios.post(modelernameurlquleep, emailbody)
        if (response.data.length > 0) {
          setClientData(response.data)
        } else {
          window.alert('currently you dont have any task assigned')
          setClientData()
        }


      } catch (error) {
        console.log(error)
      }

    }

    fetchuser()

  }

  const categories = [
    "Furniture",
    "Walls",
    "Floors",
    "Furnishing",
    "Decorative",
    "Upholstery",
    "Electronics",
    "Electrical",
    "Bathroom"
  ]

  const subcategories = {
    Furniture: [
      "Bar Stool",
      "Cabinet",
      "Wardrobe",
      "Side Table",
      "Dining Table",
      "Coffee Table",
      "Chair",
      "Bed",
      "Sideboard",
      "Center Table",
      "Bedside Table",
      "Stool",
      "Beanbag",
      "Sofa",
      "Bookshelf",
      "Study Table",
      "Bench",
      "Table"
    ]
    ,
    Walls: [],
    Floors: [
      "Tiles",
      "Natural Stone",
      "Wood",
      "Vinyl"
    ],
    Furnishing: [
      "Rugs",
      "Blinds",
      "Quilts",
      "Curtains"
    ],
    Decorative: [
      "Metal Art",
      "Painting",
      "Indoor plants"
    ],
    Upholstery: [],
    Electronics: [
      "AC",
      "Microwave",
      "Washing Machine",
      "Refrigerator",
      "TV"
    ],
    Electrical: [
      "Light",
      "Chandelier",
      "Switch",
      "Floor Lamp",
      "Fan",
      "Water Filter",
      "Chimney",
      "Geyser"
    ],
    Bathroom: [
      "Bathtub",
      "Basin",
      "Faucet",
      "Shower",
      "Commode"
    ]
  }

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');

  const [requestModel, setRequestModel] = useState(false);
  const [selectedModel, setSelectedModel] = useState();
  let debounceTimer;

  // const handleInputChange = (event) => {
  //   setSearchTerm(event.target.value);

  //   if(debounceTimer){
  //     clearTimeout(debounceTimer);
  //   }

  //   debounceTimer = setTimeout(()=> {
  //     setDebouncedTerm(event.target.value);
  //     // console.log(searchTerm);
  //   }, 700)

  // }



  // let searchbox = [];
  const [searchbox, setSearchbox] = useState([]);
  const [showProductImage, setShowProductImage] = useState(false);

  const [perameter, setPerameter] = useState([]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    setShowProductImage(false);
    setRequestModel(false);

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    debounceTimer = setTimeout(() => {
      const term = event.target.value.toLowerCase();
      setDebouncedTerm(term);

      // Reset the searchbox state to an empty array before performing the search
      setSearchbox([]);

      const results = [];

      // Search in categories
      categories.forEach(category => {
        if (category.toLowerCase().includes(term)) {
          // Add matching category to the results array
          results.push(category);
        }
      });

      // Search in subcategories
      Object.keys(subcategories).forEach(category => {
        subcategories[category].forEach(subcategory => {
          if (subcategory.toLowerCase().includes(term)) {
            // Add matching subcategory to the results array
            results.push(subcategory);
          }
        });
      });

      // Set the searchbox state with the results
      // setSearchbox(results);
      setPerameter(results);

    }, 700);
  }


  async function searchedData(item) {
    setSearchTerm(item);
    setSearchbox([]);
    setDebouncedTerm(item.toLowerCase());
    submitModel(item.toLowerCase());
  }


  async function requestModelFun(id) {
    setRequestModel(!requestModel);
    setSelectedModel(id);
    console.log(id);
  }


  async function sendModel() {
    console.log(selectedModel);
    try {
      const userEmail = JSON.parse(sessionStorage.getItem("user"));
      console.log(userEmail.email)
      const obj = { updateKey: "modelerRequest", data: {modelerId: userEmail.email, status: true}, productKey: selectedModel };
      console.log(obj);
      const res = await axios.patch("https://eozoyxa2xl.execute-api.ap-south-1.amazonaws.com/prod/quleepdataformodel", obj);
      console.log(res);
      if(res.data === "Reassigned"){
        return toast.error("Model Already Assigned!!!");
      }
      toast.success("Model Assigned Successfully!!!")
    } catch (error) {
      toast.error("Something Went Wrong!!!");
      console.log(error);
    }
  }

  // "ExpressionAttributeValues must not be empty"
  


  async function submitModel(data) {
    try {
      setSearchbox([]);
      console.log(data);
      const res = await axios.post("https://eozoyxa2xl.execute-api.ap-south-1.amazonaws.com/prod/quleepdataformodel", data);
      // setSearchbox(res.data.productname);
      console.log(res);
      const arr = [];
      res?.data?.map((item) => {
        arr.push({ image: item.images, id: item.Id });
      });
      setShowProductImage(true);
      setSearchbox(arr);
    } catch (error) {
      console.log(error);
    }
  }



  useEffect(() => {
    // if (debouncedTerm) {
    //   const fetchData = async () => {
    //     try {
    //       console.log(debouncedTerm)
    //       const res = await axios.post("https://eozoyxa2xl.execute-api.ap-south-1.amazonaws.com/prod/quleepdataformodel", debouncedTerm);
    //       // setSearchbox(res.data.productname);
    //       console.log(res);
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
    //   console.log(`Searching for ${debouncedTerm}`);
    //   fetchData();
    // }
    console.log(searchbox);
  }, [searchbox])




  return (
    <div>
      <Navbar />
      <Toaster />
      <div style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: '40px' }}>
        <button style={{ margin: '10px', border: '1px solid grey', borderRadius: '5px' }} onClick={handlecheckclienttask} >Check client task</button>
        <button style={{ margin: '10px', border: '1px solid grey', borderRadius: '5px' }} onClick={handlecheckquleeptask}>Check quleep task</button>

      </div>

      <div className='clientalldatacontainer'>



        <div className='clientdatamain'>

          {
            clientdata && clientdata.map((item, index) => (
              <div>
                <div className='clientdatainsidecontainer'>
                  <div>
                    <div className='clientdatadiv1'>
                      <span style={{ display: 'flex' }}>  <p className='labelclient'>product Id : </p>  <p >{item.Id}</p></span>
                      <span style={{ display: 'flex' }}>  <p className='labelclient'>product name : </p>  <p>{item.productname}</p></span>
                      {
                        item.timegiven ?
                          <span style={{ display: 'flex' }}>  <p className='labelclient'>platformname : </p>  <p>{item.platformname}</p></span> :
                          <span style={{ display: 'flex' }}>  <p className='labelclient'>Brand : </p>  <p>{item.brandname}</p></span>


                      }

                      <span style={{ display: 'flex' }}>  <p className='labelclient'>Uploaded by :</p>  <p>{item.uploadedby}</p></span>
                      <span style={{ display: 'flex' }}>  <p className='labelclient'>uploaded date :</p>  <p>{item.uploaddate.split(' ').slice(0, 4).join(' ')}</p></span>
                      {
                        item.timegiven ? <span style={{ display: 'flex' }}>  <p className='labelclient'>Assigned on :</p>  <p>{item.modelerassigntime.split(' ').slice(0, 5).join(' ')}</p></span> : ''

                      }

                      {

                        item.timegiven ? <span style={{ display: 'flex' }}>  <p className='labelclient'>Time given :</p>  <p>{item.timegiven}</p></span> : ''
                      }

                    </div>

                  </div>
                  <div>
                    <div className='clientdatadiv2'>

                      <span style={{ display: 'flex' }}>  <p className='labelclient'>product length : </p>  <p >{item.productlength}</p></span>
                      <span style={{ display: 'flex' }}>  <p className='labelclient'>product width : </p>  <p>{item.productwidth}</p></span>
                      <span style={{ display: 'flex' }}>  <p className='labelclient'>product height :  </p>  <p>{item.productheight}</p></span>
                      <span style={{ display: 'flex' }}>  <p className='labelclient'>Unit :</p>  <p>{item.dimensionunit}</p></span>
                      <span style={{ display: 'flex' }}>  <a href={item.productpageurl} target='blank' >Open page url</a></span>
                      {/* <span style={{ display: 'flex' }}>  input </span> */}


                      <div style={{ marginTop: '15px' }}>
                        {/* Container for input and button aligned in a row */}
                        <div style={{ display: 'flex', gap: '5px' }}>
                          <input placeholder='Search Model' value={searchTerm} onChange={handleInputChange} />
                          {/* <button style={{ backgroundColor: 'blue', color: 'white' }} onClick={submitModel}>Submit</button> */}
                          {/* <div>
                            <Button variant='contained' onClick={submitModel} >Submit</Button>
                          </div> */}

                          {/* <button style={{ backgroundColor: 'blue', color: 'white' }} onClick={submitModel}>Submit</button> */}
                          {requestModel && <div>
                            <Button variant='contained' onClick={sendModel}>Request Model</Button>
                          </div>}
                        </div>

                        {/* Search results will be on a new line */}
                        {showProductImage ? (<div className='flex flex-col gap-2' style={{ marginTop: '15px', width: "190px" }}>
                          {searchTerm.length >= 1 && searchbox?.map((item, index) => {
                            return (
                              <div key={index} className='shadow-sm labelclient' style={{ position: "relative" }}>
                                {/*  onClick={() => searchedData(item)} */}
                                {requestModel && item.id === selectedModel && <div style={{ position: "absolute", top: "10px", right: "10px", zIndex: 1 }}>
                                  <svg style={{ height: "25px", width: "25px" }} fill="#40C057" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px"><path d="M 25 2 C 12.317 2 2 12.317 2 25 C 2 37.683 12.317 48 25 48 C 37.683 48 48 37.683 48 25 C 48 20.44 46.660281 16.189328 44.363281 12.611328 L 42.994141 14.228516 C 44.889141 17.382516 46 21.06 46 25 C 46 36.579 36.579 46 25 46 C 13.421 46 4 36.579 4 25 C 4 13.421 13.421 4 25 4 C 30.443 4 35.393906 6.0997656 39.128906 9.5097656 L 40.4375 7.9648438 C 36.3525 4.2598437 30.935 2 25 2 z M 43.236328 7.7539062 L 23.914062 30.554688 L 15.78125 22.96875 L 14.417969 24.431641 L 24.083984 33.447266 L 44.763672 9.046875 L 43.236328 7.7539062 z" /></svg>
                                </div>}
                                <img src={item.image} alt='' style={{ height: "130px", width: "130px", cursor: "pointer" }} onClick={() => requestModelFun(item.id)} />
                              </div>
                            );
                          })}
                        </div>) : (<div className='flex flex-col gap-2' style={{ marginTop: '15px', width: "190px" }}>
                          {searchTerm.length >= 1 && perameter?.map((item, index) => {
                            return (
                              <div key={index} className='shadow-sm labelclient' style={{ cursor: 'pointer' }} onClick={() => searchedData(item)}>
                                {item}
                              </div>
                            );
                          })}
                        </div>)}
                      </div>

                    </div>
                  </div>
                  <div>
                    <div className='clientdatadiv3'>

                      {item.images.length > 0 ?
                        item.images.map((img) => (
                          <img style={{ maxWidth: '300px', maxHeight: '300px', margin: '10px', objectFit: 'contain' }} src={img} />
                        ))

                        : <p>No images available</p>
                      }

                    </div>
                  </div>
                  <div>
                    <div className='clientdatadiv4'>
                      <div style={{ marginTop: '10px', display: 'flex', width: '100%' }}>
                        <div >
                          {/* <Button
                                  component="label"
                            
                                  role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon />}
                                    
                                    >
                                  Upload Glb file
                                <VisuallyHiddenInput type="file"   id= {`glbfile_${index}`}  onChange={(e)=>fileselectglb(e, index)} />
                              </Button> */}

                          <input type='file' id={`glbfile_${index}`} onChange={(e) => fileselectglb(e, index)} />

                        </div>
                        <div style={{ marginLeft: '5px' }}>
                          <Button variant='contained' onClick={() => uploadGlbFile(index)} >Upload Glb</Button>
                        </div>

                        <div className='alertstatusimage' id={`alertdivglbfile_${index}`} >
                          <Alert severity="success" variant='filled' ></Alert>
                        </div>

                      </div>
                      <div style={{ marginTop: '10px', display: 'flex', width: '100%' }}>

                        <div >
                          {/* <Button
                                  component="label"
                                  role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon />}
                                    >
                                  Upload Usdz file
                                <VisuallyHiddenInput type="file" id ={`usdzfile_${index}`} onChange={(e)=>fileselectusdz(e,index)} />
                              </Button> */}

                          <input type="file" id={`usdzfile_${index}`} onChange={(e) => fileselectusdz(e, index)} />

                        </div>

                        <div style={{ marginLeft: '5px' }}>
                          <Button variant='contained' onClick={() => uploadUsdzFile(index)} >Upload Usdz</Button>

                        </div>
                        <div className='alertstatusimage' id={`alertdivusdzfile_${index}`} >
                          <Alert severity="success" variant='filled' ></Alert>
                        </div>


                      </div>

                      {
                        item.timegiven ?


                          <div style={{ marginTop: '10px', display: 'flex', width: '100%' }}>

                            <div >
                              {/* <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                                >
                                Upload Usdz file
                                <VisuallyHiddenInput type="file" id ={`usdzfile_${index}`} onChange={(e)=>fileselectusdz(e,index)} />
                                </Button> */}

                              <input type="file" id={`fbxfile_${index}`} onChange={(e) => fileselectfbx(e, index)} />

                            </div>

                            <div style={{ marginLeft: '5px' }}>
                              <Button variant='contained' onClick={() => uploadFbxFile(index)} >Upload Fbx</Button>

                            </div>
                            <div className='alertstatusimage' id={`alertdivfbxfile_${index}`} >
                              <Alert severity="success" variant='filled' ></Alert>
                            </div>


                          </div> : ''
                      }




                      <div style={{ marginTop: '10px', display: 'flex', width: '100%' }}>

                        <div >
                          {/* <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                            >
                            Upload image
                            <VisuallyHiddenInput type="file" id={`imagefile_${index}`} onChange={(e)=>fileselectimage(e,index)} />
                            </Button> */}

                          <input type="file" id={`imagefile_${index}`} onChange={(e) => fileselectimage(e, index)} />

                        </div>

                        <div style={{ marginLeft: '5px' }}>
                          <Button variant='contained' onClick={() => uploadImageFile(index)} >Upload Image</Button>

                        </div>
                        <div className='alertstatusimage' id={`alertdivimagefile_${index}`} >
                          <Alert severity="success" variant='filled' ></Alert>
                        </div>
                      </div>


                      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        <div >
                          <Button variant='contained' color='secondary' onClick={item.timegiven ? () => handlesubmitdataquleep(item.Id, index) : () => handlesubmitdata(item.Id, index)} >Submit Data</Button>

                        </div>

                      </div>

                      <div style={{ marginTop: '5px', display: 'flex', justifyContent: 'start', alignItems: 'start', width: '100%' }}>
                        <div className='clientdatadiv1'>
                          <span style={{ display: 'flex' }}>  <p className='labelclient'> status : </p>  <p style={item.statusval === 'Models Uploaded' ? { backgroundColor: "green", color: 'white' } : { backgroundColor: 'yellow' }}  >{item.statusval}</p></span>

                        </div>


                      </div>
                      {
                        item.statusval === 'Model Rejected' ?
                          <div style={{ marginTop: '5px', display: 'flex', justifyContent: 'start', alignItems: 'start', width: '100%' }}>
                            <div className='clientdatadiv1'>
                              <span style={{ display: 'flex' }}>  <p className='labelclient'> Remarks : </p>  <p style={item.statusval === 'Model Rejected' ? { backgroundColor: "red", color: 'white' } : { backgroundColor: 'yellow' }}  >{item.rejectionreason}</p></span>

                            </div>


                          </div> : ''
                      }

                      <div style={{ marginTop: '5px', display: 'flex', justifyContent: 'start', alignItems: 'start', width: '100%' }}>
                        <div className='clientdatadiv1'>
                          <span style={{ display: 'flex' }}>  <p className='labelclient'>Modeler : </p>  <p >{item.modeler}</p></span>

                        </div>


                      </div>

                    </div>

                  </div>



                </div>

              </div>



            ))
          }




        </div>

      </div>

    </div>
  )
}

export default Uploadclientmodel
