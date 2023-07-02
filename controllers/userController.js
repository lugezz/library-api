const User = require('../models/userModel');

const bcrypt = require('bcryptjs');

exports.signUp = async (req, res, next) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);

    const userExists = await User.findOne({ where: { username } });
    if (userExists) {
        return res.status(400).json({
            status: 'fail',
            message: 'Username already exists'
        });
    }

    try {
        const newUser = await User.create({
            username,
            password: hashedPassword,
        });
        req.session.user = newUser;
        res.status(201).json({
            status: 'success',
            data: {
                user: newUser,
                token: req.sessionID
                // Be careful it includes password
            }
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'fail'
        });
    }
}

exports.login = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });
        }

        const passwordCorrect = await bcrypt.compare(password, user.password);

        if (passwordCorrect) {
            res.cookie('library-session', req.sessionID, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict'
            });
            

            // Assign user to session and save
            req.session.user = user;
            req.session.save();


            // Send response
            res.status(200).json({
                status: 'success',
                data: {
                    user,
                    // Be careful it includes password
                },
                message: 'Logged in successfully'
            });
        } else {
            res.status(400).json({
                status: 'fail',
                message: 'Incorrect username or password'
            });
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'fail'
        });
    }
}

exports.logout = async (req, res, next) => {
    req.session.destroy();
    res.status(200).json({
        status: 'success',
        message: 'Logged out successfully'
    });
}
