const fs = require('fs');
const path = require('path');

// Simple build script since npx is having issues
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
    
    console.log('✅ CSS built successfully!');
  } catch (error) {
    console.error('❌ Build failed:', error);
  }
}

build();
