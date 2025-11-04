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
     * @brief Adds digit to current display
     * @param {string} digit - Digit to add (0-9)
     */
    inputDigit(digit) {
        if (this.waitingForNewValue) {
            this.currentDisplay = digit;
            this.waitingForNewValue = false;
        } else {
            this.currentDisplay = this.currentDisplay === '0' ? digit : this.currentDisplay + digit;
        }
    }

    /**
     * @brief Handles decimal point input
     */
    inputDecimal() {
        if (this.waitingForNewValue) {
            this.currentDisplay = '0.';
            this.waitingForNewValue = false;
            return;
        }
        
        if (this.currentDisplay.indexOf('.') === -1) {
            this.currentDisplay += '.';
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
            const currentValue = parseFloat(this.currentDisplay);
            const result = this.calculate(this.previousValue, currentValue, this.operation);
            
            this.currentDisplay = String(result);
            this.previousValue = result;
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
    }

    /**
     * @brief Deletes last character from display
     */
    deleteLast() {
        if (this.currentDisplay.length > 1) {
            this.currentDisplay = this.currentDisplay.slice(0, -1);
        } else {
            this.currentDisplay = '0';
        }
    }

    /**
     * @brief Updates display with current value
     * @returns {string} Current display value
     */
    getDisplay() {
        return this.currentDisplay;
    }
}

/**
 * @brief Main function to initialize calculator
 * @returns {Calculator} Initialized calculator instance
 */
function initializeCalculator() {
    return new Calculator();
}
