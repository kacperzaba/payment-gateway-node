import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Transaction = sequelize.define('Transaction', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    paymentSystem: {
        type: DataTypes.ENUM("stripe"),
        defaultValue: "stripe",
        allowNull: true
    },
    paymentSystemTransactionId: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    transactionStatus: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    currency: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    errorMessage: {
        type: DataTypes.STRING,
        allowNull: true,

    },
    createdDate: {
        type: DataTypes.DATE,
        allowNull: true
    }
});


export default Transaction;