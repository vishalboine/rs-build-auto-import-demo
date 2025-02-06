const fs = require('fs');
const path = require('path');

/**
 * Rsbuild Plugin to auto-import Element UI icons CSS
 */
function autoImportElementUICSSPlugin() {
  return {
    name: 'auto-import-element-ui-css-plugin',
    setup(api) {
      api.onBeforeCreateCompiler(async () => {
        const srcDir = path.resolve(__dirname, 'src');
        const entryFile = path.resolve(srcDir, 'index.js'); // Adjust if your entry file is different
        const importStatement = "import 'element-ui/lib/theme-chalk/icon.css';\n";

        // Function to recursively scan directories
        const scanDir = (dir) => {
          const files = fs.readdirSync(dir);
          for (const file of files) {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);
            if (stat.isDirectory()) {
              scanDir(filePath);
            } else if (/\.(vue|js|ts|jsx|tsx)$/.test(file)) {
              const content = fs.readFileSync(filePath, 'utf-8');
              if (content.includes('el-icon-arrow-down')) {
                // Inject the CSS import if not already present
                const entryContent = fs.readFileSync(entryFile, 'utf-8');
                if (!entryContent.includes(importStatement)) {
                  fs.writeFileSync(entryFile, importStatement + entryContent);
                }
                return; // Exit once the import is added
              }
            }
          }
        };

        scanDir(srcDir);
      });
    },
  };
}

module.exports = autoImportElementUICSSPlugin;
