const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email, username: user.username }, process.env.JWT_SECRET, { expiresIn: '30m' });
};

exports.googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

exports.googleAuthCallback = (req, res, next) => {
    passport.authenticate('google', async (err, user, info) => {
        if (err || !user) {
            console.error('Google login error:', err);
            return res.redirect('/');
        }

        try {
            // Extrae los datos del perfil de usuario
            const profile = user._json;
            let existingUser = await User.findOne({ where: { googleId: profile.sub } });

            if (!existingUser) {
                // Generar una contraseña por defecto y encriptarla
                const defaultPassword = '123456'; // Puedes cambiar esto por algo más seguro o generar una contraseña aleatoria
                const hashedPassword = await bcrypt.hash(defaultPassword, 10);

                existingUser = await User.create({
                    googleId: profile.sub,
                    username: profile.name,
                    email: profile.email,
                    password: hashedPassword, // Asigna la contraseña encriptada
                    photo: profile.picture // Guarda la URL de la foto de perfil
                });
            } else {
                // Actualiza los datos del usuario si ya existe
                existingUser.username = profile.name;
                existingUser.email = profile.email;
                existingUser.photo = profile.picture;
                await existingUser.save();
            }

            const token = generateToken(existingUser);
            const username = existingUser.username; // Asegúrate de definir username aquí
            const email = existingUser.email; // Asegúrate de definir email aquí
            const photo = existingUser.photo; // Asegúrate de definir photo aquí
            const googleId = existingUser.googleId; // Asegúrate de definir photo aquí
            
            console.log('Google login successful:', { id: existingUser.id, username, email, photo, googleId });

            res.cookie('jwt', token, { httpOnly: true });

            // Log para ver los datos
            console.log('Redirigiendo al frontend con los siguientes datos:');
            console.log(`Token: ${token}`);
            console.log(`Username: ${username}`);
            console.log(`Email: ${email}`);
            console.log(`Photo: ${photo}`);
            console.log(`GoogleId: ${googleId}`);
            

            // Redirige al frontend con los datos del usuario
            res.redirect(`${process.env.URL_REDIRECT}?token=${token}&username=${existingUser.username}&email=${existingUser.email}&photo=${existingUser.photo}&GoogleId=${existingUser.googleId}`);
        } catch (error) {
            console.error('Google login error:', error);
            return res.redirect('/');
        }
    })(req, res, next);
};

exports.facebookAuth = passport.authenticate('facebook', { scope: ['email'] });

exports.facebookAuthCallback = (req, res, next) => {
    passport.authenticate('facebook', async (err, user, info) => {
        if (err || !user) {
            console.error('Facebook login error:', err);
            return res.redirect('/');
        }

        try {
            // Extrae los datos del perfil de usuario
            const profile = user._json;
            let existingUser = await User.findOne({ where: { facebookId: profile.id } });

            if (!existingUser) {
                // Generar una contraseña por defecto y encriptarla
                const defaultPassword = '123456'; // Puedes cambiar esto por algo más seguro o generar una contraseña aleatoria
                const hashedPassword = await bcrypt.hash(defaultPassword, 10);

                existingUser = await User.create({
                    facebookId: profile.id,
                    username: profile.name,
                    email: profile.email,
                    password: hashedPassword, // Asigna la contraseña encriptada
                    photo: profile.picture.data.url // Guarda la URL de la foto de perfil
                });
            } else {
                // Actualiza los datos del usuario si ya existe
                existingUser.username = profile.name;
                existingUser.email = profile.email;
                existingUser.photo = profile.picture.data.url;
                await existingUser.save();
            }

            const token = generateToken(existingUser);
            const username = existingUser.username; // Asegúrate de definir username aquí
            const email = existingUser.email; // Asegúrate de definir email aquí
            const photo = existingUser.photo; // Asegúrate de definir photo aquí
            const facebookId = existingUser.facebookId; // Asegúrate de definir photo aquí
            
            console.log('Facebook login successful:', { id: existingUser.id, username, email, photo, facebookId });

            res.cookie('jwt', token, { httpOnly: true });
            
            // Log para ver los datos
            console.log('Redirigiendo al frontend con los siguientes datos:');
            console.log(`Token: ${token}`);
            console.log(`Username: ${username}`);
            console.log(`Email: ${email}`);
            console.log(`Photo: ${photo}`);
            console.log(`FacebookId: ${facebookId}`);
            
            // Redirige al frontend con los datos del usuario
            res.redirect(`${process.env.URL_REDIRECT}?token=${token}&username=${existingUser.username}&email=${existingUser.email}&photo=${existingUser.photo}&FacebookId=${existingUser.facebookId}`);

        } catch (error) {
            console.error('Facebook login error:', error);
            return res.redirect('/');
        }
    })(req, res, next);
};


// Redirige a la página principal
exports.redirectHome = (req, res) => {
    res.redirect(process.env.URL_REDIRECT);
};

// Permite guardar los datos del usuario logueado
exports.getProfile = (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        try {
            const user = await User.findByPk(decoded.id, { attributes: ['id', 'username', 'email', 'photo'] });
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    });
};

// Permite desloguear el usuario
exports.logout = (req, res) => {
    res.clearCookie('jwt');
    res.status(200).json({ message: 'Logout successful' });
};

// Funcionalidad para login local
exports.authLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user);

        res.status(200).json({ message: 'Login successful', token, user: { id: user.id, username: user.username, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Funcionalidad para registro local
exports.authRegister = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        const token = generateToken(newUser);

        res.status(201).json({ message: 'User registered successfully', token, user: { id: newUser.id, username: newUser.username, email: newUser.email } });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
