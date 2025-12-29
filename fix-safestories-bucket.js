import * as Minio from 'minio';

const minioClient = new Minio.Client({
  endPoint: '72.60.103.151',
  port: 9100,
  useSSL: true,
  accessKey: 'fluidaiadmin',
  secretKey: 'Fluidbucket@123'
});

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const policy = {
  Version: '2012-10-17',
  Statement: [{
    Effect: 'Allow',
    Principal: { AWS: ['*'] },
    Action: ['s3:GetObject'],
    Resource: ['arn:aws:s3:::safestories-bucket/*']
  }]
};

async function fix() {
  try {
    await minioClient.setBucketPolicy('safestories-bucket', JSON.stringify(policy));
    console.log('✓ Public access enabled for safestories-bucket');
  } catch (error) {
    console.error('✗ Failed:', error.message);
  }
}

fix();
