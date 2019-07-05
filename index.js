/**
 * Package exports.
 */

const createDb = require('./src/db');
const { MYSQL, POSTGRES } = require('./src/constants');

module.exports.createDb = createDb;
module.exports.MYSQL = MYSQL;
module.exports.POSTGRES = POSTGRES;
