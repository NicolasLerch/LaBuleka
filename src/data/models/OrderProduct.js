module.exports = function(sequelize, DataTypes) {   
    let alias = "OrderProduct"
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'orders',
                key: 'id'
            }
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name:{
            type: DataTypes.STRING(70),
            allowNull: false
        }, 
        subtotal: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }
    let config={
        tableName: "OrderProducts",
        timestamps: false
    }

    let OrderProduct = sequelize.define(alias, cols, config)

    OrderProduct.associate = function(models){
        OrderProduct.belongsTo(models.Order, {
            as: "order",
            foreignKey: "orderId"
        })
        OrderProduct.belongsTo(models.Product, {
            as: "product",
            foreignKey: "productId",
            onDelete: 'SET NULL'
        })
    }
    return OrderProduct
}