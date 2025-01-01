const fs = require('fs');
const path = require('path');

const submissionsDir = path.join(__dirname, 'submissions');
const imagesDir = path.join(__dirname, 'images');
const researchersFile = path.join(__dirname, 'current_researchers.html');

fs.readdir(submissionsDir, (err, files) => {
    if (err) throw err;

    let researchers = '';

    files.forEach(file => {
        const data = JSON.parse(fs.readFileSync(path.join(submissionsDir, file)));
        const imgPath = path.join(imagesDir, data.studentId + path.extname(data.photo));
        fs.writeFileSync(imgPath, Buffer.from(data.photo, 'base64'));

        researchers += `
            <div class="card">
                <h2>${data.name}</h2>
                <p>ID: ${data.studentId}</p>
                <p>Batch: ${data.batch}</p>
                <p>Research Interest: ${data.researchInterest}</p>
                <img src="images/${data.studentId}${path.extname(data.photo)}" alt="${data.name}">
            </div>
        `;
    });

    const template = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Current Researchers</title>
            <style>
                .card {
                    border: 1px solid #ccc;
                    padding: 16px;
                    margin: 16px;
                    border-radius: 8px;
                    display: inline-block;
                    width: calc(33.333% - 32px);
                    box-sizing: border-box;
                    vertical-align: top;
                }
            </style>
        </head>
        <body>
            <h1>Current Researchers</h1>
            <div id="researcherContainer">
                ${researchers}
            </div>
        </body>
        </html>
    `;

    fs.writeFileSync(researchersFile, template);
});
