import React, { useState } from 'react'
import './Profile.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import img from '../../images/lung.png';

export default function Profile() {

    const [value,setValue] = useState('')

  return (
    <div className='profile_main'>
      <div className='profile_main_sidebar'>
        <div className='profile_icon_name'>
            <AccountCircleIcon style={{fontSize:'48px'}} />
            <div className='profile_icon_name_text'>
                <p>Registered</p>
                <p>Supriya Pudipeddi</p>
            </div>
        </div>
        <div className='profile_section' onClick={()=> setValue('Account')}>
            <p>Profile</p>
            <hr></hr>
            <div className='profile_my_account'>
                <AccountCircleOutlinedIcon style={{fontSize:'24px'}} />
                <p>My Account</p>
            </div>
        </div>
        <div className='profile_section' onClick={()=> setValue('History')}>
            <p>History</p>
            <hr></hr>
            <div className='profile_my_account'>
                <HistoryOutlinedIcon style={{fontSize:'24px'}} />
                <p>My Reports</p>
            </div>
        </div>
      </div>
      <div className='profile_content'>
        {value === 'Account' ? 
            <div className='profile_account_section'>
                <p className='profile_big_head'>My Account</p>
                <div className='profile_account_section_info'>
                    <p style={{fontWeight:'bold',fontSize:'22px'}}>Profile</p>
                    <hr></hr>
                    <p style={{fontSize:'18px'}}><span style={{fontWeight:'bold'}}>First Name:</span> Supriya</p>
                    <p style={{fontSize:'18px'}}><span style={{fontWeight:'bold'}}>Last Name:</span> Pudipeddi</p>
                    <p style={{fontSize:'18px'}}><span style={{fontWeight:'bold'}}>Age:</span> 21</p>
                    <p style={{fontSize:'18px'}}><span style={{fontWeight:'bold'}}>Email:</span> xyz@gmail.com</p>
                </div>
            </div>  : value === 'History' ? 
            <div className='profile_history_section'>
                <p className='profile_big_head'>My Reports</p>
                <div className='profile_history_section_info'>
                    <p style={{fontWeight:'bold',fontSize:'22px'}}>Reports</p>
                    <hr></hr>
                    <div className='reports'>
                        <p style={{fontSize:'18px'}}><span style={{fontWeight:'bold'}}>Date:</span> <br/> 05-03-2023</p>
                        <img src={img} alt='history' className='history_image' />
                        <p style={{fontSize:'18px'}}><span style={{fontWeight:'bold'}}>Result:</span> <br/> Pneumonia Infected</p>
                    </div>
                </div>
            </div> : <></>
        }
      </div>
    </div>
  )
}
