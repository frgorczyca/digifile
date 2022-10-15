const pool = require('../dbconfig')

function getCase(request, response) {
    pool.query(`SELECT * FROM cases WHERE cases.id = $1`, [request.params.caseId], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows[0])
    })
}

function createCase(request, response) {    
    pool.query('INSERT INTO cases(case_state, department_id, judge_id, signature) VALUES ($1, $2, $3, $4) RETURNING *;', [request.body.caseStatus, request.body.departmentId, request.body.judgeId,  request.body.signature], (error, results) => {
        if (error) {
          throw error
        }
        response.status(201).send(`User added with ID: ${results.rows[0].id}`)
      })
}

function updateCase(request, response) {
    pool.query(`UPDATE cases SET case_state = $2 WHERE cases.id = $1 RETURNING *;`, [request.params.caseId, request.body.caseStatus], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows[0])
    })
}

function getDocumentsForCase(request, response){
    pool.query(`SELECT * FROM documents WHERE documents.case_id = $1`, [request.params.caseId], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = { createCase, getCase, updateCase, getDocumentsForCase }