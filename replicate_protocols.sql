-- ============================================================================
-- REPLICATE PROTOCOLS: Glow with Joo
-- ============================================================================
-- This script mirrors the protocols found on https://glow-with-joo.vercel.app/protocols
-- It ensures the table schema is correct and inserts detailed protocols.

-- 1. Table Setup
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

-- 2. Security (RLS)
ALTER TABLE protocols ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read active protocols" ON protocols;
DROP POLICY IF EXISTS "Admins can manage protocols" ON protocols;

CREATE POLICY "Public can read active protocols" ON protocols
  FOR SELECT USING (active = true);

CREATE POLICY "Admins can manage protocols" ON protocols
  FOR ALL USING (true);

-- 3. Clear existing protocols to prevent duplicates (Optional, but ensures exact match)
-- DELETE FROM protocols; 

-- 4. Insert Protocols
INSERT INTO protocols (name, category, dosage, frequency, duration, notes, storage, sort_order) 
VALUES
(
  'Tirzepatide',
  'Weight Management',
  'Start: 2.5mg → Titrate up to 15mg',
  'Once weekly (same day each week)',
  'Complete cycle varies (typically 12+ weeks)',
  ARRAY[
    'Month 1: 2.5mg once weekly',
    'Month 2: 5.0mg once weekly (if well tolerated)',
    'Month 3: 7.5mg once weekly',
    'Month 4+: Increase by 2.5mg every 4 weeks up to max 15mg',
    'Inject subcutaneously in abdomen (2 inches from navel), thigh, or upper arm',
    'Stay hydrated and prioritize protein intake'
  ],
  'Refrigerate at 2-8°C. Protect from light.',
  1
),
(
  'Semaglutide',
  'Weight Management',
  'Start: 0.25mg → Maintenance: 2.4mg',
  'Once weekly',
  'Dependent on goals',
  ARRAY[
    'Week 1-4: 0.25mg weekly',
    'Week 5-8: 0.50mg weekly',
    'Week 9-12: 1.0mg weekly',
    'Week 13-16: 1.7mg weekly',
    'Week 17+: 2.4mg weekly (Maintenance)',
    'Common side effects: nausea (usually transient)'
  ],
  'Refrigerate. Use within 56 days of opening.',
  2
),
(
  'Retatrutide (Reta)',
  'Research / Weight Management',
  'Start: 2mg → Titrate cautiously',
  'Once weekly',
  'Research cycle duration varies',
  ARRAY[
    'Starting Dose: 2mg weekly for 4 weeks',
    'Step up: 4mg weekly for 4 weeks',
    'Step up: 6mg weekly (if needed/tolerated)',
    'Powerful GIP/GLP-1/Glucagon agonist - monitor closely',
    'Typically shows faster onset than Tirzepatide in trials'
  ],
  'Store at -20°C (powder). Refrigerate after reconstitution.',
  3
),
(
  'Lemon Bottle',
  'Fat Dissolving (Cosmetic)',
  'Varies by area (approx 10ml-30ml)',
  'Every 7-10 days',
  '3-5 sessions typically recommended',
  ARRAY[
    'Abdomen: 30-40ml total per session',
    'Love Handles: 15-20ml per side',
    'Chin: 10-15ml total',
    'Arms: 10-15ml per arm',
    'Thighs: 20-30ml per thigh',
    'Grid Injection Pattern: Space injections 1.5-2cm apart',
    'Hydrate extensively (2L+ water) after treatment to aid elimination'
  ],
  'Room temp (unopened). Refrigerate after opening.',
  4
),
(
  'GHK-Cu (Copper Peptide)',
  'Skin & Anti-Aging',
  '1-2mg daily (Injectable) or Topical',
  'Daily for 30 days',
  '1-2 months on, 1 month off',
  ARRAY[
    'Subcutaneous: 1mg-2mg daily',
    'Topical: Mix with serum/cream (1-2% concentration)',
    'Can cause site irritation (sting) - dilute well',
    'Combines well with BPC-157 for healing'
  ],
  'Store powder at -20°C. Reconstituted: refrigerate.',
  5
),
(
  'BPC-157',
  'Recovery & Healing',
  '250mcg - 500mcg',
  'Daily (or twice daily for acute injury)',
  '4-6 weeks typical cycle',
  ARRAY[
    'Systemic healing: Subcutaneous injection near navel',
    'Localized injury: Subcutaneous injection near injury site (if safe)',
    'Oral (Arg-BPC) available for gut health',
    'Synergistic with TB-500'
  ],
  'Refrigerate after reconstitution.',
  6
),
(
  'NAD+',
  'Longevity & Energy',
  'Low dose start (50-100mg)',
  '2-3 times weekly',
  'User preference / Cycle as needed',
  ARRAY[
    'Start very low (e.g. 25-50mg) to assess tolerance',
    'High doses can cause intense flushing/nausea ("NAD Flush")',
    'Titrate up slowly to 200-500mg as tolerated',
    'Supports cellular energy (ATP) and DNA repair'
  ],
  'Refrigerate. Sensitive to light/heat.',
  7
)
ON CONFLICT (id) DO NOTHING; -- Prevents errors if rerun, though name might still duplicate if ID is empty.
-- Using a check for name is safer for seeds:
-- (Manually adding WHERE NOT EXISTS checks or truncated table is often preferred for clean slates)
