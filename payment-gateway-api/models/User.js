import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [6, 255],
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [6, 255],
        },
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
       defaultValue: 'user' 
    }
},
{
    timestamps: true
});

export default User;