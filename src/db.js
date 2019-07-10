const { MYSQL, POSTGRES } = require('./constants');

class ManyDb {
  db;
  config;
  connection;

  constructor(config) {
    this.config = config;

    // Set and require database type
    if (this.config.type != null) {
      switch(this.config.type) {
        case MYSQL:
          this.db = require('mysql');
          break;
        case POSTGRES:
          const { Pool } = require('pg');
          this.db = Pool;
          break;
        default:
          throw new Error(`Invalid database type: ${this.config.type}`);
      }
    } else {
      throw new Error('No database type was specified.');
    }

    // Validate config
    if (this.config.user == null) {
      throw new Error('No database user was specified.');
    }

    if (this.config.host == null) {
      console.warn('No database host was specified, \'localhost\' will be used.');
    }

    if (this.config.database == null) {
      throw new Error('No database name was specified.');
    }
  }

  /**
   * Connect to the configured database.
   * 
   * @returns Promise
   */
  connect() {
    return new Promise((resolve, reject) => {
      switch (this.config.type) {
        case MYSQL:
          connection = this.db.createConnection({
            host: this.config.host ? this.config.host : 'localhost',
            user: this.config.user,
            password: this.config.password,
            database: this.config.database
          });

          this.connection.connect((err) => {
            if (err) {
              reject(err);
            }

            resolve();
          });
          break;
        case POSTGRES:
          this.connection = new this.db({
            host: this.config.host,
            user: this.config.user,
            password: this.config.password ? this.config.password : null,
            database: this.config.database
          });

          this.connection.connect((err) => {
            if (err) {
              reject(err);
            }

            resolve();
          });
          break;
        default:
          reject({ message: 'Failed to resolve DB configuration type.' });
          break;
      }
    });
  }

  /**
   * Disconnect from the databse.
   * 
   * @returns Promise
   */
  disconnect() {
    return new Promise((resolve, reject) => {
      switch (this.config.type) {
        case MYSQL:
          this.connection.end((err) => {
            if (err) {
              reject(err);
            }

            resolve();
          });
          break;
        case POSTGRES:
          this.connection.end();

          resolve();
          break;
        default:
          reject({ message: 'Failed to resolve DB configuration type.' });
          break;
      }
    });
  }

  /**
   * Run a query on the connected database.
   * 
   * @param queryStr Query to run.
   * 
   * @returns Promise
   */
  query(queryStr) {
    return new Promise((resolve, reject) => {
      switch (this.config.type) {
        case MYSQL:
          this.connection.query(queryStr, (err, result, fields) => {
            if (err) {
              reject(err);
            }

            resolve();
          });
          break;
        case POSTGRES:
          this.connection.query(queryStr)
            .then(result => resolve(result))
            .catch(err => reject(err));
          break;
        default:
          reject({ message: 'Failed to resolve DB configuration type.' });
          break;
      }
    });
  }
}

/**
 * Create a database.
 * 
 * @param config Configuration to connect to this database.
 */
function createDb(config) {
  return new ManyDb(config);
}

module.exports = createDb;
