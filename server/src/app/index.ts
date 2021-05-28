import path from 'path'
import cors from 'cors'
import morgan from 'morgan'
import express from 'express'
import { companyRouter } from '@/router'
import errorHandler from './errors/handler'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(companyRouter)
app.use('/images', express.static(path.join(__dirname, '..', '..', 'storage')))
app.use(errorHandler)

export default app
