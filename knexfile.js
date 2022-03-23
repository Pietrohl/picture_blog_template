/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
  development: {
    client: 'better-sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: 'db/sync.db'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: 'db/migrations'
    },
    seeds: {
      directory: 'db/migrations/seeds/dev'
    }
  },

  production: {
    client: 'better-sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: 'db/sync.db'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: 'db/migrations'
    },
    seeds: {
      directory: 'db/migrations/seeds/dev'
    }
  }
}
