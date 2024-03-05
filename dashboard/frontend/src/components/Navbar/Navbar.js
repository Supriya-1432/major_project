import * as React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import LogoBlue from '../../images/lung.png';
import './Navbar.css'
import MenuIcon from '@mui/icons-material/Menu';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Tooltip } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import LogoutIcon from '@mui/icons-material/Logout';


export const ModeContext = React.createContext();

export default function Navbar(){

  const navigate = useNavigate()


  const [toggle,setToggle] = React.useState(true)
  const handleToggle = () =>{
    setToggle((prevToggle) => setToggle(!prevToggle))
  }

  const t= !true;

  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return(

    <>
      <ModeContext.Provider>
        <div className='nav_main_desktop'>
          <div className='nav_sub_desktop'>
            <div className='nav_sub_desktop_logo_text' onClick={()=>navigate('/')} >
              <img src={LogoBlue} alt='icon' loading='lazy' className='nav_logo_desktop' />
              <p className='nav_logo_text'>Lung-Disease Detect</p>
            </div>
            <p className='nav_upload_text' onClick={()=>navigate('/upload')}>Upload</p>
          </div>
          { t ?
            <div className='nav_sub_desktop'>
              <button type='button' className='nav_btn_desktop' onClick={()=>navigate('/login')}>
                <p >Login</p>
              </button>
              <button type='button' className='nav_btn_desktop' onClick={()=>navigate('/register')}>
                <p >Signup</p>
              </button>
              </div> : 
            <div className='nav_sub_desktop'>
              <Tooltip title='Account'>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle style={{fontSize:'30px'}}/>
                </IconButton>
              </Tooltip>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                sx={{zIndex:'10000000'}}
              >
                <MenuItem onClick={handleClose}>
                  <div className='nav_acc' onClick={()=>navigate('/profile')}>
                    <AccountCircleIcon />
                    <p>Account</p>
                  </div>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <div className='nav_acc'>
                    <p>Logout</p>
                    <LogoutIcon />
                  </div>
                </MenuItem>
              </Menu>
            </div>
          }
        </div>
        <div className='nav_main_mobile'>
          <div className='nav_icons'>
            <div className='nav_sub_mobile_logo_text'>
              <img src={LogoBlue} alt='icon' loading='lazy' className='nav_logo_mobile' />
              <p className='nav_logo_text'>Lung-Disease Detect</p>
            </div>
            {toggle ?<MenuIcon className='nav_menu_logo' style={{fontSize:'36px'}} onClick={handleToggle}/> : <ClearSharpIcon className='nav_menu_logo' style={{fontSize:'36px'}} onClick={handleToggle} />  }
          </div>
          {!toggle ? 
           t ? 
           <div className='nav_sub_mobile'>
            <p onClick={()=>navigate('/upload')}>Upload</p>
            <div className='nav_btn_mobile' onClick={()=>navigate('/login')}>
              <p >Login</p>
            </div>
            <div className='nav_btn_mobile' onClick={()=>navigate('/register')}>
              <p >Signup</p>
            </div>
          </div> :
          <div className='nav_sub_mobile'>
            <p onClick={()=>navigate('/upload')}>Upload</p>
            <div className='nav_btn_mobile' onClick={()=>navigate('/profile')}>
              <p >Account</p> 
            </div>
          </div> :
          <></>}
        </div>
       <Outlet />
      </ModeContext.Provider>
    </>
  )
}

