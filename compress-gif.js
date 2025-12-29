import { execSync } from 'child_process';
import fs from 'fs';

const inputPath = process.argv[2];
const outputPath = 'compressed-loader.gif';

if (!inputPath) {
  console.log('Usage: node compress-gif.js <path-to-loader.gif>');
  process.exit(1);
}

if (!fs.existsSync(inputPath)) {
  console.log('File not found:', inputPath);
  process.exit(1);
}

try {
  // Using gifsicle for compression
  execSync(`gifsicle -O3 --lossy=80 --colors 256 "${inputPath}" -o "${outputPath}"`);
  
  const originalSize = fs.statSync(inputPath).size / (1024 * 1024);
  const compressedSize = fs.statSync(outputPath).size / (1024 * 1024);
  
  console.log(`✓ Original: ${originalSize.toFixed(2)}MB`);
  console.log(`✓ Compressed: ${compressedSize.toFixed(2)}MB`);
  console.log(`✓ Saved to: ${outputPath}`);
} catch (error) {
  console.log('Installing gifsicle...');
  execSync('brew install gifsicle');
  console.log('Run the script again');
}
