
module.exports = function(sequelize, dataTypes){
    const colum = {
        brand: dataTypes.STRING,
        model: dataTypes.STRING,
        price: dataTypes.DOUBLE
    }

    const config = {
        underscored: true,
        paranoid: true
    }

    const Car = sequelize.define("Car", colum, config);

    Car.associate = (models) => {

        Car.hasMany(models.Image, {
            as: "images",
            foreignKey: "car_id"
        });

        Car.belongsToMany(models.Color, {
            as: 'milanesa',
            through: 'car_color',
            foreignKey: 'car_id',
            otherKey: 'color_id',
            timestamps: false
        });

    };
    return Car;
}