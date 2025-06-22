import axios from 'axios';
import React, { useEffect, useState } from 'react'
import PostCard from '../components/PostCard';
import { Alert } from '@mui/material';

const UserPost = () => {
    const [posts, setPosts] = useState([]);

    //GetUserPost
    const getUserPost = async () => {
        try {
            const id = localStorage.getItem('userId');
            const { data } = await axios.get(`https://social-media-backendd.onrender.com/post/getPost/${id}`)
            // console.log(data)
            if (data?.success) {
                setPosts(data?.post)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUserPost();
    }, [])

    return (
        <div>
            {posts && (posts.length > 0) ? (
                posts.map((post, index) => (
                    <PostCard
                        key={index}
                        post={post}
                        id={post?._id}
                        isUser={true}
                        title={post.title}
                        description={post.description}
                        image={post.image}
                        username={post.user?.username || 'Unknown User'}
                        time={post.createdAt}
                    />
                ))
            ) : (
                <Alert variant="outlined" severity="warning" sx={{width:500,mx:'auto',mt:30,p:5}}>
                    <h1>There is no Post Available</h1>
                </Alert>
            )
            }

        </div>
    )
}

export default UserPost