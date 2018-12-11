const client = require('../db-client');

// CREATE TABLE IF NOT EXISTS goals (
//   id SERIAL PRIMARY KEY,
//   title VARCHAR(256) NOT NULL,
//   start_date VARCHAR(256) NOT NULL,
//   end_date VARCHAR(256) NOT NULL,
//   completed BOOLEAN,
//   user_id INTEGER NOT NULL
// );
client.query(`

  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(256) NOT NULL,
    first_name VARCHAR(256) NOT NULL,
    last_name VARCHAR(256) NOT NULL,
    email VARCHAR(256) NOT NULL,
    password VARCHAR(256) NOT NULL
  );
`)
  .then(
    () => console.log('create tables completed'),
    err => console.log(err)    
  )
  .then(() => {
    client.end;
  });