// TODO - score:
//      - Add score
//      - Get score by game id ( pageable default 10/page )
//      - Top 10 players / game
//      - Get top5 players

const db = require('../database');

exports.get = async (_, res) => {
  try {
    const scores = await db.all(
      'select distinct name, email from (select  users.name, users.email, scores.points from users, scores where users.id = scores.userId group by users.name, scores.points order by scores.points desc) limit 5',
    );
    return res.status(200).json(scores);
  } catch (e) {
    return res.status(500).send('Something went wrong/getAllScores');
  }
};

exports.getPlayersPerGame = async (_, res) => {
  try {
    const gameIds = await db.all('select * from games');

    const ret = gameIds.map(async (value) => {
      const temp = {};
      temp.gameId = value.id;
      temp.users = await db.all(
        'select games.name as gameName, scores.points, users.name as userName, users.email from games, scores, users where games.id = $id and scores.gameId = games.id and scores.userId = users.id order by scores.points desc',
        { $id: value.id },
      );
      // delete duplicates from users array
      temp.users = temp.users.filter(
        (user, index, self) => index === self.findIndex((t) => t.email === user.email),
      );
      temp.users = temp.users.slice(0, 10);
      return temp;
    });

    return Promise.all(ret).then((completed) => {
      return res.status(200).json(completed);
    });
  } catch (e) {
    return res.status(500).send('Something went wrong/getAllScores');
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const scores = await db.get('SELECT * FROM scores, games where scores.gameId = $id ', {
      $id: id,
    });

    if (!scores) return res.status(400).send('Bad request');

    return res.status(200).json(scores);
  } catch (e) {
    return res.status(500).send('Something went wrong/GetScoreById');
  }
};

exports.post = async (req, res) => {
  try {
    const { userId, gameId, value } = req.body;

    if (!userId || !gameId || !value) return res.status(400).send('Bad request/AddScore');

    const id = await db.run(
      `INSERT INTO scores(userId, gameId, value) VALUES ($userId, $gameId, $value)`,
      {
        $userId: userId,
        $gameId: gameId,
        $value: value,
      },
    );
    return res.status(200).json({ id, userId, gameId, value });
  } catch (e) {
    return res.status(500).send('Something went wrong/addScore');
  }
};
