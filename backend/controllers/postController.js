const postModel = require('../models/postModel');
const userModel = require('../models/userModel');

exports.createPost = async (req,res)=>{
    try{
        const {title,description,image,user} = req.body;
        if(!title)
        {
            
            return res.status(400).send({message:'Title is Required',success:false})
        }
        if(!description)
        {
            return res.status(400).send({message:'Description is Required',success:false})
        }
        if(!image)
        {
            return res.status(400).send({message:'Image is Required',success:false})
        }
        if(!user)
        {
            return res.status(400).send({message:'User Id is Required',success:false})
        }
        
        const existingUser = await userModel.findById(user);
        if(!existingUser)
        {
            return res.status(400).send({message:'User Not found',success:false});

        }
        
        const newPost = await postModel.create({title,description,image,user});
        // const newPost = await postModel.create({title,description,image,user});
        // await newPost.save(); 
        existingUser.post.push(newPost);
        await existingUser.save();

        return res.status(201).send({message:'Post Created Successfully..',success:true,newPost})

    }catch(error) {
        console.log(error)
        return res.status(500).send({message:'Error in Creating Post',success:false,error})
    }
}



exports.getAllPost = async(req,res) =>{
    try {
       const allPost = await postModel.find().populate('user');
       return res.status(200).send({postcount:allPost.length,message:'Got All Post',success:true,allPost})
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({message:'Error in getting All Posts',success:false,error})
    }
}

exports.updatePost = async(req,res) =>{
    try {
        const {id} = req.params;
        const {title,description,image} = req.body;
        const post = await postModel.findByIdAndUpdate(id,{...req.body},{new:true});
        return res.status(200).send({message:'Post updated Successfully',success:true,post})
    } catch (error) {
        console.log(error)
        return res.status(500).send({message:'Error in Updating Post',success:false,error})
    }
}


exports.deletePost = async (req, res) => {
    try {
        // Step 1: Find the post and populate the user reference
        const post = await postModel.findById(req.params.id).populate('user');
        
        // Step 2: Check if the post exists, if not return an error
        if (!post) {
            return res.status(404).send({ message: 'Post not found', success: false });
        }

        // Step 3: Remove the post from the user's post array
        post.user.post.pull(post._id);  // Remove the post's ID from the user's posts array
        
        // Step 4: Save the user after updating the posts array
        await post.user.save();

        // Step 5: Delete the post from the posts collection
        await postModel.deleteOne({ _id: req.params.id });

        return res.status(200).send({ message: 'Post Deleted Successfully', success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error in Deleting Post', success: false, error });
    }
};


exports.getPostById = async (req, res) => {
    try {
        const { id } = req.params;

        // Try fetching as a single post by _id first
        let post = await postModel.findById(id).populate('user');

        // If not found, try fetching all posts by user
        if (!post) {
            post = await postModel.find({ user: id }).populate('user');
        }

        return res.status(200).send({
            message: 'Got Post(s) successfully',
            success: true,
            post,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error in getting Post(s)', success: false });
    }
};
