const pool = require('../dbconfig')

function getDocument(request, response) {
    pool.query(`SELECT * FROM documents WHERE documents.id = $1`, [request.params.documents], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows[0])
    })
}

function createDocument(request, response) {    
    pool.query('INSERT INTO documents VALUES ($1, $2, $3, $4) RETURNING *;', [request.body.caseId, Date.now() , request.body.sender,  request.body.description, request.body.rawData], (error, results) => {
        if (error) {
          throw error
        }
        response.status(201).send(`${results.rows[0].id}`)
      })
}

module.exports = { getDocument, createDocument }