const express = require('express')
const { createCase, getCase, updateCase, getDocumentsForCase } = require('./controllers/caseController')
const { getDocument, createDocument } = require('./controllers/documentController')
const getCasesForDepartment = require('./controllers/departmentController')
const getCasesForJudge = require('./controllers/judgesController')
const GetMetaData = require('./controllers/readmetaController')
const fileUpload = require('express-fileupload');

const app = express()
const port = 3001


app.use(express.json());
app.use(fileUpload());

app.get('/hello', (req, res) => {
    res.send('witaj')
})

app.post('/readmeta', GetMetaData)

app.get('/documents/:documentId', getDocument)
app.post('/documents', createDocument)

app.get('/cases/:caseId', getCase)
app.put('/cases/:caseId', updateCase)
app.get('/cases/:caseId/documents', getDocumentsForCase)
app.post('/cases', createCase)

app.get('/departments/:departureId/cases', getCasesForDepartment)

app.get('/judges/:judgeId/cases', getCasesForJudge)

app.listen(port, () => {
    console.log('running')
})
