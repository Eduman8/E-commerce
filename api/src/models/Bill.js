const { DataTypes, UUIDV4, INTEGER } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('bill', {
    billId: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
    },
    products: {
        type: DataTypes.ARRAY(DataTypes.INTEGER)
    },
    value: {
        type: DataTypes.DECIMAL
    },
    discount: { //en porcentaje
        type: DataTypes.INTEGER
    },    
    status: {
        type: DataTypes.STRING
    },
    paid: {
        type: DataTypes.BOOLEAN
    }
   });
};