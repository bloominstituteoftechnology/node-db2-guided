# Managing API Data

## Instructor Notes

Students should have [SQLite Studio](https://sqlitestudio.pl/index.rvt?act=download) installed.

## Starter Code

The [Starter Code](https://github.com/LambdaSchool/webdb-ii-guided) for this project is configured to run the server by typing `yarn server` or `npm run server`. The server will restart automatically on changes.

## Introduction

Knex is a query builder we can use to connect from an API to several Database Management Systems.

It translates code written in JavaScript to the correct SQL syntax for the target Database and automatically converts the results into JavaScript objects and arrays.

## Configure Knex to Connect to SQLite

Knex uses different database drivers, depending on the target DBMS. For SQLite it uses the `sqlite3` npm module.

User `npm i knex sqlite3` to add [Knex](https://www.npmjs.com/package/knex) and [the SQLite3 driver](https://www.npmjs.com/package/sqlite3) to the project.

To get a connection to a database using `knex`:

- require `knex`
- build configuration object and pass it to `knex` as the first argument.

Example using SQLite3:

```js
const knex = require('knex');

// this configuration object teaches knex how to find the database and what driver to use
const knexConfig = {
  client: 'sqlite3', // the sqlite3 database driver
  useNullAsDefault: true, // needed when working with SQLite
  connection: {
    // relative to the root folder
    filename: './rolex.db3', // path to the database file
    // if the database does not exist an empty one with this name will be created
  },
};

const db = knex(knexConfig);
// db holds a configured connection to the database that can be used to run queries
```

Next we will learn how to retrieve all data from a table using `knex`.

## Use Knex to Retrieve Data

Imagine our database had a table called `roles`, we could write the following endpoint to retrieve a list of all the records in the `roles` table.

```js
router.get('/roles', (req, res) => {
  // check knex docs for the different ways to get data from tables
  // we'll use the following format
  db('roles') // returns a promise, so we need the bros (.then().catch())
    .then(roles => {
      res.status(200).json(roles);
    })
    .catch(error => {
      // any errors that occur connecting to the database or roles table can be handled here
      res.status(500).json(error);
    });
});
```

Let's see an example of how to find a `role` by it's `id`.

```js
router.get('/roles/:id', (req, res) => {
  db('roles')
    .where({ id: req.params.id }) // always returns an array
    .first() // grabs the first element of the array
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
```

Next we will learn how to add data to a database table using `knex`.

## Use Knex to Add Data

```js
router.post('/roles', (req, res) => {
  db('roles', 'id')
    .insert(req.body)
    .then(ids => {
      // returns an array with one element, the id of the last record inserted
      const [id] = ids; // de-structure the first element of the array and name it 'id'

      // we could return the id of the or make another call to retrieve the newly inserted record
      db('roles')
        .where({ id })
        .first()
        .then(role => {
          res.status(200).json(role);
        });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
```

## Use Knex to Update Data

```js
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
```

## Use Knex to Remove Data

```js
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
```
