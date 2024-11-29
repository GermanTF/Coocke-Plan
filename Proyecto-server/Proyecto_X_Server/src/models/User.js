const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbMySql');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'El nombre de usuario es requerido'
      },
      notEmpty: {
        msg: 'El nombre de usuario no puede estar vacío'
      }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: {
        msg: 'El email es requerido'
      },
      isEmail: {
        msg: 'Debe ser un email válido'
      }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true, // Permitir valores null para el password
    validate: {
      len: {
        args: [6, 128],
        msg: 'La contraseña debe tener al menos 6 caracteres'
      }
    }
  },
  googleId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true,
  },
  facebookId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true,
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: true, 
  }
}, {
  tableName: 'users',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

module.exports = User;
