const fs = require('fs');
const { createCanvas } = require('canvas');
const readline = require('readline');
const SVG = require('./lib/svg');
const { Circle, Square, Triangle } = require('./lib/shapes');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function generateLogo() {
    const text = await askQuestion('Enter up to three characters for the text: ');
    const textColor = await askQuestion('Enter the text color (color keyword or hexadecimal number): ');
    const shape = await askQuestion('Select a shape (circle, square, triangle): ');
    const shapeColor = await askQuestion('Enter the shape color (color keyword or hexadecimal number): ');

    const canvas = createCanvas(300, 200);
    const ctx = canvas.getContext('2d');



    const svg = new SVG();
    svg.setText(text, textColor);

    let selectedShape;
    switch (shape) {
        case 'circle':
            selectedShape = new Circle();
            break;
        case 'square':
            selectedShape = new Square();
            break;
        case 'triangle':
            selectedShape = new Triangle();
            break;
        default:
            console.log('Invalid shape selected.');
            return;
    }

    selectedShape.setColor(shapeColor);
    svg.setShape(selectedShape, shapeColor);

    const svgString = svg.render();

    fs.writeFileSync('logo.svg', svgString, 'utf8');
    console.log('Generated logo.svg');
}

function askQuestion(question) {
    return new Promise(resolve => {
        rl.question(question, resolve);
    });
}

generateLogo();
