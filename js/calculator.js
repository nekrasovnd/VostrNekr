/**
 * @file calculator.js
 * @brief Main calculator logic module
 * @author VostrNekr
 * @date 2025
 */

/**
 * @class Calculator
 * @brief Main calculator class handling operations and state
 */
 
class Calculator {
    constructor() {
        /** 
         * @property {string} currentDisplay - Current display value
         */
        this.currentDisplay = '0';
        
        /** 
         * @property {string} previousValue - Previously entered value for operations
         */
        this.previousValue = '';
        
        /** 
         * @property {string} operation - Current pending operation (+, -, *, /)
         */
        this.operation = null;
        
        /** 
         * @property {boolean} waitingForNewValue - Flag indicating if waiting for new input
         */
        this.waitingForNewValue = false;
    }

    /**
     * @brief Adds digit to current display with validation
     * @param {string} digit - Digit to add (0-9)
     */
    inputDigit(digit) {
        // Prevent multiple zeros at start
        if (this.currentDisplay === '0' && digit === '0') {
            return;
        }
        
        // Limit display length to prevent overflow
        if (this.currentDisplay.replace('.', '').length >= 15) {
            return;
        }
        
        if (this.waitingForNewValue) {
            this.currentDisplay = digit;
            this.waitingForNewValue = false;
        } else {
            this.currentDisplay = this.currentDisplay === '0' ? digit : this.currentDisplay + digit;
        }
        this.updateDisplay();
    }

    /**
     * @brief Handles decimal point input
     */
    inputDecimal() {
        if (this.waitingForNewValue) {
            this.currentDisplay = '0.';
            this.waitingForNewValue = false;
            this.updateDisplay();
            return;
        }
        
        if (this.currentDisplay.indexOf('.') === -1) {
            this.currentDisplay += '.';
            this.updateDisplay();
        }
    }

    /**
     * @brief Handles operation input (+, -, *, /)
     * @param {string} nextOperation - Operation to perform
     */
    handleOperation(nextOperation) {
        const inputValue = parseFloat(this.currentDisplay);
        
        if (this.previousValue === '') {
            this.previousValue = inputValue;
        } else if (this.operation) {
            const result = this.calculate(this.previousValue, parseFloat(this.currentDisplay), this.operation);
            this.currentDisplay = String(result);
            this.previousValue = result;
            this.updateDisplay();
        }
        
        this.waitingForNewValue = true;
        this.operation = nextOperation;
    }

    /**
     * @brief Performs calculation based on operation
     * @param {number} firstValue - First operand
     * @param {number} secondValue - Second operand  
     * @param {string} operation - Mathematical operation
     * @returns {number} Calculation result
     */
    calculate(firstValue, secondValue, operation) {
        switch(operation) {
            case '+':
                return firstValue + secondValue;
            case '-':
                return firstValue - secondValue;
            case '*':
                return firstValue * secondValue;
            case '/':
                if (secondValue === 0) {
                    return 'Error';
                }
                return firstValue / secondValue;
            default:
                return secondValue;
        }
    }

    /**
     * @brief Performs final calculation and updates display
     */
    performCalculation() {
        const inputValue = parseFloat(this.currentDisplay);
        
        if (this.operation && this.previousValue !== '') {
            const result = this.calculate(this.previousValue, inputValue, this.operation);
            this.currentDisplay = String(result);
            this.operation = null;
            this.previousValue = '';
            this.waitingForNewValue = true;
            this.updateDisplay();
        }
    }

    /**
     * @brief Clears the calculator (reset to initial state)
     */
    clear() {
        this.currentDisplay = '0';
        this.previousValue = '';
        this.operation = null;
        this.waitingForNewValue = false;
        this.updateDisplay();
    }

    /**
     * @brief Deletes last character from display
     */
    deleteLast() {
        if (this.currentDisplay.length > 1 && this.currentDisplay !== '0') {
            this.currentDisplay = this.currentDisplay.slice(0, -1);
        } else {
            this.currentDisplay = '0';
        }
        this.updateDisplay();
    }

    /**
     * @brief Updates display with current value
     * @returns {string} Current display value
     */
    getDisplay() {
        return this.currentDisplay;
    }

    /**
     * @brief Updates the HTML display
     */
    updateDisplay() {
        if (typeof document !== 'undefined') {
            const display = document.getElementById('display');
            if (display) {
                display.value = this.getDisplay();
            }
        }
    }
}

/**
 * @brief Main function to initialize calculator
 * @returns {Calculator} Initialized calculator instance
 */
function initializeCalculator() {
    return new Calculator();
}

// Node.js compatibility
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Calculator, initializeCalculator };
}

/**
 * @brief Initialize keyboard event listeners
 */
Calculator.prototype.initializeKeyboard = function() {
    if (typeof document !== 'undefined') {
        document.addEventListener('keydown', (event) => {
            this.handleKeyboardInput(event);
        });
    }
};

/**
 * @brief Handle keyboard input for calculator
 * @param {KeyboardEvent} event - Keyboard event
 */
Calculator.prototype.handleKeyboardInput = function(event) {
    const key = event.key;
    
    // Numbers 0-9
    if (key >= '0' && key <= '9') {
        this.inputDigit(key);
        event.preventDefault();
    }
    // Decimal point
    else if (key === '.' || key === ',') {
        this.inputDecimal();
        event.preventDefault();
    }
    // Operations
    else if (key === '+') {
        this.handleOperation('+');
        event.preventDefault();
    }
    else if (key === '-') {
        this.handleOperation('-');
        event.preventDefault();
    }
    else if (key === '*') {
        this.handleOperation('*');
        event.preventDefault();
    }
    else if (key === '/') {
        event.preventDefault();
        this.handleOperation('/');
    }
    // Enter or = for calculation
    else if (key === 'Enter' || key === '=') {
        this.performCalculation();
        event.preventDefault();
    }
    // Escape or Delete for clear
    else if (key === 'Escape' || key === 'Delete') {
        this.clear();
        event.preventDefault();
    }
    // Backspace for delete last
    else if (key === 'Backspace') {
        this.deleteLast();
        event.preventDefault();
    }
};

// Initialize keyboard support when calculator is created
const originalConstructor = Calculator;
Calculator = function(...args) {
    const instance = new originalConstructor(...args);
    setTimeout(() => instance.initializeKeyboard(), 0);
    return instance;
};
Calculator.prototype = originalConstructor.prototype;
