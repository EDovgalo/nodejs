import Sequelize from 'sequelize';


const {
    env: {
        DB_PASS,
        DB_USER,
        DB_HOST,
        DB_NAME
    }
} = process;

const db = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: 'postgres',
    logging: false
});

export default db;
