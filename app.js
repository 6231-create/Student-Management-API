import express from 'express'
import loggerMiddleware from './middleware/logger.js'
import studentRoutes from './routes/studentRoutes.js'

const app = express()
const PORT = 3000

app.use(express.json())
app.use(loggerMiddleware)

app.use(studentRoutes)

app.listen(PORT, () => {
    console.log(`server has running on port ${PORT}`)
})
