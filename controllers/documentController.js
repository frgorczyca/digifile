const pool = require('../dbconfig')

function getDocument(request, response) {
    pool.query(`SELECT * FROM documents WHERE documents.id = $1`, [request.params.documentId], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows[0])
    })
}

function createDocument(request, response) {
    pool.query('INSERT INTO documents (case_id, received_on, sender, description, raw_data) VALUES ($1, NOW(), $2, $3, $4) RETURNING *;', [request.body.caseId, request.body.sender, request.body.description, request.body.rawData], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`${results.rows[0]}`)
    })
}


module.exports = { getDocument, createDocument }