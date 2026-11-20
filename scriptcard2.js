const canvas = document.getElementById('cardCanvas');
const ctx = canvas.getContext('2d');

let fontDecorations = {
    bold: false,
    italic: false,
    underline: false,
};

function generateCard() {
    const message= document.getElementById('message').value;
    const font = document.getElementById('font').value ;
    const fontSize = document.getElementById('fontSize').value + 'px';
    const fontColor = document.getElementById('fontColor').value;
    const textAlignment = document.getElementById('textAlignment').value;
    const backgroundImageInput = document.getElementById('backgroundImage');
    const background = document.getElementById('background').value;
    const useBackgroundImage = document.backgroundImage.files && backgroundImage.files[0];
    const borderColor = document.getElementById('borderColor').value;
    const borderThickness = parseInt(document.getElementById('borderThickness').value, 10);
    const borderStyle = document.getElementById('borderStyle').value;

    canvas.style.backgroundColor = useBackgroundImage ? 'transparent' : background;
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = borderThickness;
    ctx.setLineDash([]);
    if (borderStyle === 'dashed') {
        ctx.setLineDash([5, 5]);
    }
    else if (borderStyle === 'dotted') {
        ctx.setLineDash([2, 2]);
    }
    ctx.strokeRect(borderThickness / 2, borderThickness / 2, canvas.width - borderThickness, canvas.height - borderThickness);

    if (useBackgroundImage) {
        const image = new Image();
        image.onload = () => {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            drawText(message, font, fontSize, fontColor, textAlignment);
        };
        image.src = URL.createObjectURL(backgroundImageInput.files[0]);
    }
    else {
        drawText(message, font, fontSize, fontColor, textAlignment);
    }

    updateBorderStyle();
}

function drawText(message, font, fontSize, fontColor, textAlignment) {
    ctx.font = `${fontDecorations.bold ? 'bold' : ''}$
    {fontDecorations.italic ? 'italic' : ''}${fontSize}$
    {font}`;
    ctx.fillStyle = fontColor;
    ctx.textBaseline = 'middle';

    const textContainer = document.getElementById ('textContainer');
    if (textContainer) {
        textContainer.innerHTML = '';
    }

    const words = message.split(/\s+/);
    const lineHeight = parseInt(fontSize, 10) * 1.5;
    const totalTextHeight = words.length* lineHeight;
    const starty = (canvas.height - totalTextHeight) / 2;
    const lineWidths = words.map((word) => ctx.measureText(word).width);
    let currentX;
    const maxWidth = canvas.width - 40;

    if (textAlignment === 'left') {
        currentX = 20;
    }
    else if (textAlignment === 'center') {
    const totalWordsWidth = lineWidths.reduce ((acc, width) => acc + width, 0);
    currentX = (canvas.width - totalWordsWidth - (lineWidths.length - 1)* ctx.measureText('').width)/2;
    }
    else if (textAlignment === 'right') {
        const totalWordsWidth = lineWidths.reduce((acc, width)=> acc + width, 0)+ (lineWidths.length -1)* ctx.measureText(' ').width;
        currentX = canvas.width -20 - totalWordsWidth;
    }

    words.forEach((word, index) => {
        const wordWidth = lineWidths[index];

        if(currentX + wordWidth> maxWidth) {
            starty += lineHeight;
            
            if (textAlignment === 'left') {
                currentX= 20
            }
            else if (textAlignment === 'center') {
                const totalWordsWidth = lineWidths.reduce((acc, width) => acc + width, 0);
                currentX = (canvas.width - totalWordsWidth - (lineWidths.length -1)* ctx.measureText(' ').width)/2;
            }
            else if (textAlignment === 'right') {
                const totalWordsWidth = lineWidths.reduce((acc, width)=> acc + width, 0) + (lineWidths.length - 1) * ctx.measureText(' ').width;
                currentX = canvas.width - 20 - totalWordsWidth;
            }
        }

        const textY = starty + lineHeight / 2;
        ctx.fillText(word, currentX, textY);

        if(fontDecorations.underline) {
            ctx.beginPath();
            ctx.strokeStyle = fontColor;
            ctx.lineWidth = 2;
            ctx.moveTo(currentX, textY + 10);
            ctx.lineTo(currentX + wordWidth, textY + 10);
            ctx.stroke();
        }
        currentX += wordWidth + ctx.measureText(' ').width;
    });
}

function toggleTextDecoration(decoration) {
    fontDecorations[decoartion] = !fontDecorations[decoration];
    generateCard();
}

function downloadCard() {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.heigth = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');

    tempCtx.drawImage(canvas, 0, 0);

    const borderColor = document.getElementById ('borderColor').value;
    const borderThickness = parseInt(document.getElementById('borderThickness').value, 10);
    const borderStyle = document.getElementById('borderStyle').value;

    tempCtx.strokeStyle = borderColor;
    tempCtx.lineWidth = borderThickness;
    tempCtx.setLineDash([]);
    if (borderStyle === 'dashed') {
        tempCtx.setLineDash([5, 5]);
    }
    else if (borderStyle === 'dotted') {
        tempCtx.setLineDash([2, 2]);
    }
    tempCtx.strokeRect(borderThickness / 2,
        borderThickness / 2, tempCanvas.width - borderThickness, 
        tempCanvas.height - borderThickness);
    
    const link = document.createElement('a');
    link.download = 'greeting_card2.png';
    link.href = tempCanvas.toDataURL();
    link.click();
}

function updateBorderStyle() {
    const borderColor = document.getElementById('borderColor').value;
    const borderThickness = parseInt(document.getElementById('borderThickness').value, 10);
    const borderStyle = document.getElementById('borderStyle').value;

    canvas.style.borderColor = borderColor;
    canvas.style.borderWidth = `${borderThickness}px`;
    canvas.style.borderStyle = borderThickness > 0? borderStyle : 'none';
    canvas.setAttribute('data-border-style', borderStyle);
}