// Use proxy path in production (Vercel), direct MinIO in local dev
const MINIO_BASE = import.meta.env.DEV
  ? 'https://s3.fluidjobs.ai:9002/safestories'
  : '/minio';

export const IMAGE_URLS = {
  logo: `${MINIO_BASE}/safestories%20logo.png`,
  door: `${MINIO_BASE}/bluedoor_1_gkkqvv.webp`,
  loader: `${MINIO_BASE}/Loader%20for%20SafeStories%20Agent.gif`,
  anjali_pillai: `${MINIO_BASE}/Anjali%20Pillai.png`,
  ishika_mahajan: `${MINIO_BASE}/Ishika%20Mahajan.png`,
  aastha_yagnik: `${MINIO_BASE}/Aastha%20Yagnik.jpeg`,
  indrayani_hinge: `${MINIO_BASE}/Indrayani%20Hinge.png`,
  ambika_vaidya: `${MINIO_BASE}/Ambika%20Vaidya.jpeg`,
  muskan_negi: `${MINIO_BASE}/Muskan%20Negi.jpg`,
  background: `${MINIO_BASE}/3518ee75c9bef26ebb58051ccd7311bff6e24ec0.jpg`,
};
