module.exports = function(sequelize, dataTypes){

    const User = sequelize.define("User", {
        name: dataTypes.STRING ,
        last_name: dataTypes.STRING ,
        email: dataTypes.STRING ,
        password: dataTypes.STRING ,
        type_customer: dataTypes.STRING ,
        avatar: dataTypes.STRING,
        admin: dataTypes.BOOLEAN
    },{
        underscored: true,
    });

    return User;
}