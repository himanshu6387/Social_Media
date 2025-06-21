import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function PostCard({ title, description, image, username, time, isUser, id }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/post-details/${id}`);
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`http://localhost:8080/post/delete-Post/${id}`);
      if (data?.success) {
        alert('Post Deleted Successfully..');
        navigate('/my-post');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card
      sx={{
        width: '31%',
        minWidth: 280,
        marginBottom: 4,
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        borderRadius: 2,
        transition: '0.3s',
        '&:hover': {
          transform: 'scale(1.02)',
        },
      }}
    >
      {isUser && (
        <Box display="flex">
          <IconButton onClick={handleEdit} sx={{ marginLeft: 'auto', color: 'goldenrod' }}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleDelete} sx={{ color: 'red' }}>
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[600], width: 48, height: 48 }} aria-label="recipe">
            {username?.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={username}
        subheader={time}
      />
      <CardMedia component="img" height="200" image={image} alt="Post" />
      <CardContent>
        <Typography fontWeight="bold">Title: {title}</Typography>
        <Typography variant="body2" color="text.secondary">
          Description: {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
