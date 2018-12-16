const client = require('../db-client');

client.query(`

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(256) NOT NULL,
    first_name VARCHAR(256) NOT NULL,
    last_name VARCHAR(256) NOT NULL,
    email VARCHAR(256) NOT NULL,
    hash VARCHAR(256) NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS goals (
      id SERIAL PRIMARY KEY,
      title VARCHAR(256) NOT NULL,
      start_date DATE NOT NULL,
      end_date DATE NOT NULL,
      user_id VARCHAR(256) NOT NULL
    );

`)
  .then(
    () => console.log('create tables completed'),
    err => console.log(err)    
  )
  .then(() => {
    client.end();
  });