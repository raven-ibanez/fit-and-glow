/*
  # Comprehensive Storage Setup (Ultimate Fix)
  1. Ensure Storage Schema Permissions:
    - Grant usage on storage schema
    - Grant table permissions for objects and buckets
  2. Create storage buckets:
    - payment-proofs: For customer payment screenshots
    - product-images: For product catalog images
    - article-covers: For blog/article images
  3. Configure RLS Policies:
    - Public read/upload access for payment-proofs
    - Public read access for others
    - Authenticated management for products and articles
*/

-- 1. Ensure Storage Schema Permissions
GRANT USAGE ON SCHEMA storage TO anon, authenticated;
GRANT ALL ON TABLE storage.objects TO anon, authenticated, service_role;
GRANT ALL ON TABLE storage.buckets TO anon, authenticated, service_role;

-- 2. Create storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('payment-proofs', 'payment-proofs', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/heic', 'image/heif']),
  ('product-images', 'product-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
  ('article-covers', 'article-covers', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO UPDATE SET public = EXCLUDED.public;

-- 3. Policies for 'payment-proofs'
DROP POLICY IF EXISTS "Public can upload payment proofs" ON storage.objects;
CREATE POLICY "Public can upload payment proofs" ON storage.objects FOR INSERT TO public WITH CHECK (bucket_id = 'payment-proofs');

DROP POLICY IF EXISTS "Public read access for payment proofs" ON storage.objects;
CREATE POLICY "Public read access for payment proofs" ON storage.objects FOR SELECT TO public USING (bucket_id = 'payment-proofs');

DROP POLICY IF EXISTS "Authenticated users can delete payment proofs" ON storage.objects;
CREATE POLICY "Authenticated users can delete payment proofs" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'payment-proofs');

DROP POLICY IF EXISTS "Authenticated users can update payment proofs" ON storage.objects;
CREATE POLICY "Authenticated users can update payment proofs" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'payment-proofs');

-- 4. Policies for 'product-images'
DROP POLICY IF EXISTS "Public read access for product images" ON storage.objects;
CREATE POLICY "Public read access for product images" ON storage.objects FOR SELECT TO public USING (bucket_id = 'product-images');

DROP POLICY IF EXISTS "Authenticated can upload product images" ON storage.objects;
CREATE POLICY "Authenticated can upload product images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'product-images');

DROP POLICY IF EXISTS "Authenticated can update product images" ON storage.objects;
CREATE POLICY "Authenticated can update product images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'product-images');

DROP POLICY IF EXISTS "Authenticated can delete product images" ON storage.objects;
CREATE POLICY "Authenticated can delete product images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'product-images');

-- 5. Policies for 'article-covers'
DROP POLICY IF EXISTS "Public read access for article covers" ON storage.objects;
CREATE POLICY "Public read access for article covers" ON storage.objects FOR SELECT TO public USING (bucket_id = 'article-covers');

DROP POLICY IF EXISTS "Authenticated can upload article covers" ON storage.objects;
CREATE POLICY "Authenticated can upload article covers" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'article-covers');

DROP POLICY IF EXISTS "Authenticated can update article covers" ON storage.objects;
CREATE POLICY "Authenticated can update article covers" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'article-covers');

DROP POLICY IF EXISTS "Authenticated can delete article covers" ON storage.objects;
CREATE POLICY "Authenticated can delete article covers" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'article-covers');
