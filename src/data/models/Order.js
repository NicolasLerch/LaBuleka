module.exports = function(sequelize, DataTypes){
    let alias = "Order"
    let cols ={
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        total:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        paymentMethod: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        date :{
            type: DataTypes.DATE,
            allowNull: false         
        },
        time: {
            type: DataTypes.TIME,
            allowNull: false,
            // defaultValue: DataTypes.NOW
        }
    }
    let config = {
        tableName: "orders",
        timestamps: false
    }

    let Order = sequelize.define(alias, cols, config);

    Order.associate = (models) => {
        Order.belongsTo(models.User, {
            as: "user",
            foreignKey: "userId"
        });

        Order.hasMany(models.OrderProduct, {
            as: "orderProducts",
            foreignKey: "orderId"
        });
    }

    return Order;
}