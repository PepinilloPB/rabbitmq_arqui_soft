"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_mysql_1 = __importDefault(require("promise-mysql"));
const pool = promise_mysql_1.default.createPool({
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
exports.default = pool;
