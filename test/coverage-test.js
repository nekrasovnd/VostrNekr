/**
 * @file coverage-test.js  
 * @brief Basic test for CI debugging
 */

console.log('🔧 DEBUG: Starting test in CI...');
console.log('🔧 DEBUG: Current directory:', process.cwd());

try {
    // Test if we can require the calculator - используем правильный путь
    console.log('🔧 DEBUG: Attempting to require calculator...');
    const { Calculator } = require('../js/calculator.js');
    console.log('✅ DEBUG: Require successful');
    
    // Test basic instantiation
    console.log('🔧 DEBUG: Creating calculator instance...');
    const calc = new Calculator();
    console.log('✅ DEBUG: Calculator created');
    
    // Test basic method
    console.log('🔧 DEBUG: Testing getDisplay...');
    const display = calc.getDisplay();
    console.log('✅ DEBUG: getDisplay result:', display);
    
    console.log('🎉 DEBUG: ALL TESTS PASSED!');
    process.exit(0);
    
} catch (error) {
    console.log('❌ DEBUG: TEST FAILED:');
    console.log('Error name:', error.name);
    console.log('Error message:', error.message);
    console.log('Error stack:', error.stack);
    process.exit(1);
}
