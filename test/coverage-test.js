/**
 * @file coverage-test.js  
 * @brief Comprehensive test for code coverage
 */

const path = require('path');
const { Calculator } = require('../js/calculator.js');

console.log('🧪 Running comprehensive coverage tests...');

class CoverageTest {
    constructor() {
        this.passed = 0;
        this.failed = 0;
    }

    test(name, testFn) {
        try {
            testFn();
            console.log('✅ ' + name);
            this.passed++;
        } catch (error) {
            console.log('❌ ' + name + ': ' + error.message);
            this.failed++;
        }
    }

    runAll() {
        const calc = new Calculator();
        
        // Test basic operations
        this.test('Constructor and initial state', () => {
            if (calc.getDisplay() !== '0') throw new Error('Initial display not zero');
            if (calc.operation !== null) throw new Error('Initial operation not null');
        });
        
        this.test('Input digits', () => {
            calc.clear();
            calc.inputDigit('5');
            if (calc.getDisplay() !== '5') throw new Error('Digit input failed');
        });
        
        this.test('Multiple digits', () => {
            calc.clear();
            calc.inputDigit('1');
            calc.inputDigit('2');
            calc.inputDigit('3');
            if (calc.getDisplay() !== '123') throw new Error('Multiple digits failed');
        });
        
        this.test('Clear function', () => {
            calc.clear();
            if (calc.getDisplay() !== '0') throw new Error('Clear failed');
        });
        
        this.test('Addition operation', () => {
            calc.clear();
            calc.inputDigit('3');
            calc.handleOperation('+');
            calc.inputDigit('2');
            calc.performCalculation();
            if (calc.getDisplay() !== '5') throw new Error('Addition failed');
        });
        
        this.test('Subtraction operation', () => {
            calc.clear();
            calc.inputDigit('9');
            calc.handleOperation('-');
            calc.inputDigit('4');
            calc.performCalculation();
            if (calc.getDisplay() !== '5') throw new Error('Subtraction failed');
        });
        
        this.test('Multiplication operation', () => {
            calc.clear();
            calc.inputDigit('6');
            calc.handleOperation('*');
            calc.inputDigit('7');
            calc.performCalculation();
            if (calc.getDisplay() !== '42') throw new Error('Multiplication failed');
        });
        
        this.test('Division operation', () => {
            calc.clear();
            calc.inputDigit('8');
            calc.handleOperation('/');
            calc.inputDigit('2');
            calc.performCalculation();
            if (calc.getDisplay() !== '4') throw new Error('Division failed');
        });
        
        this.test('Division by zero', () => {
            calc.clear();
            calc.inputDigit('5');
            calc.handleOperation('/');
            calc.inputDigit('0');
            calc.performCalculation();
            if (calc.getDisplay() !== 'Error') throw new Error('Division by zero failed');
        });
        
        this.test('Decimal input', () => {
            calc.clear();
            calc.inputDigit('1');
            calc.inputDecimal();
            calc.inputDigit('5');
            if (!calc.getDisplay().includes('.')) throw new Error('Decimal failed');
        });
        
        this.test('Delete last character', () => {
            calc.clear();
            calc.inputDigit('1');
            calc.inputDigit('2');
            calc.inputDigit('3');
            calc.deleteLast();
            if (calc.getDisplay() !== '12') throw new Error('Delete failed');
        });
        
        console.log('\n📊 Results: ' + this.passed + ' passed, ' + this.failed + ' failed');
        return this.failed === 0;
    }
}

// Run tests
const testSuite = new CoverageTest();
const success = testSuite.runAll();
process.exit(success ? 0 : 1);
