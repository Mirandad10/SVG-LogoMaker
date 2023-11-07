class SVG {
    constructor() {
        this.text = null;
        this.textColor = null;
        this.shape = null;
        this.shapeColor = null;
    }

    setText(text, color) {
        if (text.length > 3) {
            throw new Error('Text must not exceed 3 characters.');
        }
        this.text = text;
        this.textColor = color;
    }

    setShape(shape, color) {
        this.shape = shape;
        this.shapeColor = color;
    }

    render() {
        let svgString = `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">`;

        if (this.shape) {
            svgString += this.shape.render(this.shapeColor);
        }

        if (this.text) {
            svgString += `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${this.textColor}">${this.text}</text>`;
        }

        svgString += `</svg>`;

        return svgString;
    }
}

module.exports = SVG;

