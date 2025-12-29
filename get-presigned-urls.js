import * as Minio from 'minio';

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

async function getUrls() {
  for (const file of files) {
    try {
      const url = await minioClient.presignedGetObject('safestories-bucket', file, 24*60*60*365);
      console.log(`${file}: ${url}`);
    } catch (error) {
      console.error(`${file}: ERROR`);
    }
  }
}

getUrls();
