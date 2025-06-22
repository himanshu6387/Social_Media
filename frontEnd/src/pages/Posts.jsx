import React, { useState, useEffect } from 'react';
import PostCard from './../components/PostCard';
import axios from 'axios';
import { Box } from '@mui/material';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const getAllPost = async () => {
    try {
      const { data } = await axios.get('https://social-media-backendd.onrender.com/post/getAll-Post');
      if (data?.success) {
        setPosts(data?.allPost);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="ceneter"
      gap={5}
      padding={4}
    >
      {posts &&
        posts.map((post, index) => (
          <PostCard
            key={index}
            id={post?._id}
            isUser={localStorage.getItem('userId') === post?.user?._id}
            title={post.title}
            description={post.description}
            image={post.image}
            username={post.user?.username || 'Unknown User'}
            time={new Date(post.createdAt).toLocaleDateString()}
          />
        ))}
    </Box>
  );
};

export default Posts;
