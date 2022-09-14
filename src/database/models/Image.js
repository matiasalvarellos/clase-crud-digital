module.exports=function(sequelize, dataTypes){
    const Image = sequelize.define("Image", {
      name: dataTypes.STRING
    },{
        timestamps: false
    });

    Image.associate = (models) => {
        Image.belongsTo(models.Car, {
            as: "car",
            foreignKey: "car_id"
        });
    };

    return Image;
}