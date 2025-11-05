# CI/CD Pipeline Documentation

## Overview
This project uses GitHub Actions for Continuous Integration and Continuous Deployment.

## Workflows

### CI/CD Pipeline (.github/workflows/ci-cd.yml)
- **Trigger**: On push to main or feature branches, and on pull requests
- **Jobs**:
  1. **build**: Validates code and generates documentation
  2. **deploy-docs**: Deploys documentation (on main branch only)

## What gets tested:
- ✅ HTML file existence and structure
- ✅ JavaScript syntax validation  
- ✅ Doxygen documentation generation
- ✅ Basic calculator functionality

## Artifacts
- Doxygen documentation is generated as an artifact
- Available for 7 days in GitHub Actions

## Local Testing
To test the CI process locally:

1. Check HTML structure:
\`\`\`bash
grep -q "calculator" index.html
\`\`\`

2. Validate JavaScript:
\`\`\`bash
node -c js/calculator.js
\`\`\`

3. Generate documentation:
\`\`\`bash
doxygen Doxyfile
\`\`\`