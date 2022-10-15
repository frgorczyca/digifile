const express = require('express')
const getDepartment = require('./controllers/departmentController')

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('witaj')
})

app.get('/departments', getDepartment)

app.listen(port, () => {
    console.log('running')
})
