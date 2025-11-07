const fs = require("fs");
const path = require("path");
const { minify } = require("terser");

async function minifyDirectory(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(dir, file.name);

    if (file.isDirectory()) {
      await minifyDirectory(fullPath);
    } else if (file.name.endsWith(".js")) {
      try {
        const code = fs.readFileSync(fullPath, "utf8");
        const result = await minify(code, {
          compress: {
            dead_code: true,
            drop_console: false,
            drop_debugger: true,
            keep_classnames: true,
            keep_fnames: false,
            passes: 2,
          },
          mangle: {
            keep_classnames: true,
            keep_fnames: false,
          },
          format: {
            comments: false,
          },
        });

        if (result.code) {
          fs.writeFileSync(fullPath, result.code, "utf8");
          console.log(`✓ Minified: ${fullPath}`);
        }
      } catch (error) {
        console.error(`✗ Error minifying ${fullPath}:`, error.message);
      }
    }
  }
}

async function main() {
  console.log("Starting minification...\n");

  const distDir = path.join(process.cwd(), "dist");

  if (!fs.existsSync(distDir)) {
    console.error("Error: dist directory not found. Run npm run build first.");
    process.exit(1);
  }

  await minifyDirectory(distDir);

  console.log("\n✓ Minification complete!");
}

main().catch((error) => {
  console.error("Minification failed:", error);
  process.exit(1);
});
