import React from 'react'
import './Home.css'
import gif from '../../images/gif-upload.gif'
import results from '../../images/results.png'
import text from '../../images/text.webp'
import upload_image from '../../images/upload_image.png'
import { useNavigate } from 'react-router-dom'

export default function Home() {

    const navigate = useNavigate()
  return (
    <div className='home_main'>
        <div className='home_head_text'>
            <p className='home_head_text_1'>Elevate Diagnosis with Our Tool</p>
            <p className='home_head_text_2'>Detect Viral Pneumonia, Bacterial Pneumonia, Tuberculosis, COVID and its Severity Levels from Your Chest X-Ray Images! Fast, Accurate, and Always FREE!</p>
        </div>
        <div className='home_tool'>
            <p className='home_tool_heading'>Features of our Powerful tool:</p>
            <div className='home_tool_cards'>
                <div className='home_tool_card'>
                    <p className='home_tool_card_head'>Instant Diagnosis with Ease</p>
                    <p className='home_tool_card_text'>Upload your chest x-ray image and get immediate results. Our advanced algorithms quickly detect and analyze for Viral Pneumonia, 
                        Bacterial Pneumonia, Tuberculosis, COVID and their severity levels.</p>
                </div>
                <div className='home_tool_card'>
                    <p className='home_tool_card_head'>Accurate and Reliable</p>
                    <p className='home_tool_card_text'>Trust our tool to provide accurate assessments, helping medical professionals make informed decisions.</p>
                </div>
                <div className='home_tool_card'>
                    <p className='home_tool_card_head'>Free to Use</p>
                    <p className='home_tool_card_text'>No hidden costs or subscriptions. Our tool is entirely free, ensuring access to crucial information without barriers.</p>
                </div>
            </div>
        </div>
        <div className='home_works'>
            <p className='home_works_head'>How it works:</p>
            <div className='home_works_cont'>
                <img src={gif} alt='upload-gif' className='home_upload_gif' />
                <p className='home_works_text'>1. Upload an image of your Chest X-Ray</p>
            </div>
            <div className='home_works_cont' style={{justifyContent:'flex-end'}}>
                <p className='home_works_text' style={{width:'50%'}}>2. Receive detailed results on the detected diseases and their severity levels.</p>
                <img src={results} alt='upload-gif' className='home_results_gif' />
            </div>
            <div className='home_works_cont'>
                <img src={text} alt='upload-gif' className='home_text_gif' />
                <p className='home_works_text'>3. Get Insights </p>
            </div>
        </div>
        <div className='home_started'>
            <div className='home_sub_started_1'>
                <p className='home_started_head'>Ready to get started?</p>
                <p className='home_started_text'>Upload your Chest X-Ray image now to experience the convenience and power of our diagnostic tool!</p>
                <button type='button'></button>
                <button type='button' className='home_started_btn' onClick={() => navigate('/upload')}>Upload an Image</button>
            </div>
            <div className='home_sub_started_2'>
                <img src={upload_image} alt='get-started' className='home_get_started_icon' /> 
            </div>
        </div>
    </div>
  )
}
