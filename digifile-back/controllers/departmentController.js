const pool = require('../dbconfig')

function getCasesForDepartment(request, response) {
    pool.query('SELECT * FROM cases WHERE department_id = ($1)', [request.params.departureId], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = getCasesForDepartment