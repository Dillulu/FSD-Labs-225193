const fs = require('fs');
const docx = require('docx');
const { Document, Packer, Paragraph, TextRun, HeadingLevel } = docx;

// Read code files
const htmlCode = fs.readFileSync('index.html', 'utf8');
const cssCode = fs.readFileSync('styles.css', 'utf8');
const jsCode = fs.readFileSync('script.js', 'utf8');

// Create the document
const doc = new Document({
    sections: [
        {
            properties: {},
            children: [
                new Paragraph({
                    text: 'Interactive Product Configurator - Code Submission',
                    heading: HeadingLevel.HEADING_1,
                }),
                new Paragraph({
                    text: 'Note: Please insert the screenshots of the application output manually below this section, as requested by the assignment PDF.',
                    children: [
                        new TextRun({
                            text: 'Note: Please insert the screenshots of the application output manually below this section, as requested by the assignment PDF.',
                            bold: true,
                            color: 'FF0000'
                        }),
                    ]
                }),
                new Paragraph({
                    text: 'HTML Code (index.html)',
                    heading: HeadingLevel.HEADING_2,
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: htmlCode,
                            font: 'Courier New',
                            size: 18,
                        }),
                    ],
                }),
                new Paragraph({
                    text: 'CSS Code (styles.css)',
                    heading: HeadingLevel.HEADING_2,
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: cssCode,
                            font: 'Courier New',
                            size: 18,
                        }),
                    ],
                }),
                new Paragraph({
                    text: 'JavaScript Code (script.js)',
                    heading: HeadingLevel.HEADING_2,
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: jsCode,
                            font: 'Courier New',
                            size: 18,
                        }),
                    ],
                }),
            ],
        },
    ],
});

// Used to export the file into a .docx file
Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync('submission.docx', buffer);
    console.log('Document created successfully');
});
