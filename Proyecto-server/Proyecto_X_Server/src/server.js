require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('./config/passportConfig');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/CartRoutes');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sequelize } = require('./models/index');  // Importar solo sequelize ya configurado

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(authRoutes);
app.use(productRoutes);
app.use(cartRoutes); 

// Sincronizar sequelize para la base de datos
sequelize.sync().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Aplicación corriendo en el puerto", process.env.PORT);
    });
}).catch(err => {
    console.log('No me pude conectar a la base de datos: ' + err);
});
