import 'dotenv/config'
import 'express-async-errors'
import app from './app'

app.listen(process.env.PORT, () => {
  console.log(`    Application running at http://localhost:${process.env.PORT}`)
})
