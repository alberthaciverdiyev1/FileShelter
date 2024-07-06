
const validator = require('validator');

exports.registerValidator = (req, res, next) => {
    const { username, email, password, confirmPassword } = req.body;
    console.log({ username, email, password, confirmPassword});
    const validator = require('validator');
   
    if (!username) {
        return res.status(400).json({ error: "Username is required" });
    }
    
    if (!validator.isLength(username, { min: 3, max: 20 })) {
        return res.status(400).json({ error: "Username must be between 3 and 20 characters long" });
    }
    
    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }
    
    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: "Please enter a valid email address" });
    }
    
    if (!password) {
        return res.status(400).json({ error: "Password is required" });
    }
    
    if (!validator.isLength(password, { min: 6 })) {
        return res.status(400).json({ error: "Password must be at least 6 characters long" });
    }
        
    next();
};

