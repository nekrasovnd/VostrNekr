/**
 * @file test-calculator.js
 * @brief Simple tests for calculator functionality
 */

function testCalculator() {
    const calculator = new Calculator();
    let testsPassed = 0;
    let totalTests = 0;
    
    function runTest(testName, testFn) {
        totalTests++;
        try {
            testFn();
            console.log(`✅ ${testName}`);
            testsPassed++;
        } catch (error) {
            console.log(`❌ ${testName}: ${error.message}`);
        }
    }
    
    // Test 1: Basic addition
    runTest('Addition test', () => {
        calculator.clear();
        calculator.inputDigit('5');
        calculator.handleOperation('+');
        calculator.inputDigit('3');
        calculator.performCalculation();
        if (calculator.getDisplay() !== '8') {
            throw new Error(`Expected 8, got ${calculator.getDisplay()}`);
        }
    });
    
    // Test 2: Division by zero
    runTest('Division by zero test', () => {
        calculator.clear();
        calculator.inputDigit('5');
        calculator.handleOperation('/');
        calculator.inputDigit('0');
        calculator.performCalculation();
        if (calculator.getDisplay() !== 'Error') {
            throw new Error(`Expected Error, got ${calculator.getDisplay()}`);
        }
    });
    
    // Test 3: Clear function
    runTest('Clear test', () => {
        calculator.clear();
        if (calculator.getDisplay() !== '0') {
            throw new Error(`Expected 0, got ${calculator.getDisplay()}`);
        }
    });
    
    console.log(`\nTests passed: ${testsPassed}/${totalTests}`);
}

// Run tests when loaded
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', testCalculator);
} else {
    testCalculator();
}
