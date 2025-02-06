const fs = require('fs');
const path = require('path');

function autoImportElementUICSSPlugin() {
  return {
    name: 'auto-import-element-ui-icons-plugin',
    setup(api) {
      api.onBeforeCreateCompiler(async () => {
        const srcDir = path.resolve(__dirname, 'src');
        const entryFile = path.resolve(srcDir, 'index.js');
        const iconCSSImport = "import 'element-ui/lib/theme-chalk/icon.css';\n";

        let entryContent = fs.readFileSync(entryFile, 'utf-8');
        let iconClassFound = false;

        // Function to recursively scan directories for `el-icon-*` classes
        const scanDir = (dir) => {
          const files = fs.readdirSync(dir);
          for (const file of files) {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);
            if (stat.isDirectory()) {
              scanDir(filePath);
            } else if (/\.(vue|js|ts|jsx|tsx)$/.test(file)) {
              const content = fs.readFileSync(filePath, 'utf-8');

              // Check if any `el-icon-*` class exists in the file
              if (/\bel-icon-[\w-]+\b/.test(content)) {
                iconClassFound = true;
              }
            }
          }
        };

        scanDir(srcDir);

        // If an `el-icon-*` class was found and CSS is not already imported, inject the import
        if (iconClassFound && !entryContent.includes(iconCSSImport)) {
          fs.writeFileSync(entryFile, iconCSSImport + entryContent);
        }
      });
    },
  };
}

module.exports = autoImportElementUICSSPlugin;
