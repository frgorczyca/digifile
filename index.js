const express = require('express')
const getCasesForDepartment = require('./controllers/departmentController')
const getCasesForJudge = require('./controllers/judgesController')

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('witaj')
})

app.get('/departments/:departureId/cases', getCasesForDepartment)

app.get('/judges/:judgeId/cases', getCasesForJudge)

app.listen(port, () => {
    console.log('running')
})
