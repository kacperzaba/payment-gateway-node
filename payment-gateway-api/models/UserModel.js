import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const UserModel = sequelize.define('User', {
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
});

export default UserModel;
