import Sequelize from 'sequelize';
import { DB_USERNAME, DB_PASSWORD } from './Const.js';

const db = new Sequelize({
    dialect: 'mysql',
    database: 'shelf',
    username: 'b9c2118f3966f8',
    password: 'dd6dd458',
    logging: false,
    define: {
        timestamps: false,
        freezeTableName: true
    }
})

module.exports = {
    HOST: "us-cdbr-east-05.cleardb.net",
    USER: "b9c2118f3966f8",
    PASSWORD: "dd6dd458",
    DB: "heroku_97312aeed9148fb"
  };

//  CLEARDB_DATABASE_URL: mysql://b9c2118f3966f8:dd6dd458@us-cdbr-east-05.
//  cleardb.net/heroku_97312aeed9148fb?reconnect=true

export default db;