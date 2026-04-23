export default async function handler(req, res) {
  const { path } = req.query;
  if (!path) return res.status(400).send('Missing path');

  const url = `https://s3.fluidjobs.ai:9002/safestories/${Array.isArray(path) ? path.join('/') : path}`;

  try {
    const response = await fetch(url);
    if (!response.ok) return res.status(response.status).send('Failed to fetch image');

    const contentType = response.headers.get('content-type');
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=86400');

    const buffer = await response.arrayBuffer();
    res.send(Buffer.from(buffer));
  } catch (err) {
    res.status(500).send('Error fetching image');
  }
}
