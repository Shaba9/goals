const express = require('express');
const app = express();
const client = require('./db-client');
const bcrypt = require('bcryptjs');
const jwt = require('./jwt');

app.use(express.json());

app.post('/signup', (req, res) => {
  const body = req.body;
  const username = body.username;
  const password = body.password;

  if(!username || !password) {
    res.status(400).json({ error: 'username and password required' });
    return;
  }

  client.query(`
    SELECT id FROM users WHERE username = $1;
  `,
  [username])
    .then(result => {
      if(result.rows.length > 0) {
        res.status(400).json({ error: 'username already exists' });
        return;
      }

      console.log('creating new user profile...');

      client.query(`
        INSERT INTO users (username, first_name, last_name, email, hash)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, username;
      `,
      [username, body.fName, body.lName, body.email, bcrypt.hashSync(password, 8)])
        .then(result => {
          const profile = result.rows[0];
          profile.token = jwt.sign({ id: profile.id });
          res.json(profile);
        });
    });
});

app.post('/signin', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if(!username || !password) {
    res.status(400).json({ error: 'username and password required' });
    return;
  }

  client.query(`
    SELECT id, username, hash
    FROM users
    WHERE username = $1;
  `,
  [username])
    .then(result => {
      const profile = result.rows[0];
      if(!profile || !bcrypt.compareSync(password, profile.hash)) {
        res.status(400).json({ error: 'username or password incorrect' });
        return;
      }

      res.json({
        id: profile.id,
        username: profile.username,
        token: jwt.sign({ id: profile.id })
      });
    });
});

app.get('/goals/:token', (req, res) => {
  client.query(`
    SELECT
      id,
      title
    FROM goals
    WHERE user_id = $1;
  `,
  [req.params.token])
    .then(result => {
      res.json(result.rows);
    });
});

app.post('/goals/:token', (req, res) => {
  const body = req.body;

  client.query(`
    INSERT INTO goals (title, start_date, end_date, user_id)
    VALUES($1, $2, $3, $4)
    RETURNING title
  `,
  [body.title, body.stDate, body.enDate, body.userId])
    .then(result => {
      res.json(result.rows[0]);
    });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log('server app started on port', PORT);
});