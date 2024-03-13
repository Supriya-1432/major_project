import React, { useState, useEffect } from 'react'
import './Profile.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

export default function Profile() {

    const navigate = useNavigate()
    const [value, setValue] = useState('')
    const [proile , setProfile ] = useState('')
    const [history, setHistory ] = useState('')

    useEffect( () => {
        const getUserProfile = async() =>{
            const authToken = localStorage.getItem('token')
            await axios.get('http://localhost:8800/api/user', {
                headers: {
                    Authorization: `Bearer ${authToken}`            
                },
            })
            .then((res) => {
                setProfile(res.data);
            })
            .catch((error) => {
                navigate('/')
                console.error('Error fetching user data:', error);      
            });
        }
        getUserProfile()

        const getUserHistory = async () =>{
            const authToken = localStorage.getItem('token')
            await axios.get('http://localhost:8800/api/user/previous-scans', {
                headers: {
                    Authorization: `Bearer ${authToken}`            
                },
            })
            .then((res) => {
                setHistory(res.data);
            })
            .catch((error) => {
                console.error('Error fetching user history:', error);      
            });
        }
        getUserHistory()
      }, []);
  return (
    <div className='profile_main'>
      <div className='profile_main_sidebar'>
        <div className='profile_icon_name'>
            <AccountCircleIcon style={{fontSize:'48px'}} />
            <div className='profile_icon_name_text'>
                <p>Registered</p>
                <p>{proile.fullName}</p>
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
                    <p style={{fontSize:'18px'}}><span style={{fontWeight:'bold'}}>Full Name:</span> {proile.fullName}</p>
                    <p style={{fontSize:'18px'}}><span style={{fontWeight:'bold'}}>Age:</span> {proile.age}</p>
                    <p style={{fontSize:'18px'}}><span style={{fontWeight:'bold'}}>Email:</span> {proile.email}</p>
                </div>
            </div>  : value === 'History' ? 
            <div className='profile_history_section'>
                <p className='profile_big_head'>My Reports</p>
                <div className='profile_history_section_info'>
                    <p style={{fontWeight:'bold',fontSize:'22px'}}>Reports</p>
                    <hr></hr>
                    { history.map((data) => {
                        return (
                        <div className='reports'>
                            <p style={{fontSize:'18px'}}><span style={{fontWeight:'bold'}}>Date:</span><br/>{new Date(data.createdAt).toLocaleDateString()}</p>
                            <img src={`http://localhost:8800/images/${data.fileName}`} alt='history' className='history_image' />
                            <p style={{fontSize:'18px'}}><span style={{fontWeight:'bold'}}>Result:</span> <br/>{data.result}</p>
                        </div>)
                    })}
                </div>
            </div> : <></>
        }
      </div>
    </div>
  )
}
