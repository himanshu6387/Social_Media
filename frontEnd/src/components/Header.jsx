import React, { useState } from 'react'
import {Box,AppBar,Toolbar,Typography, Button} from '@mui/material'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { authActions } from '../redux/store'
import { useNavigate } from 'react-router-dom'
const Header = () => {
  //Global State
  const isLogin = useSelector(state => state.isLogin)
  // console.log(isLogin) 

  const dispatch = useDispatch();
  //Local State
  const [value,setValue] = useState();
  const navigate = useNavigate()

  const handleLogout = ()=>{
    try {
      dispatch(authActions.logout())

      alert('User loggedOut Successfully');
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <AppBar position='sticky'>
        <Toolbar>
            <Typography variant=''>
                <h1>Social Media</h1>
            </Typography>

           {isLogin && (
             <Box display={'flex'} margin="auto">
             <Button sx={{margin:1, fontWeight: 'bold'}} variant='white' LinkComponent={Link} to="/">Post</Button>
             <Button sx={{margin:1, fontWeight: 'bold'}} variant='white' LinkComponent={Link} to="/my-post">My Post</Button>
             <Button sx={{margin:1, fontWeight: 'bold'}} variant='white' LinkComponent={Link} to="/create-post">Create Post</Button>
             </Box>
           )}
            <Box display={'flex'} marginLeft="auto">
               {!isLogin && <>
                <Button sx={{margin:1, fontWeight: 'bold'}} variant='contained' LinkComponent={Link} to="/login">Login</Button>
                <Button sx={{margin:1,fontWeight: 'bold'}} variant='white' LinkComponent={Link} to="/register">Register</Button>
               </>}
               
               {isLogin && <Button onClick={handleLogout} sx={{margin:1,fontWeight: 'bold'}} variant='white' LinkComponent={Link} to="">Logout</Button>}
            </Box>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
