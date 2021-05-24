/**
 * Load environment variables to "process.env" global.
 */
import 'dotenv/config'


/**
 * Add support to async/await middleware throwing errors.
 */
import 'express-async-errors'


/**
 * Stablish connection to database using TypeORM.
 */
import 'reflect-metadata'
import './database/connection'


/**
 * Overwrite PostgreSQL default numeric types parsers configuration
 */
import pg from 'pg'

const builtinTypes = pg.types.builtins
const parser = (value: string) => (value === null ? null : Number(value))

pg.types.setTypeParser(builtinTypes.NUMERIC, parser)
pg.types.setTypeParser(builtinTypes.INT4, parser)
pg.types.setTypeParser(builtinTypes.INT8, parser)
