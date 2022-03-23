import knex, { Knex } from 'knex'
import { knexSnakeCaseMappers } from 'objection'
import Container, { Service } from 'typedi'

/*
 * Sqlite Connection Instance
 */
const knexClient = knex<any, Record<string, any>[]>({
  client: 'better-sqlite3',
  useNullAsDefault: true,
  connection: {
    filename:
      (process.env.NODE_ENV === 'production'
        ? process.env.PROD_DB
        : process.env.DEV_DB) ?? 'db/sync.db'
  },
  ...knexSnakeCaseMappers()
})

knexClient
  .raw('select 1+1 as result')
  .then(() => console.log('SQLITE connection authenticated.'))
  .catch(error => {
    console.error('Failed to connect to the pg database')
    throw error
  })

export class DbClient {
  private dbClientInstance: Knex<any, Record<string, any>[]>
  constructor() {
    this.dbClientInstance = knexClient
  }

  get dbClient() {
    return this.dbClientInstance
  }
}
const dbclient = new DbClient()

Container.set(DbClient, dbclient)
