// import { Model, DataTypes } from 'sequelize';
// import db from '.';
// import Teams from './Teams';

// class Matches extends Model {
//   public id!: number;

//   public homeTeam: number;

//   public homeTeamGoals: number;

//   public awayTeam: number;

//   public awayTeamGoals: number;

//   public inProgress: boolean;
// }

// Matches.init({
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     allowNull: false,
//     autoIncrement: true,
//   },
//   home_team: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   home_team_goals: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   away_team: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   away_team_goals: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   in_progress: {
//     type: DataTypes.BOOLEAN,
//     allowNull: false,
//   },
// }, {
//   // ... Outras configs
//   underscored: true,
//   sequelize: db,
//   modelName: 'Matches',
//   timestamps: false,
// });

// /**
//   * `Workaround` para aplicar as associations em TS:
//   * Associations 1:N devem ficar em uma das instâncias de modelo
//   * */

// // OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// // OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// // Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// // Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

// Matches.hasMany(Teams, { foreignKey: 'homeTeam', as: 'id' });
// Matches.hasMany(Teams, { foreignKey: 'awayTeam', as: 'id' });

// export default Matches;
