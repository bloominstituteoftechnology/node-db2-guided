module.exports = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: './data/produce2.db3'
        },
        useNullAsDefault: true,
        migrations: {
            directory: './data/migrations'
        },
        seeds: {
            directory: './data/seeds'
        }
    },
    testing: {
        client: 'sqlite3',
        connection: {
            filename: './data/test.db3'
        },
        useNullAsDefault: true
    },
};