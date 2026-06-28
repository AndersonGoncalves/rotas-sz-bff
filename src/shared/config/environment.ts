import * as dotenv from 'dotenv';

dotenv.config({ path: '.envs/.env' });

export const environment = {
  server: {
    port: process.env.SERVER_PORT || 3001,
  },
  db: {
    url: process.env.DB_URL || 'mongodb://localhost:27017/rotas-sz',
  },
  aws: {
    region: process.env.AWS_REGION || 'us-east-1',
    bucketName: process.env.AWS_BUCKET_NAME || '',
  },
};
