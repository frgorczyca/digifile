const pool = require('../dbconfig')

function getDepartment(request, response) {
    pool.query('SELECT * FROM departments', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = getDepartment