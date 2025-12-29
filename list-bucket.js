import * as Minio from 'minio';

const minioClient = new Minio.Client({
  endPoint: '72.60.103.151',
  port: 9100,
  useSSL: true,
  accessKey: 'fluidaiadmin',
  secretKey: 'Fluidbucket@123'
});

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const stream = minioClient.listObjects('safestories-bucket', '', true);

stream.on('data', obj => console.log(obj.name));
stream.on('error', err => console.error(err));
