import { SocialMediaHandeler } from "../models/socialMediaHandle.js";

const getUserSubmissions = async (req, res) => {
    try {
        const authorId = req.session.user?.id;
        if (!authorId) {
            return res.status(401).json({ message: 'Unauthorized: You need to be logged in to view submissions.' });
        }

        const submissions = await SocialMediaHandeler.find({ author: authorId })
            .populate('author', 'username')
            .lean();


        return res.status(200).json(submissions);
    } catch (err) {
        console.error(err);
        res.status(500).json("Could not fetch submissions");
    }
};


export default getUserSubmissions;
