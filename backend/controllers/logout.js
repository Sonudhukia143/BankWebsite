export default async function logout (req,res) {
    req.session.destroy((err) => {
        if(err) {
            return res.status(500).send('Failed to log out');
        }
        res.send('Logged out successfully');
    });
};