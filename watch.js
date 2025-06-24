const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

// Watch script for development
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

const inputPath = path.join(__dirname, 'src', 'input.css');
const outputPath = path.join(__dirname, 'style.css');

async function build() {
  try {
    const css = fs.readFileSync(inputPath, 'utf8');
    
    const result = await postcss([
      tailwindcss(),
      autoprefixer()
    ]).process(css, { from: inputPath, to: outputPath });
    
    fs.writeFileSync(outputPath, result.css);
    
    if (result.map) {
      fs.writeFileSync(outputPath + '.map', result.map.toString());
    }
    
    console.log(`✅ CSS built successfully at ${new Date().toLocaleTimeString()}`);
  } catch (error) {
    console.error('❌ Build failed:', error);
  }
}

// Initial build
build();

// Watch for changes
if (process.argv.includes('--watch')) {
  console.log('👀 Watching for changes...');
  
  const watcher = chokidar.watch(['src/**/*.css', 'index.html', 'tailwind.config.js'], {
    ignored: /node_modules/,
    persistent: true
  });
  
  watcher.on('change', (path) => {
    console.log(`📝 File changed: ${path}`);
    build();
  });
  
  watcher.on('error', error => console.error('Watcher error:', error));
}
