const pool = require('../dbconfig')

function getCasesForJudge(request, response) {
    pool.query('SELECT * FROM cases WHERE judge_id = ($1)', [request.params.judgeId], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = getCasesForJudge