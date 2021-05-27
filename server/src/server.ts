import '@/config'
import app from '@/app'

app.listen(process.env.PORT, () => {
  console.log(`    Application running at http://localhost:${process.env.PORT}`)
})
