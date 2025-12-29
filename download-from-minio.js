import * as Minio from 'minio';
import fs from 'fs';

const minioClient = new Minio.Client({
  endPoint: '72.60.103.151',
  port: 9100,
  useSSL: true,
  accessKey: 'fluidaiadmin',
  secretKey: 'Fluidbucket@123'
});

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const files = [
  'safestorieslogo.png',
  'Anjali Pillai.png',
  'Ishika Mahajan.png',
  'Aastha Yagnik.jpeg',
  'Indrayani Hinge.png',
  'Ambika Vaidya.jpeg',
  'Muskan Negi.jpg'
];

async function download() {
  for (const file of files) {
    try {
      await minioClient.fGetObject('safestories-bucket', file, `public/${file}`);
      console.log(`✓ ${file}`);
    } catch (error) {
      console.error(`✗ ${file}:`, error.message);
    }
  }
}

download();
