const express = require('express')
const app = express()
const port = 5000
const path = require('path');
const fs = require('fs');
const htmlToPDF = require('html-pdf-node');
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/index.html'));
});


app.get('/pdfconvert', (req, res) => {
    const data = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
    console.log(data);

    htmlToPDF.generatePdf({
        content: data
    }, {
        format: 'A4'
    }).then(pdfBuffer => {
        const filePath = path.join(__dirname, 'file.pdf');
        fs.writeFileSync(filePath, pdfBuffer);
        return res.download(filePath)
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))