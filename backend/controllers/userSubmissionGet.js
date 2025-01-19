const getUserSubmissions = async (req, res) => {
    try {
        const user = req.session.user;

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: You need to be logged in to view submissions.' });
        }

        const authorId = (await User.findOne({ gmail: user.gmail }))._id;
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
