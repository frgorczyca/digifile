const express = require('express')
const getDepartment = require('./controllers/departmentController')
const { createCase, getCase, updateCase } = require('./controllers/caseController')
const getCasesForDepartment = require('./controllers/departmentController')
const getCasesForJudge = require('./controllers/judgesController')

const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
    res.send('witaj')
})

app.get('/cases/:caseId', getCase)
app.put('/cases/:caseId', updateCase)
app.post('/cases', createCase)

app.get('/departments/:departureId/cases', getCasesForDepartment)

app.get('/judges/:judgeId/cases', getCasesForJudge)

app.listen(port, () => {
    console.log('running')
})
