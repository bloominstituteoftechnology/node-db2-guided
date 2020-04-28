const express = require('express');
const knex = require('knex');

const router = express.Router();

//configure the connection to the database
const knexConfig = {
  client: 'sqlite3', // db driver
  connection: { //could be an object or a string
    filename: './data/produce.db3'
  },
  useNullAsDefault: true // Only needed for Sqlite3
};

// db represents a live connection to the database
const db = knex(knexConfig);

router.get('/', (req, res) => {
  db('fruits')
    .then(fruits => {
      res.json(fruits);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Failed to retrieve fruits'
      });
    });
});

router.get('/:id', (req, res) => {
  const {
    id
  } = req.params;

  db('fruits').where({
      id
    }).first()
    .then(fruit => {
      res.json(fruit);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Failed to retrieve fruit'
      });
    });
});

router.post('/', (req, res) => {
  const fruitData = req.body;
  db('fruits').insert(fruitData)
    .then(ids => {
      db('fruits').where({
          id: ids[0]
        })
        .then(newFruitEntry => {
          res.status(201).json(newFruitEntry);
        });
    })
    .catch(err => {
      console.log('POST error', err);
      res.status(500).json({
        message: "Failed to store data"
      });
    });
});

module.exports = router;