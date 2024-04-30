import express from 'express'
import userRouter from './src/modules/User/user,routes.js'
import { db_connection } from './DB/connection.js'
import noteRouter from './src/modules/Notes/Notes,routes.js'

const app = express()
const port = 3000

app.use(express.json())
app.use(userRouter)
app.use(noteRouter)
db_connection()












app.listen(port, () => {
    console.log('server is running')
})