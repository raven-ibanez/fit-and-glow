-- Create menu-images storage bucket for product images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'menu-images',
  'menu-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to menu-images bucket
CREATE POLICY "Public read access for menu-images"
ON storage.objects FOR SELECT
USING (bucket_id = 'menu-images');

-- Allow authenticated uploads to menu-images bucket
CREATE POLICY "Allow uploads to menu-images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'menu-images');

-- Allow authenticated updates to menu-images bucket
CREATE POLICY "Allow updates to menu-images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'menu-images');

-- Allow authenticated deletes from menu-images bucket
CREATE POLICY "Allow deletes from menu-images"
ON storage.objects FOR DELETE
USING (bucket_id = 'menu-images');
