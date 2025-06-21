import React from 'react'
import Header from './components/Header';
import {Routes,Route} from 'react-router'
import Posts from './pages/Posts';
import Login from './pages/Login';
import Register from './pages/Register';
import UserPost from './pages/UserPost';
import CreatePost from './pages/CreatePost';
import PostDetails from './pages/PostDetails';

const App = () => {
  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Posts/>}/>
        <Route path='/post' element={<Posts/>}/>
        <Route path='/my-post' element={<UserPost/>}/>
        <Route path='/post-details/:id' element={<PostDetails/>}/>
        <Route path='/create-post' element={<CreatePost/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>} />
      </Routes>
    </>
  )
}

export default App
