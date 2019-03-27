const server = require('./api/server.js');
const knex = require('knex');

const knexConfig = {
    client: 'sqlite3',
    useNullAsDefault: true,  //only needed for sqlite
    connection: {
        filename: './data/rolex.db3'
    }
}
const db = knex(knexConfig);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));
