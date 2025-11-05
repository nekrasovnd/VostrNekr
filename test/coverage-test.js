/**
 * @file coverage-test.js  
 * @brief Extended tests for code coverage analysis
 * @author Your Name
 * @date 2024
 */

// Import calculator class
const Calculator = require('../js/calculator.js').Calculator;

/**
 * @class TestCalculator
 * @brief Test suite for code coverage analysis
 */
class TestCalculator {
    constructor() {
        this.passed = 0;
        this.failed = 0;
        this.testCount = 0;
    }

    /**
     * @brief Run a single test
     * @param {string} name - Test name
     * @param {function} testFn - Test function
     */
    test(name, testFn) {
        this.testCount++;
        try {
            testFn();
            console.log(\✅ Test \: \\);
            this.passed++;
        } catch (error) {
            console.log(\❌ Test \: \\);
            console.log(\   Error: \\);
            this.failed++;
        }
    }

    /**
     * @brief Run all coverage tests
     * @returns {boolean} True if all tests passed
     */
    runAllTests() {
        console.log('🧪 Running Code Coverage Analysis Tests\\n');
        console.log('=========================================\\n');
        
        const calc = new Calculator();
        
        // 🔹 GROUP 1: Basic Arithmetic Operations Coverage
        console.log('1. Basic Arithmetic Operations:');
        console.log('--------------------------------');
        
        this.test('Addition operation (5 + 3)', () => {
            calc.clear();
            calc.inputDigit('5');
            calc.handleOperation('+');
            calc.inputDigit('3');
            calc.performCalculation();
            if (calc.getDisplay() !== '8') {
                throw new Error('Expected 8, got ' + calc.getDisplay());
            }
        });
        
        this.test('Subtraction operation (9 - 4)', () => {
            calc.clear();
            calc.inputDigit('9');
            calc.handleOperation('-');
            calc.inputDigit('4');
            calc.performCalculation();
            if (calc.getDisplay() !== '5') {
                throw new Error('Expected 5, got ' + calc.getDisplay());
            }
        });
        
        this.test('Multiplication operation (6 * 7)', () => {
            calc.clear();
            calc.inputDigit('6');
            calc.handleOperation('*');
            calc.inputDigit('7');
            calc.performCalculation();
            if (calc.getDisplay() !== '42') {
                throw new Error('Expected 42, got ' + calc.getDisplay());
            }
        });
        
        this.test('Division operation (8 / 2)', () => {
            calc.clear();
            calc.inputDigit('8');
            calc.handleOperation('/');
            calc.inputDigit('2');
            calc.performCalculation();
            if (calc.getDisplay() !== '4') {
                throw new Error('Expected 4, got ' + calc.getDisplay());
            }
        });
        
        // 🔹 GROUP 2: Edge Cases and Error Handling
        console.log('\\n2. Edge Cases and Error Handling:');
        console.log('-----------------------------------');
        
        this.test('Division by zero error handling', () => {
            calc.clear();
            calc.inputDigit('5');
            calc.handleOperation('/');
            calc.inputDigit('0');
            calc.performCalculation();
            if (calc.getDisplay() !== 'Error') {
                throw new Error('Expected Error, got ' + calc.getDisplay());
            }
        });
        
        this.test('Decimal point input', () => {
            calc.clear();
            calc.inputDigit('1');
            calc.inputDecimal();
            calc.inputDigit('5');
            if (!calc.getDisplay().includes('.')) {
                throw new Error('Expected decimal point in display');
            }
        });
        
        this.test('Multiple zeros handling', () => {
            calc.clear();
            calc.inputDigit('0');
            calc.inputDigit('0');
            calc.inputDigit('0');
            // Should remain '0' not '000'
            if (calc.getDisplay() !== '0') {
                throw new Error('Multiple zeros not handled correctly');
            }
        });
        
        // 🔹 GROUP 3: Display and State Management
        console.log('\\n3. Display and State Management:');
        console.log('---------------------------------');
        
        this.test('Clear function resets state', () => {
            calc.clear();
            if (calc.getDisplay() !== '0') {
                throw new Error('Clear failed - display not zero');
            }
            // Check internal state
            if (calc.operation !== null || calc.previousValue !== '') {
                throw new Error('Clear failed - internal state not reset');
            }
        });
        
        this.test('Delete last character', () => {
            calc.clear();
            calc.inputDigit('1');
            calc.inputDigit('2');
            calc.inputDigit('3');
            calc.deleteLast();
            if (calc.getDisplay() !== '12') {
                throw new Error('Delete failed - expected 12, got ' + calc.getDisplay());
            }
        });
        
        this.test('Delete from single digit', () => {
            calc.clear();
            calc.inputDigit('5');
            calc.deleteLast();
            if (calc.getDisplay() !== '0') {
                throw new Error('Delete from single digit failed');
            }
        });
        
        // 🔹 GROUP 4: Keyboard Input Simulation
        console.log('\\n4. Keyboard Input Simulation:');
        console.log('------------------------------');
        
        this.test('Keyboard digit input', () => {
            calc.clear();
            calc.handleKeyboardInput({ key: '7', preventDefault: () => {} });
            if (calc.getDisplay() !== '7') {
                throw new Error('Keyboard digit input failed');
            }
        });
        
        this.test('Keyboard operation input', () => {
            calc.clear();
            calc.inputDigit('5');
            calc.handleKeyboardInput({ key: '+', preventDefault: () => {} });
            if (calc.operation !== '+') {
                throw new Error('Keyboard operation input failed');
            }
        });
        
        this.test('Keyboard calculation (Enter key)', () => {
            calc.clear();
            calc.inputDigit('2');
            calc.handleOperation('*');
            calc.inputDigit('3');
            calc.handleKeyboardInput({ key: 'Enter', preventDefault: () => {} });
            if (calc.getDisplay() !== '6') {
                throw new Error('Keyboard calculation failed');
            }
        });
        
        // 🔹 GROUP 5: Sequence Operations
        console.log('\\n5. Sequence Operations:');
        console.log('------------------------');
        
        this.test('Multiple operations sequence', () => {
            calc.clear();
            calc.inputDigit('1');
            calc.handleOperation('+');
            calc.inputDigit('2');
            calc.handleOperation('*'); // This should calculate 1+2 first
            calc.inputDigit('3');
            calc.performCalculation();
            if (calc.getDisplay() !== '9') { // (1+2)*3 = 9
                throw new Error('Sequence operations failed');
            }
        });
        
        // 📊 TEST RESULTS SUMMARY
        console.log('\\n=========================================');
        console.log('📊 TEST RESULTS SUMMARY');
        console.log('=========================================');
        console.log(\Total Tests: \\);
        console.log(\✅ Passed: \\);
        console.log(\❌ Failed: \\);
        
        const coveragePercent = ((this.passed / this.testCount) * 100).toFixed(1);
        console.log(\🎯 Test Coverage: \%\\n\);
        
        if (this.failed > 0) {
            console.log('💡 Recommendation: Review failed tests to improve coverage');
            return false;
        }
        
        console.log('🎉 All tests passed! Excellent coverage!');
        return true;
    }
}

// Export for testing
module.exports = { TestCalculator };

// Run tests if this file is executed directly
if (require.main === module) {
    const testSuite = new TestCalculator();
    const success = testSuite.runAllTests();
    process.exit(success ? 0 : 1);
}
