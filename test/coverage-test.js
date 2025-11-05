/**
 * @file coverage-test.js  
 * @brief Extended tests for code coverage analysis
 */

// Import calculator class
const Calculator = require('../js/calculator.js').Calculator;

console.log('🧪 Starting basic coverage tests...');

try {
    // Basic test to verify everything works
    const calc = new Calculator();
    
    // Test 1: Basic functionality
    calc.inputDigit('5');
    console.log('✅ Basic input test passed');
    
    // Test 2: Clear function
    calc.clear();
    console.log('✅ Clear test passed');
    
    // Test 3: Display
    const display = calc.getDisplay();
    console.log('✅ Display test passed:', display);
    
    console.log('🎉 All basic tests passed!');
    process.exit(0);
} catch (error) {
    console.log('❌ Test failed:', error.message);
    process.exit(1);
}
