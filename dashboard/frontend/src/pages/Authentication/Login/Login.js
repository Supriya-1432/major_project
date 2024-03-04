import React,{useState} from 'react'
import './Login.css'
import { Link,useNavigate } from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility';    
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {Dialog,DialogTitle,DialogContent,DialogActions} from '@mui/material';
import { Typography  } from '@mui/material'
import Button from '@mui/material/Button';

export default function Login() {
    const navigate = useNavigate()
    localStorage.clear();


    const width = window.innerWidth <1000
    const width510 = window.innerWidth<530
    const [passwordVisible, setPasswordVisible] = useState(false);

  const toggleVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };


  const [openInvalidCredentialsDialog, setOpenInvalidCredentialsDialog] = useState(false);
  const [openEmailNotFoundDialog, setOpenEmailNotFoundDialog] = useState(false);


  const [email,setEmail] = useState("")
  const [password,setPassword]= useState("")

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });






async function login(event){
  event.preventDefault();
  let errors = {};
  let isValid = true;

  if (!email) {
    errors.email = "Please enter your email.";
    isValid = false;
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email address.";
      isValid = false;
    }
  }

  // Validate password
  if (!password) {
    errors.password = "Please enter your password.";
    isValid = false;
  }

  setFormErrors(errors);
  if(isValid){

      navigate('/')
    }
}

  return (
    <>
      <div className='login_main' style={{display:'grid',gridTemplateColumns:width ? '100%' : '60% 40%',position:'relative'}}>
        {width ? <></>: <div className='login_submain image-bg'>
        </div> }
        <div className='login_submain' style={{backgroundColor:'#F4F7FB',width:'100%'}}>
            <div className='login_details' style={{width:width510?'80%':'50%',paddingTop:'50px',paddingBottom:'50px'}}>
                <div className='head'>
                    <p style={{color:'#3d3878',fontSize:'26px'}}>WELCOME</p>
                    <p style={{fontSize:'16px',color:'#939CA7'}}>Please login to your account</p>
                </div>
                <form className='form' onSubmit={login}>
                    <div className='field'>
                        <p style={{color:'#6F7D97',fontSize:'16px'}}>Email</p>
                        <input type='text' className='input' value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                        {formErrors.email ? <p style={{color:'red'}}>{formErrors.email}</p> : <></> }
                    </div>
                    <div className='field' style={{position:'relative'}}>
                        <p style={{color:'#6F7D97',fontSize:'16px'}}>Password</p>
                        <input type={passwordVisible ? 'text' : 'password'} className='input' value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                        {formErrors.password ? <p style={{color:'red'}}>{formErrors.password}</p> : <></>}
                        <span className='icon'
                            style={{
                                position: 'absolute',
                                right: '10px',
                                top: formErrors.password ? '53%' : '78%',
                                transform: 'translateY(-50%)',
                                cursor: 'pointer',
                            }}
                            onClick={toggleVisibility}
                            >
                            {passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon /> }
                        </span>
                    </div>
                    <button className='btn' type='submit' >LOGIN</button>
                </form>
                <div className='foot'>
                    <p style={{color:'#212121'}}>Don't have an account?</p>
                    <Link to='/register' style={{letterSpacing:'2px',fontWeight:'bold',cursor:'pointer'}}>SIGN UP</Link>
                </div>
            </div>
        </div>
       </div>
      
      <Dialog open={openInvalidCredentialsDialog} onClose={() => setOpenInvalidCredentialsDialog(false)}  
        PaperProps={{
        style: {
          background:  '#3d3878' ,
        },
      }}>
          <DialogTitle sx={{color:'#FFFFFF'}}>Invalid Credentials</DialogTitle>
          <DialogContent>
            <Typography sx={{color:'#FFFFFF'}}>Invalid credentials. Please try again.</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenInvalidCredentialsDialog(false)} color="primary" sx={{fontWeight:'bold'}} variant='contained'>
              OK
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog for "Email not found" */}
        <Dialog open={openEmailNotFoundDialog} onClose={() => setOpenEmailNotFoundDialog(false)}
         PaperProps={{
          style: {
            background:  '#3d3878' ,
          },
        }} >
          <DialogTitle sx={{color:'#FFFFFF'}}>Email not found</DialogTitle>
          <DialogContent>
            <Typography sx={{color:'#FFFFFF'}}>The provided email address was not found. Please check your email or sign up for an account.</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEmailNotFoundDialog(false)} color="primary" sx={{fontWeight:'bold'}} variant='contained'>
              OK
            </Button>
          </DialogActions>
        </Dialog>
    </>
    
  )
}
