import * as Minio from 'minio';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const minioClient = new Minio.Client({
  endPoint: '72.60.103.151',
  port: 9100,
  useSSL: true,
  accessKey: 'fluidaiadmin',
  secretKey: 'Fluidbucket@123'
});

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const therapists = [
  'anjali-pillai.png',
  'ishika-mahajan.png',
  'aastha-yagnik.jpeg',
  'indrayani-hinge.png',
  'ambika-vaidya.jpeg',
  'muskan-negi.jpg'
];

async function upload() {
  for (const file of therapists) {
    try {
      const filePath = path.join(__dirname, 'downloaded-images', file);
      await minioClient.fPutObject('safestories-bucket', file, filePath);
      console.log(`✓ ${file}`);
    } catch (error) {
      console.error(`✗ ${file}:`, error.message);
    }
  }
}

upload();
