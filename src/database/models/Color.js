module.exports= function(sequelize, DataTypes){
    const Color = sequelize.define("Color", {
        name: DataTypes.STRING
    },{
        timestamps: false
    });

    Color.associate = (models) => {
        Color.belongsToMany(models.Car, {
            as: 'cars',
            through: 'car_color',
            foreignKey: 'color_id',
            otherKey: 'car_id',
            timestamps: false
        });
    };
    
    return Color;
}