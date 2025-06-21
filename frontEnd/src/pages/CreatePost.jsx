import React, { useState } from 'react'
import {Box,Button,TextField,Typography} from '@mui/material'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


const CreatePost = () => {

  const navigate = useNavigate();

  const[inputs,setInputs] = useState({
    title:'',
    description:'',
    image:'',
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
      const id = localStorage.getItem('userId');
      const {data} = await axios.post('http://localhost:8080/post/create-Post',{
        title:inputs.title,
        description:inputs.description,
        image:inputs.image, 
        user:id
    })
      if(data.success)
        {
          alert('Post Created Successfully..')
          navigate('/')
        }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{boxShadow:20,maxWidth:650,display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',height:'300',mx:'auto',mt:20,p:5,borderRadius:5}}>
      <Typography variant=''>
        <h1 style={{textDecoration:'underline',color:'navy',fontSize:'40px'}}>CreatePost</h1>
      </Typography>

      <TextField label="Title" type='text' name='title' value={inputs.title} onChange={handleChange} fullWidth margin="normal" required/>

      <TextField label="Description" type='text' name='description' value={inputs.description} onChange={handleChange} fullWidth margin="normal" required/>

      <TextField label="Image URL" type='text' name='image' value={inputs.image} onChange={handleChange} fullWidth margin="normal" variant='filled' required/>

      <Button variant='contained' sx={{mt:1,p:1}} type='submit' fullWidth>Create Post</Button>
    </Box>
    </form>
    //value={}
  )
}

export default CreatePost
