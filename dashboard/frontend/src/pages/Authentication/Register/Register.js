import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility';    
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {Dialog,DialogTitle,DialogContent,DialogActions} from '@mui/material';
import { Typography  } from '@mui/material'
import Button from '@mui/material/Button';


export default function Register() {
    const navigate = useNavigate()
    const width = window.innerWidth <1000
    const height900 = window.innerHeight<900
    const width1200 = window.innerWidth<1200
    const width510 = window.innerWidth<530
    const [passwordVisible, setPasswordVisible] = useState(false);

    const toggleVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };

    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const toggleVisibility_1 = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const [firstname,setFirstname] = useState("")
    const [lastname,setLastname] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword]= useState("")
    const [conformpassword,setconformpassword]= useState("")


    const [formErrors, setFormErrors] = useState({
        firstname:"",
        lastname:"",
        email: "",
        password: "",
        conformpassword:""
      });
  
      const validateForm = () => {
        let isValid = true;
        console.log("something")
        const newFormErrors = {
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          conformpassword: "",
        };
    
        if (!firstname) {
          newFormErrors.firstname = "Please enter your firstname.";
  
          isValid = false;
        }
  
        if (!lastname) {
          newFormErrors.lastname = "Please enter your lastname.";
          isValid = false;
        }
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
          newFormErrors.email = "Please enter your email address.";
          isValid = false;
        } else if (!emailRegex.test(email)) {
          newFormErrors.email = "Please enter a valid email address.";
          isValid = false;
        }
    
        if (!password) {
          newFormErrors.password = "Please enter your password.";
          isValid = false;
        } else if (password.length < 7) {
          newFormErrors.password = "Password must be at least 7 characters long.";
          isValid = false;
        }
    
        if (!conformpassword) {
          newFormErrors.conformpassword = "Please confirm your password.";
          isValid = false;
        } else if ((conformpassword !== password) && (password!="")) {
          newFormErrors.conformpassword = "Passwords do not match.";
          isValid = false;
        }
    
        setFormErrors(newFormErrors);
        return isValid;
      };

      const register = (event) =>{
        event.preventDefault();
        let test = validateForm();
        if(test){
        navigate('/login')
  
        
   
  
        // console.log(data)
  
        // axios.post(`http://localhost:5000/api/users/`,data).then(
        //   res=>{
        //     setDialogMessage(res.data);
        //     setDialogOpen(true);
            
        //   } 
        // ).catch((error)=>{
        //     console.log("Error:",error);
        // })
  
        }
        
  
      }

      const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');

    const handleDialogClose = () => {
        setDialogOpen(false);
        setDialogMessage('');
        navigate('/login')
      };

  return (
    <>
      <div className='login_main' style={{display:'grid',gridTemplateColumns:width ? '100%' : '60% 40%',position:'relative'}}>
            {width ? <></>: <div className='login_submain image-bg'>
            </div> }
        <div className='login_submain' style={{backgroundColor:'#F4F7FB',width:'100%',paddingTop:'260px'}}>
            <div className='login_details' style={{marginTop:width1200&&height900&&(!width?'90px':'120px'),marginBottom:width1200&&height900&&'90px',width:width510?'80%':'50%',paddingTop:'50px',paddingBottom:'50px'}}>
                <div className='head'>
                    <p style={{color:'#3d3878',fontSize:'26px'}}>CREATE ACCOUNT</p>
                    <p style={{fontSize:'16px',color:'#939CA7'}}>Please fill the details to create an account</p>
                </div>
                <form className='form' onSubmit={register}>
                    <div className='field'>
                        <p style={{color:'#6F7D97',fontSize:'16px'}}>First Name</p>
                        <input type='text' className='input' value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}/>
                        {formErrors.firstname? <p style={{color:'red'}}>{formErrors.firstname}</p> : <></>}
                    </div>
                    <div className='field'>
                        <p style={{color:'#6F7D97',fontSize:'16px'}}>Last Name</p>
                        <input type='text' className='input' value={lastname}
                        onChange={(e) => setLastname(e.target.value)}/>
                        {formErrors.lastname? <p style={{color:'red'}}>{formErrors.lastname}</p> : <></>}
                    </div>
                    <div className='field'>
                        <p style={{color:'#6F7D97',fontSize:'16px'}}>Email</p>
                        <input type='email' className='input' value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                        {formErrors.email? <p style={{color:'red'}}>{formErrors.email}</p> : <></>}
                    </div>
                    <div className='field' style={{position:'relative'}}>
                        <p style={{color:'#6F7D97',fontSize:'16px'}}>Password</p>
                        <input type={passwordVisible ? 'text' : 'password'} className='input'  value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                        {formErrors.password? <p style={{color:'red'}}>{formErrors.password}</p> : <></>}
                        <span className='icon'
                            style={{
                                position: 'absolute',
                                right: '10px',
                                top: formErrors.password ? '52%' : '78%',
                                transform: 'translateY(-50%)',
                                cursor: 'pointer',
                            }}
                            onClick={toggleVisibility}
                            >
                            {passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon /> }
                        </span>
                    </div>
                    <div className='field' style={{position:'relative'}}>
                        <p style={{color:'#6F7D97',fontSize:'16px'}}>Confirm Password</p>
                        <input type={confirmPasswordVisible ? 'text' : 'password'} className='input'  value={conformpassword}
                        onChange={(e) => setconformpassword(e.target.value)}/>
                        {formErrors.conformpassword? <p style={{color:'red'}}>{formErrors.conformpassword}</p> : <></>}
                        <span className='icon'
                            style={{
                                position: 'absolute',
                                right: '10px',
                                top: formErrors.conformpassword ? '53%' : '78%',
                                transform: 'translateY(-50%)',
                                cursor: 'pointer',
                            }}
                            onClick={toggleVisibility_1}
                            >
                            {confirmPasswordVisible ? <VisibilityIcon /> : <VisibilityOffIcon /> }
                        </span>
                    </div>
                    <button className='btn' type='submit'>SIGN UP</button>
                </form>
                <div className='foot'>
                    <p style={{color:'#212121'}}>Already have an account?</p>
                    <Link to='/login' style={{letterSpacing:'2px',fontWeight:'bold',cursor:'pointer'}}>LOGIN</Link>
                </div>
            </div>
        </div>
      </div>
      <Dialog open={dialogOpen}
       PaperProps={{
        style: {
          background:  '#060b28' ,
        },
      }} >
        <DialogTitle sx={{color:'#FFFFFF'}}>Registration Response</DialogTitle>
        <DialogContent>
          <Typography sx={{color:'#FFFFFF'}}>{dialogMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color='primary' variant='contained' sx={{fontWeight:'bold'}} >
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
