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

// Controllers
const isAuth = (req, res, next) => {
    const authHeader = req.headers['authorization']; // Header cekildi
    const token = authHeader && authHeader.split(' ')[1]; // Baerer [token] texti bolunup token alindi

    if (token == null)  return res.sendStatus(401);

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        console.log(err);
        if (err) return res.status(403);

        req.user = user;
        next();
    })
}

const registerUser = async (req, res) => {
    try {
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
        
        res.status(200).json({ status: 'Accepted', message: 'Kayit Basarili!'});
    } catch(err) {
        console.log(err)
        res.status(500).json({ status: 'Accepted', message: 'Islem Basarisiz'});
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
    
        const user = await User.findOne({
            email: email
        });

        if(!user) return res.status(400).json({ status: 'Accepted', message: 'Kullanici bulunamadi!'});
        
        const isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch) return res.status(400).json({ status: 'Accepted', message: 'Sifre Yanlis!'});
        
        const token = generateToken({id: user.id});
        console.log('Token: ', token);
        return res.send({token})
    } catch(err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

module.exports = {
    isAuth,
    registerUser,
    LoginPage,
    loginUser
}