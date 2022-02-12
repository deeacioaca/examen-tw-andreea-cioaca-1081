import db from '../dbConfig.js';
import Sequelize from 'sequelize';

const Book = db.define("Book", {
    BookId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    BookTitlu: {
        type: Sequelize.STRING,
        validate: {
            len: {
                args: [5, 100],
                msg: "Titlu cartii trebuie sa aiba minim 5 caractere!"
            }
        },
        allowNull: false
    },
    BookListaGenuri: {
        type: Sequelize.STRING,
        isIn : ['TRAGEDY', 'COMEDY', 'ROMANCE', 'ACTION', 'FANTASY', 'DRAMA'],
        allowNull: false
    },
    BookURL: {
        type: Sequelize.STRING,
        validate: {
            isUrl: {
                msg: "Introduceti un URL valid"
            }
        },
        allowNull: true
    },
    VirtualShelfId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

export default Book;