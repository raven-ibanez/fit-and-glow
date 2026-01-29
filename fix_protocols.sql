-- ============================================================================
-- FIX: Protocols Table Setup & Policies
-- ============================================================================

-- 1. Create the table if it does not exist
CREATE TABLE IF NOT EXISTS protocols (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  dosage TEXT NOT NULL,
  frequency TEXT NOT NULL,
  duration TEXT NOT NULL,
  notes TEXT[] DEFAULT '{}',
  storage TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  product_id UUID,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Ensure product_id exists (in case table was created previously without it)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='protocols' AND column_name='product_id') THEN
        ALTER TABLE protocols ADD COLUMN product_id UUID;
    END IF;
END $$;

-- 3. AI PROTOCOL SUPPORT (Refine FK)
ALTER TABLE protocols DROP CONSTRAINT IF EXISTS protocols_product_id_fkey;

ALTER TABLE protocols 
ADD CONSTRAINT protocols_product_id_fkey 
FOREIGN KEY (product_id) 
REFERENCES products(id) 
ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS idx_protocols_product_id ON protocols(product_id);

-- 4. Enable Row Level Security
ALTER TABLE protocols ENABLE ROW LEVEL SECURITY;

-- 5. Drop existing policies to prevent "already exists" errors
DROP POLICY IF EXISTS "Public can read active protocols" ON protocols;
DROP POLICY IF EXISTS "Admins can manage protocols" ON protocols;

-- 6. Recreate Policies
CREATE POLICY "Public can read active protocols" ON protocols
  FOR SELECT USING (active = true);

CREATE POLICY "Admins can manage protocols" ON protocols
  FOR ALL USING (true);

-- 7. Insert Seed Data (Only if not already present)
INSERT INTO protocols (name, category, dosage, frequency, duration, notes, storage, sort_order)
SELECT 'Tirzepatide', 'Weight Management', 'Start: 2.5mg → Titrate up to 15mg', 'Once weekly', '12-16 weeks', ARRAY['Start low', 'Increase by 2.5mg every 4 weeks'], 'Refrigerate', 1
WHERE NOT EXISTS (SELECT 1 FROM protocols WHERE name = 'Tirzepatide');
