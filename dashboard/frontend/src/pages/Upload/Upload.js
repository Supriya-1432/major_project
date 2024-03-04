import React from 'react'
import './Upload.css'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='upload_main'>
        <p className='upload_head'>Upload IMAGE</p>
        <p className='upload_text'>Unleash the power of our tool by effortlessly uploading your chest x-ray images. Seamlessly detect and analyze for Viral Pneumonia,
             Bacterial Pneumonia, Tuberculosis, COVID and its severity levels with just a few clicks.</p>
         <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon style={{fontSize:'32px',marginBottom:'2px'}} />}
            className='upload_btn'
            >
            Upload file
            <VisuallyHiddenInput type="file" onChange={handleFileChange}  />
        </Button>
        {/* <div className='image_sub_preview'>
            <p>Image Preview</p> */}
            {imagePreview && ( 
            <img src={imagePreview} alt="Preview" className='previewd_image' />
            )}
            {/* <button type='button'>Get Results</button>
            </>)}
          </div> */}
        {/*<div className='image_preview'>
          <div className='image_sub_preview'>
            <p>Image Preview</p>
            {imagePreview && ( <>
            <img src={imagePreview} alt="Preview" className='previewd_image' />
            <button type='button'>Get Results</button>
            </>)}
          </div>
        <div className='image_sub_preview'>
            
        </div>
       </div> */}
    </div>
  )
}
