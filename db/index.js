const db = require('./db');
const User = require('./user');

const users = [
  { name: 'Thor Odinson', bio: 'God of Thunder', rank: 1 },
  { name: 'Tony Stark', bio: 'Ironman', rank: 2 },
  { name: 'Steve Rogers', bio: 'Captain America', rank: 2 },
  { name: 'Nick Fury', bio: 'Director of SHIELD', rank: 2 },
  { name: 'Peter Quill', bio: 'Star-Lord', rank: 3 },
  { name: 'Peter Parker', bio: 'Spiderman', rank: 5 },
  { name: 'Phil Coulson', bio: 'SHIELD agent', rank: 10 },
];

const syncAndSeed = () => {
  return db.sync({ force: true }).then(() => {
    return Promise.all(
      users.map(({ name, bio, rank }) => User.create({ name, bio, rank }))
    );
  });
};

module.exports = { db, User, syncAndSeed };
