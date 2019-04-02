const router = require('express').Router();
const { User } = require('../db');

module.exports = router;

// GET /api/users
router.get('/', (req, res, next) => {
  User.findAll()
    .then(users => res.json(users))
    .catch(next);
});

// GET /api/users/:userId
router.get('/:userId', (req, res, next) => {
  const { userId } = req.params;
  User.findOne({ where: { id: userId } })
    .then(user => res.json(user))
    .catch(next);
});

// DESTROY /api/users/:userId
router.delete('/:userId', (req, res, next) => {
  const { userId } = req.params;
  User.destroy({ where: { id: userId } })
    .then(() => res.sendStatus(200))
    .catch(next);
});

// POST /api/users
router.post('/', (req, res, next) => {
  const { name, bio, rank } = req.body;
  User.create({ name, bio, rank })
    .then(user => res.json(user))
    .catch(next);
});

// PUT /api/users/:userId
router.put('/:userId', (req, res, next) => {
  const { name, bio, rank } = req.body;
  const { userId } = req.params;

  User.update({ name, bio, rank }, { returning: true, where: { id: userId } })
    .then(([rowsUpdated, updatedUser]) => res.json(updatedUser[0]))
    .catch(next);
});
