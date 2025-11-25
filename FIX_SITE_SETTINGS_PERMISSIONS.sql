-- Fix site_settings table permissions for admin dashboard
-- The admin dashboard uses password protection, not Supabase authentication
-- So we need to allow public access to update site_settings

-- Drop existing restrictive policy
DROP POLICY IF EXISTS "Authenticated users can manage site settings" ON site_settings;

-- Create new policy that allows public access
-- (Admin is protected by password on frontend, not database auth)
CREATE POLICY "Allow public full access to site_settings" 
  ON site_settings
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Verify the policy was created
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'site_settings' 
    AND policyname = 'Allow public full access to site_settings'
  ) THEN
    RAISE NOTICE '✅ Site settings permissions updated successfully!';
  ELSE
    RAISE EXCEPTION '❌ Failed to update site settings permissions';
  END IF;
END $$;

