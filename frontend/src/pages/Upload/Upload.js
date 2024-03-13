import React from 'react'
import './Upload.css'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';


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

export default function Upload() {

    const [imagePreview, setImagePreview] = React.useState(null);

    const[id,setId] = React.useState(null)

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      try {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        const response = await axios.post('http://localhost:8800/api/public/uploadScan', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'userId' :localStorage.getItem('userId')
          }
        });
        setId(response.data)
        console.log('Image uploaded successfully:', response.data);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };
  const [result, setResult] = React.useState('');

  const handleResult = async () => {
    try {
      console.log(id);
      const response = await axios.get(`http://localhost:8800/api/public/result/${id}`);
      
      setResult(response.data);
    } catch (error) {
      console.error('Error fetching result:', error);
    }
  }


  return (
    <div className='upload_main'>
        <p className='upload_head'>Upload IMAGE</p>
        <p className='upload_text'>Unleash the power of our tool by effortlessly uploading your chest x-ray images. Seamlessly detect and analyze for Viral Pneumonia,
             Bacterial Pneumonia, Tuberculosis, COVID and its severity levels with just a few clicks.</p>
        {imagePreview == null ? <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon style={{fontSize:'32px',marginBottom:'2px'}} />}
            className='upload_btn'
            >
            Upload file
            <VisuallyHiddenInput type="file" onChange={handleFileChange}  />
        </Button> : 
        <div className='image_preview'>
          <div className='image_sub_preview'>
            <p className='image_preview_text'>Image Preview</p>
            {imagePreview && ( <div className='image'>
            <img src={imagePreview} alt="Preview" className='previewd_image' />
            <button type='button' onClick={handleResult} className='image_preview_btn'>Get Results</button>
            </div>)}
          </div>
        {result ?<div className='image_sub_preview'>
            <p className='status'>Status:</p>
            <p className='infected'>{result}</p>
        </div>:<></>}
       </div> 
       }
        
    </div>
  )
}
