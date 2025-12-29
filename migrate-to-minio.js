import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const GCS_IMAGES = {
  'safestories-logo.png': 'https://storage.googleapis.com/safetories-images/safestories%20logo.png',
  'bluedoor.png': 'https://storage.googleapis.com/safetories-images/bluedoor%201.png',
  'loader.gif': 'https://storage.googleapis.com/safetories-images/Loader%20for%20SafeStories%20Agent.gif',
  'anjali-pillai.png': 'https://storage.googleapis.com/safetories-images/Anjali%20Pillai.png',
  'ishika-mahajan.png': 'https://storage.googleapis.com/safetories-images/Ishika%20Mahajan.png',
  'aastha-yagnik.jpeg': 'https://storage.googleapis.com/safetories-images/Aastha%20Yagnik.jpeg',
  'indrayani-hinge.png': 'https://storage.googleapis.com/safetories-images/Indrayani%20Hinge.png',
  'ambika-vaidya.jpeg': 'https://storage.googleapis.com/safetories-images/Ambika%20Vaidya.jpeg',
  'muskan-negi.jpg': 'https://storage.googleapis.com/safetories-images/Muskan%20Negi.jpg',
};

const downloadDir = path.join(__dirname, 'downloaded-images');

if (!fs.existsSync(downloadDir)) {
  fs.mkdirSync(downloadDir);
}

async function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path.join(downloadDir, filename));
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`✓ Downloaded: ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(path.join(downloadDir, filename), () => {});
      reject(err);
    });
  });
}

async function main() {
  console.log('Downloading images from Google Cloud Storage...\n');
  
  for (const [filename, url] of Object.entries(GCS_IMAGES)) {
    try {
      await downloadImage(url, filename);
    } catch (error) {
      console.error(`✗ Failed to download ${filename}:`, error.message);
    }
  }
  
  console.log('\n✓ Download complete!');
  console.log(`\nImages saved to: ${downloadDir}`);
  console.log('\nNext steps:');
  console.log('1. Upload these images to MinIO bucket at: https://72.60.103.151:9101/browser/fluidai-bucket');
  console.log('2. Create a folder named "safestories" in the bucket');
  console.log('3. Upload all images to that folder');
  console.log('4. Update imageConfig.js with new MinIO URLs');
}

main();
