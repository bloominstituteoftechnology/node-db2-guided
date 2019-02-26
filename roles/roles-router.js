const router = require('express').Router();
const knex = require('knex');

const knexConfig = {
  client: 'sqlite3', // the npm module we installed
  useNullAsDefault: true, // needed when working with SQLite
  connection: {
    filename: './data/rolex.db3', // we need to create the data folder and the rolex.db3 database
  },
};

const db = knex(knexConfig);

router.get('/', (req, res) => {
  // check knex docs for the different ways to get data from tables
  // we'll use the following format
  db('roles') // returns a promise, so we need the bros
    .then(roles => {
      res.status(200).json(roles);
    })
    .catch(error => {
      // we'll return the error during development to see what it is
      res.status(500).json(error); // in production handle the error and return a nice message
    });
});

router.get('/:id', (req, res) => {
  db('roles')
    .where({ id: req.params.id }) // always returns an array
    // show the results without adding .first(), then come back and add it to remove the wrapping array
    .first() // grabs the first element of the array, we could also just use [0] to retrieve it manually
    .then(role => {
      if (role) {
        res.status(200).json(role);
      } else {
        res.status(404).json({ message: 'Role not found' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/', (req, res) => {
  // db('roles').insert(req.body).then([id] => {
  // or alternatively:
  db('roles')
    .insert(req.body) // insert returns an array with the id of the last row inserted as it's only element
    .then(ids => {
      const [id] = ids;
      // if we want to return the inserted record we need to make another call to the database
      db('roles')
        .where({ id })
        .first()
        .then(role => {
          res.status(200).json(role);
        });
    })
    .catch(error => {
      // this catch will be run for any errors including errors in the nested call to get the role by id
      res.status(500).json(error);
    });
});

router.put('/:id', (req, res) => {
  db('roles')
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      if (count > 0) {
        db('roles')
          .where({ id: req.params.id })
          .first()
          .then(role => {
            res.status(200).json(role);
          });
      } else {
        res.status(404).json({ message: 'Role not found' });
      }
    })
    .catch(error => {
      // this catch will be run for any errors including errors in the nested call to get the role by id
      res.status(500).json(error);
    });
});

router.delete('/:id', (req, res) => {
  db('roles')
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(204).end(); // we could also respond with 200 and a message
      } else {
        res.status(404).json({ message: 'Role not found' });
      }
    })
    .catch(error => {
      // this catch will be run for any errors including errors in the nested call to get the role by id
      res.status(500).json(error);
    });
});

// make a DELETE to /api/roles to clean the roles table and reset the ids
router.delete('/', (req, res) => {
  db('roles')
    .truncate()
    .then(count => res.status(204).end());
});

module.exports = router;
