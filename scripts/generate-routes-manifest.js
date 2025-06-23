const fs = require('fs');
const path = require('path');

const manifestPath = path.join(__dirname, '..', '.next', 'routes-manifest.json');

if (!fs.existsSync(manifestPath)) {
  const minimalManifest = {
    version: 3,
    pages404: true,
    basePath: "",
    redirects: [],
    rewrites: { beforeFiles: [], afterFiles: [], fallback: [] },
    headers: [],
    dynamicRoutes: [],
    dataRoutes: [],
    staticRoutes: [],
    i18n: undefined
  };
  fs.writeFileSync(manifestPath, JSON.stringify(minimalManifest, null, 2));
  console.log('Created minimal .next/routes-manifest.json');
} else {
  console.log('.next/routes-manifest.json already exists');
} 