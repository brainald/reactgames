// TODO users:
//!   - Get all users
//!   - Get user By id ( games, score )
//!   - Add users ( register/ sign up )

const db = require('../database');

exports.get = async (_, res) => {
  try {
    const users = await db.all('SELECT name, email, id FROM users');
    return res.status(200).json(users);
  } catch (e) {
    return res.status(500).send('Something went wrong/getAllUsers');
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await db.all(
      'SELECT users.name as username, users.email, games.name as gamename, scores.points FROM users, games, scores where scores.userId = $id and users.id = scores.userId and scores.gameId = games.id',
      { $id: id },
    );

    if (!users) return res.status(400).send('Bad request');

    return res.status(200).json(users);
  } catch (e) {
    return res.status(500).send('Something went wrong/GetUserById');
  }
};

exports.post = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) return res.status(400).send('Bad request/AddUser');

    const id = await db.run(
      `INSERT INTO users(name, email, password) VALUES ($name, $email, $password)`,
      {
        $name: name,
        $email: email,
        $password: password,
      },
    );
    return res.status(200).json({ id, name, email, password });
  } catch (e) {
    return res.status(500).send('Something went wrong/addUser');
  }
};
