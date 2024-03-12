import postgres from 'pg'
const { Pool } = postgres

export const pool = new Pool({
    user: 'postgres',
    password: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    database: 'app'
})
