const validTypes = ['Plante', 'Poison', 'Feu' , 'Eau' , 'Insecte' , 'Vol' , 'Normal', 'Electrik', 'Fée']

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:{
          msg : 'Le nom est déja pris.'
        },
        validate:{
          notEmpty : {msg: 'Le pokemon doit avoir un nom'},
          notNull: {msg : 'Le nom est une propriété requise.'}
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
          isInt : {msg: 'Utilisez uniquement des nombres entier pour les dégas'},
          notNull: {msg : 'Les points de vie sont une propriété requise.'},
          min : {
            args : [0],
            msg: "les points de vie ne peuvent être inférieur à 0"

          },
          max : {
            args : [200],
            msg: "les points de vie ne peuvent être supérieur à 200"

          }
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
          isInt : {msg: 'Utilisez uniquement des nombres entier pour les points de vie'},
          notNull: {msg : 'Les points de dégas sont une propriété requise.'},
          min : {
            args : [0],
            msg: "les points de vie ne peuvent être inférieur à 0"

          },
          max : {
            args : [200],
            msg: "les points de vie ne peuvent être supérieur à 200"

          },
          
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
          isUrl : {msg: 'l\'image doit être un url'},
          notNull: {msg : 'L\'image est une propriété requise.'}
        }
        
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get(){
          return this.getDataValue('types').split(',')
        },
        set(types){
          return this.setDataValue('types',types.join())
        },
        validate:{
          isTypesValid(value){
          if(!value){

            throw new Error('Un pokémon doit au moins avoir un type.')

          }
          if(value.split(',').length > 3){
            throw new Error('Un pokémon ne peux pas avoir plus de trois types.')
          }
          value.split(',').forEach(type => {

            if(!validTypes.includes(type)){

              throw new Error(`Le type d'un pokémo doit appartenir à la liste suivante: ${validTypes}`)
            }
            
          });
        }
        }
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }