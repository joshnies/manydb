# manydb

[![npm version](https://img.shields.io/npm/v/manydb.svg)](https://www.npmjs.com/package/manydb)

Lightweight multi-idiom database API for Node.js.

## Install
```sh
yarn add manydb

// or

npm install manydb
```

## Usage
ManyDB currently supports MySQL and PostgreSQL.

### Example
```js
import { createDb, POSTGRES } from manydb;

// Create and initialize database
const db = createDb({
  type: POSTGRES,
  user: 'myuser',
  password: 'pass', // optional
  host: 'localhost',
  database: 'my_db'
});

// Connect to database
db.connect()
  .then(() => {
    // ...
  })
  .catch(err => {
    // ...
  });

// Query
db.query('SELECT * FROM products')
  .then(result => {
    // ...
  })
  .catch(err => {
    // ...
  });
```

### Creating a database
You can create a database using the provided `createDb` function.

Pass in a config object specifying the database details.

| Property | Description |
| ------------- | ------------- |
| type | Type of database to use. (It's recommended to use the provided type constants.) |
| user | Database user. |
| password | Password for user. |
| host | Database host domain. (usually `localhost` for development) |
| database | Database name. |

```js
// Create and initialize database
const db = createDb({
  type: POSTGRES,
  user: 'myuser',
  password: 'pass', // optional
  host: 'localhost',
  database: 'my_db'
});
```

### Connection
You have to connect to the database before using it. Doing this is as simple as:

```js
// Connect
db.connect()
  .then(() => {
    // ...
  })
  .catch(err => {
    // ...
  });

// Disconnect (only if needed)
db.disconnect()
  .then(() => {
    // ...
  })
  .catch(err => {
    // ...
  });
```

### Query
Query the database.

```js
// Query
db.query('SELECT * FROM products')
  .then(result => {
    // ...
  })
  .catch(err => {
    // ...
  });
```
