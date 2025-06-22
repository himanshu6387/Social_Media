import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Box,Typography,TextField,Button } from '@mui/material'

const PostDetails = () => {
    const navigate = useNavigate();
    const [post,setPost] = useState({})
    const { id } = useParams();
    // console.log(id)
    const[inputs,setInputs] = useState({
    })

    const getPostDetails = async () => {
        try {
          const { data } = await axios.get(`https://social-media-backendd.onrender.com/post/getPost/${id}`);
        //   console.log("API Response:", data);
          if (data?.success) {
            setPost(data?.post);
            setInputs({
              title: data?.post?.title,
              description: data?.post?.description,
              image: data?.post?.image,
            });
          } else {
            console.error("API returned success as false");
          }
        } catch (error) {
          console.error("Error fetching post details:", error);
        }
      };
      

    useEffect(()=>{
        getPostDetails();
    },[id])
    console.log(post)

    
    //From CreatePost
      const handleChange = (e)=>{
        setInputs((prevState)=>({    //prevState is the current state before the update. 
          ...prevState,// copies all the existing key-value pairs from the current state into the new state.
          [e.target.name]:e.target.value
          //e.target.name refers to the name attribute of the input field.
          //e.target.value holds the current value entered in the input field.
        }));
      }
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const userId = localStorage.getItem('userId');
          const { data } = await axios.put(`http://localhost:8080/post/update-Post/${id}`, {
            title: inputs.title,
            description: inputs.description,
            image: inputs.image,
            user: userId,
          });
    
          if (data.success) {
            alert('Post Updated Successfully');
            navigate('/');
          }
        } catch (error) {
          console.error(error);
        }
      };
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <Box sx={{boxShadow:20,maxWidth:650,display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',height:'300',mx:'auto',mt:20,p:5,borderRadius:5}}>
      <Typography variant=''>
        <h1 style={{textDecoration:'underline',color:'navy',fontSize:'40px'}}>Update Post</h1>
      </Typography>

      <TextField label="Title" type='text' name='title' value={inputs.title} onChange={handleChange} fullWidth margin="normal" required/>

      <TextField label="Description" type='text' name='description' value={inputs.description} onChange={handleChange} fullWidth margin="normal" required/>

      <TextField label="Image URL" type='text' name='image' value={inputs.image} onChange={handleChange} fullWidth margin="normal" variant='filled' required/>

      <Button variant='contained' sx={{mt:1,p:1}} type='submit' fullWidth>Update</Button>
    </Box>
    </form>
    </div>
  )
}

export default PostDetails
