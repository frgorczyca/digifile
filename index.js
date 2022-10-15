const express = require('express')
const { createCase, getCase, updateCase, getDocumentsForCase } = require('./controllers/caseController')
const { getDocument, createDocument } = require('./controllers/documentController')
const getCasesForDepartment = require('./controllers/departmentController')
const getCasesForJudge = require('./controllers/judgesController')

const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
    res.send('witaj')
})

app.get('/documents/:documentId', getDocument)
app.post('/documents', createCase)

app.get('/cases/:caseId', getCase)
app.put('/cases/:caseId', updateCase)
app.get('/cases/:caseId/documents', getDocumentsForCase)
app.post('/cases', createCase)

app.get('/departments/:departureId/cases', getCasesForDepartment)

app.get('/judges/:judgeId/cases', getCasesForJudge)

app.listen(port, () => {
    console.log('running')
})
