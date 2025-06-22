const { execSync } = require('child_process');

// Run shadcn init with all options
const command = `npx shadcn@latest init --yes --base neutral --css-variables --style default --rsc --tailwind --ts --eslint`;

try {
  execSync(command, { stdio: 'inherit' });
  console.log('shadcn initialization completed successfully!');
} catch (error) {
  console.error('Error during shadcn initialization:', error);
} 