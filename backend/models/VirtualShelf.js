import db from '../dbConfig.js';
import Sequelize from 'sequelize';

const VirtualShelf = db.define("VirtualShelf", {
    VirtualShelfId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    VirtualShelfDescriere: {
        type: Sequelize.STRING,
        validate: {
            len: {
                args: [3, 100],
                msg: "Descrierea trebuie sa aiba minim 3 caractere!"
            }
        },
        allowNull: false
    },
    VirtualShelfData: {
        type: Sequelize.DATEONLY,
        validate: {
            isDate: {
                msg: "Data introdusa nu respecta formatul YYYY-MM-DD!"
            }
        },
        allowNull: false
    }
})

export default VirtualShelf;