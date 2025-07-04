const display = document.getElementById('display');
const buttonsContainer = document.querySelector('.calculator-buttons');

const buttons = [
    // Row 1
    { label: 'C', class: 'clear' },
    { label: '(', class: 'advanced' },
    { label: ')', class: 'advanced' },
    { label: '√', class: 'advanced' },
    { label: '/', class: 'operation' },
    // Row 2
    { label: '7' },
    { label: '8' },
    { label: '9' },
    { label: '^', class: 'advanced' },
    { label: '*', class: 'operation' },
    // Row 3
    { label: '4' },
    { label: '5' },
    { label: '6' },
    { label: '-', class: 'operation' },
    { label: 'sin', class: 'advanced' },
    // Row 4
    { label: '1' },
    { label: '2' },
    { label: '3' },
    { label: '+', class: 'operation' },
    { label: 'cos', class: 'advanced' },
    // Row 5
    { label: '0' },
    { label: '.', class: 'advanced' },
    { label: 'ln', class: 'advanced' },
    { label: 'log', class: 'advanced' },
    { label: 'tan', class: 'advanced' },
    // Row 6
    { label: '=', class: 'equal' }
];

// Generate buttons
buttons.forEach(btn => {
    const button = document.createElement('button');
    button.textContent = btn.label;
    button.className = 'button' + (btn.class ? ' ' + btn.class : '');
    if (btn.label === '=') button.style.gridColumn = 'span 5';
    buttonsContainer.appendChild(button);
});

let currentInput = '';

function updateDisplay(value) {
    display.textContent = value;
}

function safeEval(expr) {
    // Replace advanced functions with Math equivalents
    expr = expr.replace(/\^/g, '**')
        .replace(/√([\d.]+)/g, 'Math.sqrt($1)')
        .replace(/sin\(/g, 'Math.sin(')
        .replace(/cos\(/g, 'Math.cos(')
        .replace(/tan\(/g, 'Math.tan(')
        .replace(/log\(/g, 'Math.log10(')
        .replace(/ln\(/g, 'Math.log(');
    try {
        // eslint-disable-next-line no-eval
        let result = eval(expr);
        if (typeof result === 'number' && !isNaN(result) && isFinite(result)) {
            return result;
        } else {
            return 'Error';
        }
    } catch {
        return 'Error';
    }
}

buttonsContainer.addEventListener('click', e => {
    if (!e.target.classList.contains('button')) return;
    const value = e.target.textContent;
    if (value === 'C') {
        currentInput = '';
        updateDisplay('0');
    } else if (value === '=') {
        let expr = currentInput
            .replace(/√/g, '√')
            .replace(/\^/g, '^')
            .replace(/sin/g, 'sin')
            .replace(/cos/g, 'cos')
            .replace(/tan/g, 'tan')
            .replace(/log/g, 'log')
            .replace(/ln/g, 'ln');
        let result = safeEval(expr);
        updateDisplay(result);
        currentInput = result.toString();
    } else {
        if (currentInput === '0' && !isNaN(value)) {
            currentInput = value;
        } else {
            currentInput += value;
        }
        updateDisplay(currentInput);
    }
});

// Keyboard support
window.addEventListener('keydown', e => {
    const key = e.key;
    if ((key >= '0' && key <= '9') || key === '.' || key === '(' || key === ')') {
        currentInput += key;
        updateDisplay(currentInput);
    } else if (key === '+') {
        currentInput += '+';
        updateDisplay(currentInput);
    } else if (key === '-') {
        currentInput += '-';
        updateDisplay(currentInput);
    } else if (key === '*') {
        currentInput += '*';
        updateDisplay(currentInput);
    } else if (key === '/') {
        currentInput += '/';
        updateDisplay(currentInput);
    } else if (key === 'Enter' || key === '=') {
        let result = safeEval(currentInput);
        updateDisplay(result);
        currentInput = result.toString();
    } else if (key === 'Backspace') {
        currentInput = currentInput.slice(0, -1);
        updateDisplay(currentInput || '0');
    } else if (key.toLowerCase() === 'c') {
        currentInput = '';
        updateDisplay('0');
    }
});

// Theme toggle logic
const themeSwitch = document.getElementById('themeSwitch');
function setTheme(light) {
    if (light) {
        document.body.classList.add('theme-light');
        themeSwitch.setAttribute('data-checked', 'true');
    } else {
        document.body.classList.remove('theme-light');
        themeSwitch.setAttribute('data-checked', 'false');
    }
}
themeSwitch.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('theme-light');
    themeSwitch.setAttribute('data-checked', isLight ? 'true' : 'false');
});
themeSwitch.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') themeSwitch.click();
});
// Set default theme
setTheme(false);

// Placeholders for future enhancements
const historyPanel = document.getElementById('history-panel');
const memoryPanel = document.getElementById('memory-panel');
const aiPanel = document.getElementById('ai-panel');
const shiPanel = document.getElementById('shi-panel');
// TODO: Implement history, memory, AI, and SHI features 