import Sequelize from 'sequelize';
import { DB_USERNAME, DB_PASSWORD } from './Const.js';

const db = new Sequelize({
    dialect: 'mysql',
    database: 'shelf',
    username: DB_USERNAME,
    password: DB_PASSWORD,
    logging: false,
    define: {
        timestamps: false,
        freezeTableName: true
    }
})

//  CLEARDB_DATABASE_URL: mysql://b9c2118f3966f8:dd6dd458@us-cdbr-east-05.
//  cleardb.net/heroku_97312aeed9148fb?reconnect=true

export default db;