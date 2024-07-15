module.exports = function(sequelize, DataTypes) {
    let alias = "User";
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name :{
            type: DataTypes.STRING(70),
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING(70),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        password:{
            type: DataTypes.STRING(150),
            allowNull: false
        },
        rol:{
            type: DataTypes.STRING(20),
            allowNull: false
        }
    }
    let config = {
        tableName: "users",
        timestamps: false
    }
    const User = sequelize.define(alias, cols, config)
    return User;
}