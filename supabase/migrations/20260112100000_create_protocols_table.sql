-- Create protocols table for admin-manageable peptide protocols
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
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default protocols
INSERT INTO protocols (name, category, dosage, frequency, duration, notes, storage, sort_order) VALUES
(
  'Tirzepatide',
  'Weight Management',
  'Start: 2.5mg → Maintenance: 5-15mg',
  'Once weekly (same day each week)',
  '12-16 weeks per cycle',
  ARRAY['Start with lowest dose and titrate up every 4 weeks', 'Inject subcutaneously in abdomen, thigh, or upper arm', 'Rotate injection sites to prevent lipodystrophy', 'Take with or without food', 'Stay hydrated and eat protein-rich meals'],
  'Refrigerate at 2-8°C. Once reconstituted, use within 28 days.',
  1
),
(
  'GHK-Cu (Copper Peptide)',
  'Skin & Anti-Aging',
  '1-2mg per day',
  'Daily or 5 days on, 2 days off',
  '8-12 weeks',
  ARRAY['Can be used topically or via subcutaneous injection', 'For topical: mix with carrier serum', 'Subcutaneous: inject in fatty tissue areas', 'Best results when combined with consistent skincare routine', 'Monitor for any skin sensitivity'],
  'Store powder at -20°C. Reconstituted: refrigerate, use within 14 days.',
  2
),
(
  'BPC-157',
  'Recovery & Healing',
  '250-500mcg per day',
  'Daily, split into 1-2 doses',
  '4-8 weeks',
  ARRAY['Inject near injury site for localized healing', 'Can be taken orally for gut-related issues', 'Subcutaneous injection for systemic effects', 'Often stacked with TB-500 for enhanced healing', 'No known significant side effects at recommended doses'],
  'Store powder at -20°C. Reconstituted: refrigerate, use within 21 days.',
  3
),
(
  'Semax',
  'Cognitive Enhancement',
  '200-600mcg per day',
  'Daily, preferably in the morning',
  '2-4 weeks on, 1-2 weeks off',
  ARRAY['Administered intranasally (nasal spray)', 'Best taken on empty stomach', 'Effects may be felt within 30 minutes', 'Cycle to prevent tolerance', 'Can be stacked with Selank for anxiety relief'],
  'Refrigerate. Nasal spray stable for 30 days at room temperature once opened.',
  4
),
(
  'Selank',
  'Anxiety & Mood',
  '250-500mcg per day',
  'Daily or as needed',
  '2-4 weeks on, 1-2 weeks off',
  ARRAY['Administered intranasally', 'Calming effects without sedation', 'Can be combined with Semax', 'No known addiction potential', 'Best for situational anxiety or daily stress management'],
  'Refrigerate. Stable at room temperature for short periods.',
  5
),
(
  'NAD+',
  'Longevity & Energy',
  '100-500mg per session',
  '1-3 times per week',
  'Ongoing or as cycles of 4-8 weeks',
  ARRAY['Subcutaneous or intramuscular injection', 'May cause flushing, nausea at higher doses', 'Start low and increase gradually', 'Best combined with healthy lifestyle habits', 'IV administration available at clinics for higher doses'],
  'Refrigerate. Protect from light. Use within 14 days of reconstitution.',
  6
),
(
  'MOTS-C',
  'Metabolic Health',
  '5-10mg per week',
  '2-3 times per week',
  '8-12 weeks',
  ARRAY['Subcutaneous injection', 'Supports exercise performance and recovery', 'May improve insulin sensitivity', 'Best taken before or after exercise', 'Works synergistically with regular physical activity'],
  'Store at -20°C. Reconstituted: refrigerate, use within 14 days.',
  7
);

-- Enable RLS
ALTER TABLE protocols ENABLE ROW LEVEL SECURITY;

-- Public read policy
CREATE POLICY "Public can read active protocols" ON protocols
  FOR SELECT USING (active = true);

-- Admin full access (you may need to adjust based on your auth setup)
CREATE POLICY "Admins can manage protocols" ON protocols
  FOR ALL USING (true);
