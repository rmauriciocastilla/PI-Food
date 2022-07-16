const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    healthScore: {
      type: DataTypes.FLOAT,
      validate:{
        min: 0,
        max: 100
      }
    },
    image:{
      type: DataTypes.TEXT,
      defaultValue: "https://www.pequerecetas.com/wp-content/uploads/2021/03/comidas-rapidas-660x550.jpg"
    },  
    steps: {
      type: DataTypes.TEXT
    }
  },{
    timestamps: false
  });
};
