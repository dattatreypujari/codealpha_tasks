/**
 * ADVANCED CALCULATOR - JAVASCRIPT
 * Features: Basic operations, memory functions, history tracking
 */

// DOM Elements
const display = document.getElementById('display');
const historyDisplay = document.getElementById('history');
const numberButtons = document.querySelectorAll('.btn-number');
const operatorButtons = document.querySelectorAll('.btn-operator');
const equalsBtn = document.getElementById('equals');
const clearBtn = document.getElementById('clear');
const deleteBtn = document.getElementById('delete');
const percentBtn = document.getElementById('percent');

// Memory Functions
const memoryAddBtn = document.getElementById('mAdd');
const memorySubtractBtn = document.getElementById('mSubtract');
const memoryRecallBtn = document.getElementById('mRecall');
const memoryClearBtn = document.getElementById('mClear');

/**
 * Calculator State
 */
let currentValue = '0';
let previousValue = '';
let operator = null;
let shouldResetDisplay = false;
let memory = 0;
let history = '';

/**
 * INITIALIZE CALCULATOR
 * Set up event listeners
 */
function init() {
    // Number buttons
    numberButtons.forEach(btn => {
        btn.addEventListener('click', () => handleNumber(btn.dataset.number));
    });

    // Operator buttons
    operatorButtons.forEach(btn => {
        btn.addEventListener('click', () => handleOperator(btn.dataset.operator));
    });

    // Action buttons
    equalsBtn.addEventListener('click', handleEquals);
    clearBtn.addEventListener('click', handleClear);
    deleteBtn.addEventListener('click', handleDelete);
    percentBtn.addEventListener('click', handlePercent);

    // Memory buttons
    memoryAddBtn.addEventListener('click', () => handleMemoryAdd());
    memorySubtractBtn.addEventListener('click', () => handleMemorySubtract());
    memoryRecallBtn.addEventListener('click', () => handleMemoryRecall());
    memoryClearBtn.addEventListener('click', () => handleMemoryClear());

    // Keyboard support
    document.addEventListener('keydown', handleKeyboard);

    updateDisplay();
}

/**
 * HANDLE NUMBER INPUT
 * Add numbers to current value
 */
function handleNumber(num) {
    if (shouldResetDisplay) {
        currentValue = num;
        shouldResetDisplay = false;
    } else {
        // Prevent multiple decimal points
        if (num === '.' && currentValue.includes('.')) return;
        // Prevent leading zeros
        if (currentValue === '0' && num !== '.') currentValue = num;
        else currentValue += num;
    }
    updateDisplay();
}

/**
 * HANDLE OPERATOR
 * Store operator and prepare for next number
 */
function handleOperator(op) {
    if (operator && !shouldResetDisplay) {
        handleEquals();
    }
    previousValue = currentValue;
    operator = op;
    shouldResetDisplay = true;
    updateHistory(`${previousValue} ${getOperatorSymbol(op)}`);
}

/**
 * GET OPERATOR SYMBOL
 * Convert operator code to display symbol
 */
function getOperatorSymbol(op) {
    const symbols = {
        '+': '+',
        '-': '−',
        '*': '×',
        '/': '÷'
    };
    return symbols[op] || op;
}

/**
 * HANDLE EQUALS
 * Calculate result of operation
 */
function handleEquals() {
    if (!operator || shouldResetDisplay) return;

    let result;
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = current !== 0 ? prev / current : 0;
            break;
        default:
            return;
    }

    history = `${previousValue} ${getOperatorSymbol(operator)} ${currentValue} =`;
    currentValue = result.toString();
    operator = null;
    shouldResetDisplay = true;
    updateDisplay();
    updateHistory(history);
}

/**
 * HANDLE CLEAR
 * Clear all calculator data
 */
function handleClear() {
    currentValue = '0';
    previousValue = '';
    operator = null;
    shouldResetDisplay = false;
    history = '';
    updateDisplay();
    updateHistory('');
}

/**
 * HANDLE DELETE
 * Delete last digit
 */
function handleDelete() {
    if (currentValue.length === 1) {
        currentValue = '0';
    } else {
        currentValue = currentValue.slice(0, -1);
    }
    updateDisplay();
}

/**
 * HANDLE PERCENT
 * Convert current value to percentage
 */
function handlePercent() {
    const current = parseFloat(currentValue);
    currentValue = (current / 100).toString();
    updateDisplay();
}

/**
 * UPDATE DISPLAY
 * Refresh the display with current value
 */
function updateDisplay() {
    // Format number with commas
    let displayValue = parseFloat(currentValue);
    if (!isNaN(displayValue)) {
        display.value = displayValue.toLocaleString('en-US', {
            maximumFractionDigits: 10
        });
    } else {
        display.value = currentValue;
    }
}

/**
 * UPDATE HISTORY
 * Show calculation history
 */
function updateHistory(text) {
    historyDisplay.textContent = text;
}

/**
 * MEMORY FUNCTIONS
 */

function handleMemoryAdd() {
    const current = parseFloat(currentValue);
    if (!isNaN(current)) {
        memory += current;
        currentValue = '0';
        shouldResetDisplay = true;
        updateDisplay();
    }
}

function handleMemorySubtract() {
    const current = parseFloat(currentValue);
    if (!isNaN(current)) {
        memory -= current;
        currentValue = '0';
        shouldResetDisplay = true;
        updateDisplay();
    }
}

function handleMemoryRecall() {
    currentValue = memory.toString();
    shouldResetDisplay = true;
    updateDisplay();
}

function handleMemoryClear() {
    memory = 0;
}

/**
 * KEYBOARD SUPPORT
 * Handle keyboard input
 */
function handleKeyboard(e) {
    const key = e.key;

    // Numbers and decimal
    if (/[0-9.]/.test(key)) {
        handleNumber(key);
    }
    // Operators
    else if (key === '+' || key === '-' || key === '*' || key === '/') {
        e.preventDefault();
        handleOperator(key);
    }
    // Equals
    else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        handleEquals();
    }
    // Clear
    else if (key === 'Escape') {
        e.preventDefault();
        handleClear();
    }
    // Delete
    else if (key === 'Backspace') {
        e.preventDefault();
        handleDelete();
    }
}

// Initialize calculator on page load
document.addEventListener('DOMContentLoaded', init);
