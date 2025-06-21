import React, { useState } from 'react'
import {Box,Button,TextField,Typography} from '@mui/material'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Register = () => {

  const navigate = useNavigate();

  const[inputs,setInputs] = useState({
    name:'',
    email:'',
    password:'',
  })

  const handleChange = (e)=>{
    setInputs((prevState)=>({    //prevState is the current state before the update. 
      ...prevState,// copies all the existing key-value pairs from the current state into the new state.
      [e.target.name]:e.target.value
      //e.target.name refers to the name attribute of the input field.
      //e.target.value holds the current value entered in the input field.
    }));
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    // console.log(inputs)
    try {
      const {data} = await axios.post('http://localhost:8080/user/register',{
        username:inputs.name,
        email:inputs.email,
        password:inputs.password
    })
      if(data.success)
        {
          alert('User Registered Successfully..')
          navigate('/login')
        }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{boxShadow:20,maxWidth:500,display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',height:'300',mx:'auto',mt:20,p:5}}>
      <Typography variant=''>
        <h1 style={{textDecoration:'underline',color:'navy'}}>Register</h1>
      </Typography>

      <TextField label="Name" type='text' name='name' value={inputs.name} onChange={handleChange} fullWidth margin="normal"/>

      <TextField label="Email" type='email' name='email' value={inputs.email} onChange={handleChange} fullWidth margin="normal"/>

      <TextField label="Password" type='password' name='password' value={inputs.password} onChange={handleChange} fullWidth margin="normal" variant='filled'/>

      <Button variant='contained' sx={{mt:1,p:1}} type='submit' fullWidth>Register</Button>
    </Box>
    </form>
    //value={}
  )
}

export default Register
