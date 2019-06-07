# DB II Guided Project Solution

Guided project solution for **DB II** Module.

Starter code is here: [Web DB II Guided Project](https://github.com/LambdaSchool/webdb-ii-guided).

## Prerequisites

- [SQLite Studio](https://sqlitestudio.pl/index.rvt?act=download) installed.

## Starter Code

The [Starter Code](https://github.com/LambdaSchool/webdb-ii-guided) for this project is configured to run the server by typing `yarn server` or `npm run server`. The server will restart automatically on changes.

## How to Contribute

- clone the [starter code](https://github.com/LambdaSchool/webdb-ii-guided).
- create a solution branch: `git checkout -b solution`.
- add this repository as a remote: `git remote add solution https://github.com/LambdaSchool/webdb-ii-guided-solution`
- pull from this repository's `master` branch into the `solution` branch in your local folder `git pull solution master:solution --force`.

A this point you should have a `master` branch pointing to the student's repository and a `solution` branch with the latest changes added to the solution repository.

When making changes to the `solution` branch, commit the changes and type `git push solution solution:master` to push them to this repository.

When making changes to the `master` branch, commit the changes and use `git push origin master` to push them to the student's repository.

## Introduce Module Challenge

Introduce the project for the afternoon. If they are done early, encourage them to study tomorrow's content and follow the tutorials on TK.

## Introduce Database Mangement Systems

Briefly review what a DBMS is using the material in TK. Clarify the difference between a type of database and a DBMS. 

## Introduce SQLite Studio

Students should have already installed this tool via the preclass videos.

1. Start the server using `yarn server` or `npm server`. 

2. Using the browser or `Postman`, run a `GET` request to `/api/fruits`. We believe we are seeing all entries from the database, but how do we know for sure?

3. Open `./data/produce.db3` database in SQLiteStudio and confirm that the entries in the `fruits` table matches the API response.

4. Clarify that this is a SQLite specific tool and different DBMS's have different apps, visualizer, commandline tools, etc. that allow direct database access. 

## Introduce the Database Schema

Within SQLiteStudio, explore the schema of the `fruits` table.

- Discuss datatypes. These can vary based on DBMS.
- Discuss primary keys. These are required and must be unique. Though they are often auto incrementing integers, they don't necessarily need to be that. 
- Discuss constraints: notNull, unique, default, etc.
- Clarify the difference between a database table and a database schema

Using `POST /api/fruits`, try inserting data that violates the schema. Note the errors that appear in the console. 

## Creating a database and table using SQLiteStudio

1. Delete the `./data/produce.db3` database. Confirm that the API no longer functions. 

2. Use SQLiteStudio to create a new database, also called `produce.db3` and stored in the `./data/` directory. Emphasize it must be named exactly that. 

3. Create a `fruits` table using SQLiteStudio.

Fruits Table Schema

| Column          | Type         | Metadata                              |
| --------------- | ------------ | ------------------------------------- |
| id              | integer      | Primary Key, Configure auto-increment |
| name            | varchar(128) | Unique, Not Null                      |
| avg weight (oz) | decimal      | Not Null                              |
| delicious       | boolean      |                          |

4. Commit the schema using the check mark button. Show the students the SQL code for schema creation. 

5. Go to the `data` tab for the table in SQLiteStudio. Add a few sample entries. 

6. Confirm that the API is working again. 

**wait for students to catch up, use a `yes/no` poll to let students tell you when they are done**

## Introduce Migrations

When creating and updating a schema we have a number of concerns to address:

- Each developers' local schema should be the same
- The development schema should be up to date with the production schema
- If the production schema needs to be changed, this must not corrupt any existing production data. 

Migrations are a standard process for managing a database schema with respect to these issue.  

**Take a break if it's a good time**

## Knex Setup

1. We need the `knex` and `sqlite3` libraries. Knex uses different database drivers, depending on the target DBMS. For SQLite it uses the `sqlite3` npm module. Note that both libraries have already been added into this particular repo. 

2. Open the `./fruits/fruits-model.js` file. Show where knex is configured, but mention that this not best practice. Delete the knex related code as the top of the file.

3. In order easily generate a configure `knex`, we can use the command: `knex init`. The students should have already globally installed `knex` in the preclass videos, but if not they may do so now or use `npx knex init`. 

4. Open `./knexfile.js`. We have auto generated config objects for three different environments. We may delete all except for the development object.

```js
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    }
  }

};
```

5. Update the database location and add `useNullAsDefault`.

```js
module.exports = {

  development: {
    // our DBMS driver
    client: 'sqlite3',
    // the location of our db
    connection: {
      filename: './data/produce.db3',
    },
    // necessary when using sqlite3
    useNullAsDefault: true
  }

};
```

6. Create a file called `./data/db-config.js`. Initialize knex in `db-config`.

```js
const knex = require('knex');

const config = require('../knexfile.js');

// we must select the development object from our knexfile
const db = knex(config.development);

// export for use in models
module.exports = db;
```

7. At the top of `./fruits/fruits-model.js`, import our config file.

```js
  const db = require('../data/db-config.js');
```

8. Confirm that the API is connecting to the database with a `GET` request. 

**wait for students to catch up, use a `yes/no` poll to let students tell you when they are done**

**Take a break if it's a good time**

## Create a Migration File

1. Delete `./data/fruits.db3`. We're going to create a schema for our DB using `knex`. 

2. Add the `migrations` field to `./knexfile.js`. This tells `knex` where to store our migration files. By default they'll appear in a directory called `./migrations/` in the root folder. 

```js
development: {
    client: 'sqlite3',
    connection: {
      filename: './data/produce.db3',
    },
    useNullAsDefault: true,
    // moves migration files into the data folder
    migrations: {
      directory: './data/migrations'
    }
  }
```

3. Create a new migration by running `knex migrate:make fruits-schema`. Show that a new file has appeared in `./data/migrations/`. `knex` has automatically added a timestamp. This is important for keeping track of the order of migrations.  

## Create a Schema with Migrations

Using the `Schema Builder` in `knex` we can now defined our schema in this file. 

1. Add code into `up` in the `fruits-schema` migration file. This tells knex how to add the table to the db. 

```js
exports.up = function(knex, Promise) {
  // don't forget the return statement
  return knex.schema.createTable('fruits', tbl => {
    tbl.increments();
    tbl.text('name', 128).unique().notNullable();
    tbl.decimal('avgWeightOz');
    tbl.boolean('delicious');
  });
};
```

2. Add code into `down`. This code should do the exact opposite of `up`, in case we need to undo our migration. 

```js
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('fruits');
};
```

3. Notice that we still don't have a database. Just writing the migration file won't enact any change. We have to run our schema using `knex migrate:latest`. It will tell us which migrations have run. It also creates the db if one doesn't exist. 

4. Confirm that the API is working again. 

**wait for students to catch up, use a `yes/no` poll to let students tell you when they are done**

## Rollbacks

Notice that we forgot to set `notNullable` on for `avgWeightOz`. If we notice this mistake **before** the changes have been pushed and merged, it's much easier to fix. 

1. Edit the `fruits-schema` `up` function as follows.

```js
  tbl.text('name', 128).unique().notNullable();
  // add the constraint here
  tbl.decimal('avgWeightOz').notNullable();
  tbl.boolean('delicious');
```

2. Run `knex migrate:latest`

3. Post a new fruit entry, missing the `avgWeightOz` field. Notice the database doesn't reject this. Our migration was not updated. When we ran `knex migrate:latest` no files ran because it doesn't detect changes to existing migrations. 

4. Run `knex migrate:rollback`. This undoes that migration. Make a `GET` request to confirm the table is gone. 

5. Run `knex migrate:latest`. We've now rerun our schema file. 

**wait for students to catch up, use a `yes/no` poll to let students tell you when they are done**

## Update a Schema with Migrations

Once any migrations have been pushed and merged into the master branch, we **should not** edit them. Instead, write a new migration for any changes. For example, perhaps a few months into the release of our fruit app we decide we want to track color. 

1. Create a new migration with `knex migrate:make fruits-color`

2. Write the `up` and `down` function for this migration. 

```js
exports.up = function(knex, Promise) {
  // use knex.schema.table() for updating tables
  return knex.schema.table('fruits', tbl => {  
    tbl.string('color', 128);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('fruits', tbl => {
    tbl.dropColumn('color');
  });
};
```

3. Run `knex migrate:latest`. 

4. `POST` a new entry to confirm our changes went through. 

## Seed the Database

Right now we have an empty database. Often we want to prepopulate it with test data. We use `knex seeds` for that.

1. Edit `./knexfile.js` to specify a directory. The default is a `./seed/` directory in the root folder. 

```js
  migrations: {
    directory: './data/migrations'
  },
  // add the seed option
  seeds: {
    directory: './data/seeds'
  }
```

2. Run `knex seed:make 01-fruits`. Notice it appears in `./data/seeds/`. Get in the habit of adding numbers to the name to control the order of our seed files, though in this repo we will only write one.

3. Set the table name we're interested in seeding.

```js
exports.seed = function(knex, Promise) {
  // change table name here
  return knex('fruits').del()
    .then(function () {
      // and here
      return knex('fruits').insert([
        {id: 1, colName: 'rowValue1'},
        {id: 2, colName: 'rowValue2'},
        {id: 3, colName: 'rowValue3'}
      ]);
    });
};

```

4. Before we seed data, we must wipe the table clean. Use `truncate()` so that the ids reset each time.

```js
// change del() to truncate()
return knex('fruits').truncate()
```

5. Add seed data. Copy the array into slack to save time. 

```js
exports.seed = function(knex, Promise) {
  return knex('fruits').truncate()
    .then(function () {
      // add data into insert
      return knex('fruits').insert([
        { name: 'dragon fruit', avgWeightOz: 16.7, color: 'red' },
        { name: 'durian', avgWeightOz: 52.9, delicious: false, color: 'yellow' },
        { name: 'rambutan', avgWeightOz: 1.1, color: 'pink'},
        { name: 'lingonberry', avgWeightOz: 0.01, color: 'red' },
        { name: 'golden gooseberries', avgWeightOz: 0.02, delicious: false, color: 'yellow' }
      ]);
    });
};
```
6. Run `knex seed:run`. Running seeds is much more straight forward migrations. Every time you run this command your database will reset. 