const sequelize = require('../config/dbMySql');
const {DataTypes} = require('sequelize');

const Product = sequelize.define('Receta', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false   
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    instrucciones: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imagen_url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author_profile: {
        type: DataTypes.STRING,
        allowNull: false
    },
    recipe_url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precio: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'recetas'
});

module.exports=Product;