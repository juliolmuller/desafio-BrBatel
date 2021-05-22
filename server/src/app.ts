import cors from 'cors'
import morgan from 'morgan'
import express from 'express'
import routes from './routes'
import errorHandler from './errors/handler'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(routes)
app.use(errorHandler)

export default app
