-- Create table to store image URLs
CREATE TABLE IF NOT EXISTS images (
  id SERIAL PRIMARY KEY,
  image_key VARCHAR(100) UNIQUE NOT NULL,
  image_url TEXT NOT NULL,
  image_type VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert image URLs (replace with your actual cloud storage URLs)
INSERT INTO images (image_key, image_url, image_type) VALUES
('logo', 'https://storage.googleapis.com/your-bucket/Logo.png', 'logo'),
('door', 'https://storage.googleapis.com/your-bucket/Door.png', 'decoration'),
('anjali_pillai', 'https://storage.googleapis.com/your-bucket/Anjali-Pillai.png', 'therapist'),
('ishika_mahajan', 'https://storage.googleapis.com/your-bucket/Ishika-Mahajan.png', 'therapist'),
('aastha_yagnik', 'https://storage.googleapis.com/your-bucket/Aastha-Yagnik.jpeg', 'therapist'),
('indrayani_hinge', 'https://storage.googleapis.com/your-bucket/Indrayani-Hinge.png', 'therapist'),
('ambika_vaidya', 'https://storage.googleapis.com/your-bucket/Ambika-Vaidya.jpeg', 'therapist'),
('muskan_negi', 'https://storage.googleapis.com/your-bucket/Muskan-Negi.jpg', 'therapist')
ON CONFLICT (image_key) DO UPDATE SET image_url = EXCLUDED.image_url;
