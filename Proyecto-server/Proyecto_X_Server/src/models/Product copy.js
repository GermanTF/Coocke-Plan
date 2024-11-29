const sequelize = require('../config/dbMySql');
const{DataTypes} = require('sequelize');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false   
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: true
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'products'
});

module.exports=Product;