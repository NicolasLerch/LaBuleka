module.exports = function(sequelize, DataTypes) {
    let alias = "Message"
    let cols = {
        id: {
            type:DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name : {
            type:DataTypes.STRING(70),
            allowNull: false
        },
        email: {
            type:DataTypes.STRING(70),
            allowNull: false
        },
        subject: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        message :{
            type: DataTypes.TEXT,
            allowNull: false
        }
    }

    let config ={
        tableName: "messages",
        timestamps: false
    }

    let Message = sequelize.define(alias, cols, config)

    return Message;

}