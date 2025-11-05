/**
 * @file simple-test.js
 * @brief Basic tests for CI validation
 */

function runCITests() {
    console.log('🚀 Running CI Tests...');
    
    // Test 1: Check if Calculator class exists
    if (typeof Calculator === 'undefined') {
        throw new Error('Calculator class not defined');
    }
    console.log('✅ Calculator class test passed');
    
    // Test 2: Basic functionality test
    const calc = new Calculator();
    if (typeof calc.inputDigit !== 'function') {
        throw new Error('inputDigit method not found');
    }
    console.log('✅ Calculator methods test passed');
    
    // Test 3: Display test
    if (calc.getDisplay() !== '0') {
        throw new Error('Initial display not zero');
    }
    console.log('✅ Initial display test passed');
    
    console.log('🎉 All CI tests passed!');
}

// Export for Node.js environment
if (typeof module !== 'undefined') {
    module.exports = { runCITests };
}
