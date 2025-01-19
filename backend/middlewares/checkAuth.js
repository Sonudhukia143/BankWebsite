export default function checkAuth (req,res,next) {
    if (!req.session.user) {
        return res.status(401).send('Unauthorized. Please log in.');
    }
    else{
        next();
    }
}