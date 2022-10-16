const pdfToPng = require('pdf-to-png-converter')
const readText = require('text-from-image')
const sharp = require('sharp')
const sizeOf = require('image-size')
const pool = require('../dbconfig')
const fs = require('fs')

async function GetMetaData(request, response) {
    pool.query(`SELECT department_name FROM departments`, async (error, results) => {
        if (error) {
            throw error
        }

        console.log(request.files["File"].data)

        const pngPages = await pdfToPng.pdfToPng(request.files["File"].data, // The function accepts PDF file path or a Buffer
            {
                disableFontFace: false, // When `false`, fonts will be rendered using a built-in font renderer that constructs the glyphs with primitive path commands. Default value is true.
                useSystemFonts: false, // When `true`, fonts that aren't embedded in the PDF document will fallback to a system font. Default value is false.
                viewportScale: 2.0, // The desired scale of PNG viewport. Default value is 1.0.
                outputFolder: 'output/', // Folder to write output PNG files. If not specified, PNG output will be available only as a Buffer content, without saving to a file.
                outputFileMask: 'buffer', // Output filename mask. Default value is 'buffer'.
                pagesToProcess: [1],   // Subset of pages to convert (first page = 1), other pages will be skipped if specified.
                strictPagesToProcess: false, // When `true`, will throw an error if specified page number in pagesToProcess is invalid, otherwise will skip invalid page. Default value is false.
                verbosityLevel: 0 // Verbosity level. ERRORS: 0, WARNINGS: 1, INFOS: 5. Default value is 0.
            })

        sizeOf('./output/buffer_page_1.png', (err, dimensions) => {
            sharp('./output/buffer_page_1.png')
                .extract({ left: dimensions.width / 5, top: 0, width: 8 * dimensions.width / 10, height: Math.round(dimensions.height / 3) })
                .toFile('./output/cropped.png', function (err) {
                    if (err) console.log(err);
                })
        })

        readText('./output/cropped.png').then(text => {
            let words = text.split(/\s+/)
            const departmentWord = 'Wydział'

            let best = getEditDistance(words[0], departmentWord)
            let index = 0
            for (let i = 0; i < words.length; i++) {
                distance = getEditDistance(words[i], departmentWord)

                if (distance < best) {
                    best = distance
                    index = i
                }
            }

            let bestDepartment = getEditDistance(results.rows[0].department_name, `${words[index - 1]} ${words[index]} ${words[index + 1]}`)
            let bestName = results.rows[0].department_name

            for (let i = 0; i < results.rows.length; i++) {
                distance = getEditDistance(results.rows[i].department_name, `${words[index - 1]} ${words[index]} ${words[index + 1]}`)
                if (distance < best) {
                    bestDepartment = distance
                    bestName = results.rows[i].department_name
                }
            }
            fs.rmSync('./output', { recursive: true, force: true });
            fs.rmSync('eng.traineddata')
            fs.rmSync('osd.traineddata')

            response.send({ name: bestName})
        }).catch(err => {
            console.log(err);
            response.status(400).send()
        })
    })
}
// Compute the edit distance between the two given strings
function getEditDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    var matrix = [];

    // increment along the first column of each row
    var i;
    for (i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    // increment each column in the first row
    var j;
    for (j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    // Fill in the rest of the matrix
    for (i = 1; i <= b.length; i++) {
        for (j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) == a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // substitution
                    Math.min(matrix[i][j - 1] + 1, // insertion
                        matrix[i - 1][j] + 1)); // deletion
            }
        }
    }

    return matrix[b.length][a.length];
};

module.exports = GetMetaData