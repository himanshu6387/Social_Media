import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { authActions } from './../redux/store';
const Login = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs,setInputs] = useState({
    email:'',
    password:'',    
  })

  const handleChange = (e)=>{
    setInputs((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value,
    }))
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const res = await axios.post('https://social-media-backendd.onrender.com/user/login',{
        email: inputs.email,
        password:inputs.password,
      })
      console.log(res)
      if(res.data.success){
        const userId = res.data.user?._id;
        if(userId){
          localStorage.setItem('userId',userId)
          console.log('UserId',userId)
        dispatch(authActions.login());
        alert('User Loggedin Successfully');
        navigate('/post');
        }
        else{
          console.log('Not getting Id')
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
    <Box sx={{maxWidth: 500,mx: 'auto',mt: 15,p: 3,boxShadow: 15,borderRadius: 2,}}>

      <Typography variant="" gutterBottom>
        <h1 style={{textAlign:'center',color:'navy',textDecoration:'underline'}}>Login</h1>
      </Typography>

        <TextField label="Email" name="email" value={inputs.email} onChange={handleChange} fullWidth margin="normal"/>

        <TextField label="Password" name="password" value={inputs.password} onChange={handleChange} type="password" fullWidth margin="normal"/>

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2,p:1 }}>
         Login
        </Button>
    </Box>
    </form>
  );
};

export default Login;
