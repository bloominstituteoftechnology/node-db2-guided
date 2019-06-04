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

Discuss DBMS and review material in TK. Clarify the different between a type of database and a DBMS. 

Discuss some advantages and disadvantages of Sqlite. 

## Introduce SQLite Studio

Students should have already installed this tool via the preclass videos.

1. Start the server using `yarn server` or `npm server`. 

2. Using the browser or `Postman`, run a get request to `/api/fruits`

3. We hope we are seeing all entries from the database, but how do we know for sure?

4. Open `./data/produce.db3` database in SqliteStudio and confirm that the entries in the `fruits` table matches the API response.

5. Clarify that this is a Sqlite specific tool and different DBMS's have different apps, visualizer, commandline tools, etc. that allow direct database access. 

## Introduce the Database Schema

Within SqliteStudio, explore the schema of the `fruits` table.

- Discuss datatypes. Mention these can vary based on DBMS.
- Discuss primary keys. These are required and must be unique. Though they are often auto incrementing integers, they don't necessarily need to be that. 
- Discuss constraints: notNull, unique, default,
- Clarify the difference between a database table and a database schema

Using `POST api/fruits`, try inserting data that violates the schema. Note the errors that appear in the console. 

## Creating a database and table using SqliteStudio

1. Delete the `./data/produce.db3` database. Confirm that the API no longer functions. 

2. Use SqliteStudio to create a new database, also called `produce.db3` and stored in the `data/` directory. Emphasize it must be named exactly that. 

3. Create a `fruits` table using SqliteStudio.

Fruits Table Schema

| Column          | Type         | Metadata                              |
| --------------- | ------------ | ------------------------------------- |
| id              | integer      | Primary Key, Configure auto-increment |
| name            | varchar(128) | Unique, Not Null                      |
| avg weight (oz) | decimal      | Not Null                              |
| delicious       | boolean      | Default true                          |

4. Commit the schema using the check mark. Show the students the SQL code for schema creation. 

5. Go to the Data table for the table in SqliteStudio. Add a few sample entries. 

6. Confirm that the API is working again. 

**wait for students to catch up, use a `yes/no` poll to let students tell you when they are done**

## Introduce Migrations

When creating and updating a schema we have a number of concerns to address:

- Each developers' local schema should be the same
- The development schema should match the the production schema
- If the production schema needs to be changed, this should cannot corrupt any existing production data. 

Migrations are a standard process for managing a database schema with respect to these issue.  

**Take a break if it's a good time**

## Knex Setup

1. We need the `knex` and `sqlite3` libraries. Knex uses different database drivers, depending on the target DBMS. For SQLite it uses the `sqlite3` npm module. Note that these are already added into this particular repo. 

2. Open the `data/db-config.js` file. This where we will configure knex. Delete the contents of this file, so we can start from scratch. 

3. In order easily generate a configure `knex`, we can use the command: `knex init`. The students should have already globally installed `knex` in the preclass videos, but if not they may do so now or use `npx knex init`. 

4. Open `knexfile.js`. We have auto generated config objects for three different environments. We may delete all except for the development object.

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

6. Initialize knex in `db-config`

```js
const knex = require('knex');

const config = require('../knexfile.js');

// we must select the development object from our knexfile
const db = knex(config.development);

// export for use in models
module.exports = db;
```

7. Confirm that the API is connecting to the database with a `GET` request. 

**wait for students to catch up, use a `yes/no` poll to let students tell you when they are done**

**Take a break if it's a good time**

## Create a Migration File

1. Delete `data/fruits.db3`. We're going to create a schema for our DB using `knex`. 

2. Add the `migrations` field to `knexfile.js`. This tells `knex` where to store our migration files. By default they'll appear in a directory called `migrations/` in the root folder. 

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

3. Create a new migration by running `knex migrate:make fruits-schema`. Show that a new file has appeared in `data/migrations/`. `knex` has automatically added a timestamp. This is important for keeping track of the order of migrations.  

## Create a Schema with Migrations

Using the `Schema Builder` in `knex` we can now defined our schema in this file. 

1. Add code into `up` in the `fruits-schema` migration file. This tells knex how to add the table to the db. 

2. Add code into `down`. This code should do the exact opposite of `up`, in case we need to this change. 

3. Notice that we still don't have a database. Just writing the migration file won't enact any change. We have to actually run our schema using `knex migrate:latest`. It will tell us which migrations have run and create a brand new db if one doesn't exist. 

4. Confirm that the API is working again. 

**wait for students to catch up, use a `yes/no` poll to let students tell you when they are done**

## Rollbacks

Notice that we forgot to set a default value for `delicious`. If we notice this mistake **before** the changes have been pushed and merged, it's much easier to fix. 

1. Edit the `fruits-schema` `up` function as follows.

2. Run `knex migrate:latest`

3. Post a new fruit entry, missing the `delicious` field. Notice we still don't have a default. Our migration was not updated. When we ran `knex migrate:latest` no files ran because it doesn't detect changes to existing migrations. 

4. Run `knex migrate:rollback`. This undoes that migration. Make a `GET` request to confirm the table is gone. 

5. Run `knex migrate:latest`. We've now rerun our schema file. 

**wait for students to catch up, use a `yes/no` poll to let students tell you when they are done**

## Update a Schema with Migrations

Once any migrations have been pushed and merged into the master branch, we **should not** edit them. Instead, write a new migration for any changes. For example, what if a few months into the release of our fruit app, we decide we want to track color. 

1. Create a new migration with `knex migrate:make fruits-color-field`

2. Write the `up` and `down` function for this migration. 

3. Run `knex migrate:latest`. 

4. `POST` a new entry to confirm our changes went through. 

## Seed the Database

