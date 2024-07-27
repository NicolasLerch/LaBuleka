module.exports= function(sequelize, DataTypes){
    let alias = "Product";
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name:{
            type: DataTypes.STRING(70),
            allowNull: false
        },
        price:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        image:{
            type: DataTypes.STRING(70),
            allowNull: false
        },
        category:{
            type: DataTypes.STRING(70),
            allowNull: false
        },
        available:{
            type: DataTypes.TINYINT,
            allowNull: false
        },
        stock:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }

    let config = {
        tableName: "products",
        timestamps: false
    }

    let Product = sequelize.define(alias, cols, config);

    Product.associate = function(models){
        Product.hasMany(models.OrderProduct, {
            foreignKey: 'productId',
            onDelete: 'SET NULL',
          });
    }

    return Product

}