# Simple Calculator Project

A web-based calculator built with HTML, CSS, and JavaScript with comprehensive code analysis.

## Features
- Basic arithmetic operations (+, -, *, /)
- Clear (C) and delete (DEL) functions  
- Responsive design with modern UI
- Full keyboard support
- Automated CI/CD pipeline
- Code coverage analysis

## Code Quality
- **Test Coverage**: >85% 
- **Code Analysis**: Control Flow Graph, Data Use Chains
- **CI/CD**: Automated testing and coverage reports

## Project Structure
\\\
VostrNekr/
├── index.html              # Calculator UI
├── js/calculator.js        # Business logic
├── css/style.css          # Styling
├── test/                  # Test suites
├── docs/                  # Documentation
├── .github/workflows/     # CI/CD pipelines
└── package.json           # Dependencies
\\\

## Development
\\\ash
# Run tests
npm test

# Run tests with coverage
npm run coverage

# View coverage report
npm run coverage:report
\\\

## Coverage Reports
After running \
pm run coverage\, open \coverage/index.html\ in browser for detailed report.

## Documentation
- [Functional Requirements](docs/requirements.md)
- [Code Analysis](docs/code-analysis.md)
- [CI/CD Guide](docs/ci-cd-guide.md)
- [Sprint 2 Plan](docs/sprint2-plan.md)
