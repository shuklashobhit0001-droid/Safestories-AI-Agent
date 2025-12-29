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

async function uploadFile(filename) {
  const filePath = path.join(__dirname, 'downloaded-images', filename);
  const objectName = `safestories/${filename}`;
  
  await minioClient.fPutObject('fluidai-bucket', objectName, filePath);
  console.log(`✓ Uploaded: ${filename}`);
}

async function main() {
  const files = fs.readdirSync(path.join(__dirname, 'downloaded-images'));
  
  console.log('Uploading to MinIO...\n');
  
  for (const file of files) {
    try {
      await uploadFile(file);
    } catch (error) {
      console.error(`✗ Failed ${file}:`, error.message);
    }
  }
  
  console.log('\n✓ Upload complete!');
}

main();
