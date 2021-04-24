import Sequelize from 'sequelize';

const db = new Sequelize('nodejs2021q2', 'postgres', '123', {
    host: 'localhost',
    dialect: 'postgres'
});

export default db;
