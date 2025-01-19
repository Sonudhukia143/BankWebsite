import { SocialMediaHandeler ,forValidation } from "../models/socialMediaHandle.js";
import { User } from "../models/userModel.js";

const userSubmission = async (req,res) => {
    try{
        const user = localStorage.getItem('user');

        const author = User.find({gmail:user.gmail});
        if (!author) {
            return res.status(401).send("Unauthorized: You need to be logged in to create a post.");
        }

        const {username , SocialMediaHandel } = req.body;
        const images = req.files.map(file => ({
            url: file.path,
            filename:file.filename
        }));

        const newPost = new SocialMediaHandeler({ 
            username,
            images, 
            SocialMediaHandel, 
            author:author._id
        });

        const { error } = forValidation({
            username , SocialMediaHandel , author , images
        }); 
        if(error) return res.status(400).send('Could not create user' + " " + error.message);

        await newPost.save();

        return res.status(200).send("Successfully created user" + newPost);       
    }catch(err) {
        return res.status(500).send("Could not create submission" + err.message);
    }
}

export default userSubmission;