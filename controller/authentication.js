const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../model/User');
const dotenv = require('dotenv');

dotenv.config();
const generateToken = (data) => {
    return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: '1h'} ) // 1 saat gecerli
};

// Viewers
const LoginPage = (req, res)=>{ //yeni gonderi olusturur
    res.render('login',{err: ""})
}

const SignUpPage = (req, res) => {
    res.render('signup',{err: ""})
}
// Controllers
const isAuth = (req, res, next) => {
    const token = req.cookies.token; // [token] texti bolunup token alindi
    if (token == undefined || token == null || token == '') return res.redirect('/login');

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ status: 'Rejected', message: 'JWT Error!'});

        req.user = user;
        next();
    });
}

const registerUser = async (req, res) => {
    const { firstName, LastName, email, password  } = req.body;
        console.log(req.body)
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
        
        const user = new User({
            name: firstName,
            lastName: LastName,
            email: email,
            password: hashedPass
        })

        await user.save();
        
        return res.redirect('/login');
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
    
        const user = await User.findOne({
            email: email
        });

        if(!user) return res.redirect('/register');
        
        const isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch) return res.redirect('/login');
        
        const token = generateToken({id: user.id});

        res.cookie('token', token);

        return res.redirect('/');
    } catch(err) {
        console.log(err)
        return res.status(500).json(err);
    }
}

const logoutUser = (req, res) => {
    res.clearCookie('token');
    return res.redirect('/login');
}

module.exports = {
    isAuth,
    registerUser,
    LoginPage,
    loginUser,
    logoutUser,
    SignUpPage
}