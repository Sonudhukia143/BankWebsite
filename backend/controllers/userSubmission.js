import { SocialMediaHandeler ,forValidation } from "../models/socialMediaHandle.js";

const userSubmission = async (req,res) => {
    try{
        const author = req.session.user;
        if (!author) {
            return res.status(401).send("Unauthorized: You need to be logged in to create a post.");
        }

        console.log(author);

        const {username , SocialMediaHandel } = req.body;
        const images = req.files.map(file => ({
            url: file.path,
            filename:file.filename
        }));

        const newPost = new SocialMediaHandeler({ 
            username,
            images, 
            SocialMediaHandel, 
            author:author.id
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