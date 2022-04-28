import mysql from 'promise-mysql';

const pool = mysql.createPool({
    connectionLimit: 1000,
    connectTimeout: 60 * 60 * 1000,
    acquireTimeout: 60 * 60 * 1000,
    timeout: 60 * 60 * 1000,
    //host: 'mysql',
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'school',
    port: 3306
});

pool.getConnection().then(connection => {
    pool.releaseConnection(connection);
    console.log('DB is connected');
});

export default pool;