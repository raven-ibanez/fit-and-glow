-- Create a function to easily add products and variations
CREATE OR REPLACE FUNCTION add_product_with_variations(
  p_name TEXT,
  p_category TEXT,
  p_description TEXT,
  p_base_price DECIMAL,
  p_variations JSONB
) RETURNS VOID AS $$
DECLARE
  v_product_id UUID;
  v_variation JSONB;
BEGIN
  -- Insert Product
  INSERT INTO products (name, category, base_price, description, available, stock_quantity, featured)
  VALUES (p_name, p_category, p_base_price, p_description, true, 100, false) -- Default stock 100
  RETURNING id INTO v_product_id;

  -- Insert Variations
  FOR v_variation IN SELECT * FROM jsonb_array_elements(p_variations)
  LOOP
    INSERT INTO product_variations (product_id, name, price, stock_quantity)
    VALUES (
      v_product_id,
      v_variation->>'name',
      (v_variation->>'price')::DECIMAL,
      100 -- Default stock
    );
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Clear existing data (optional, but requested for clean slate)
TRUNCATE products CASCADE;

-- Insert Data
-- Tirzepatide 15MG
SELECT add_product_with_variations(
  'Tirzepatide 15MG',
  'peptides',
  'Tirzepatide 15MG Vial',
  2000.00,
  '[
    {"name": "Complete Set (Vial + Water + Syringes)", "price": 2000.00},
    {"name": "Disposable Pen (3 needles)", "price": 2300.00},
    {"name": "Reusable Pen (Cartridge + 3 needles)", "price": 2800.00}
  ]'::JSONB
);

-- Tirzepatide 30MG
SELECT add_product_with_variations(
  'Tirzepatide 30MG',
  'peptides',
  'Tirzepatide 30MG Vial',
  2900.00,
  '[
    {"name": "Complete Set (Vial + Water + Syringes)", "price": 2900.00},
    {"name": "Disposable Pen (3 needles)", "price": 3200.00},
    {"name": "Reusable Pen (Cartridge + 3 needles)", "price": 3700.00}
  ]'::JSONB
);

-- NAD+ 500MG
SELECT add_product_with_variations(
  'NAD+ 500MG',
  'peptides',
  'NAD+ 500MG Vial',
  2100.00,
  '[
    {"name": "Complete Set (Vial + Water + Syringes)", "price": 2100.00},
    {"name": "Disposable Pen (3 needles)", "price": 2400.00},
    {"name": "Reusable Pen (Cartridge + 3 needles)", "price": 2900.00}
  ]'::JSONB
);

-- GHK CU 50MG
SELECT add_product_with_variations(
  'GHK CU 50MG',
  'peptides',
  'GHK CU 50MG Vial',
  1700.00,
  '[
    {"name": "Complete Set (Vial + Water + Syringes)", "price": 1700.00},
    {"name": "Disposable Pen (3 needles)", "price": 2000.00},
    {"name": "Reusable Pen (Cartridge + 3 needles)", "price": 2500.00}
  ]'::JSONB
);

-- GHK CU 100MG
SELECT add_product_with_variations(
  'GHK CU 100MG',
  'peptides',
  'GHK CU 100MG Vial',
  1900.00,
  '[
    {"name": "Complete Set (Vial + Water + Syringes)", "price": 1900.00},
    {"name": "Disposable Pen (3 needles)", "price": 2200.00},
    {"name": "Reusable Pen (Cartridge + 3 needles)", "price": 2700.00}
  ]'::JSONB
);

-- DSIP 5MG
SELECT add_product_with_variations(
  'DSIP 5MG',
  'peptides',
  'DSIP 5MG Vial',
  2000.00,
  '[
    {"name": "Complete Set (Vial + Water + Syringes)", "price": 2000.00},
    {"name": "Disposable Pen (3 needles)", "price": 2300.00},
    {"name": "Reusable Pen (Cartridge + 3 needles)", "price": 2800.00}
  ]'::JSONB
);

-- DSIP 15MG
SELECT add_product_with_variations(
  'DSIP 15MG',
  'peptides',
  'DSIP 15MG Vial',
  2400.00,
  '[
    {"name": "Complete Set (Vial + Water + Syringes)", "price": 2400.00},
    {"name": "Disposable Pen (3 needles)", "price": 2700.00},
    {"name": "Reusable Pen (Cartridge + 3 needles)", "price": 3200.00}
  ]'::JSONB
);

-- Glutathione 1500MG
SELECT add_product_with_variations(
  'Glutathione 1500MG',
  'peptides',
  'Glutathione 1500MG Vial',
  1900.00,
  '[
    {"name": "Complete Set (Vial + Water + Syringes)", "price": 1900.00},
    {"name": "Disposable Pen (3 needles)", "price": 2200.00},
    {"name": "Reusable Pen (Cartridge + 3 needles)", "price": 2700.00}
  ]'::JSONB
);

-- Lipo C with B12
SELECT add_product_with_variations(
  'Lipo C with B12',
  'peptides',
  'Lipo C with B12 Vial',
  2000.00,
  '[
    {"name": "Complete Set (Vial + Water + Syringes)", "price": 2000.00},
    {"name": "Disposable Pen (3 needles)", "price": 2300.00},
    {"name": "Reusable Pen (Cartridge + 3 needles)", "price": 2800.00}
  ]'::JSONB
);

-- SS31 10MG
SELECT add_product_with_variations(
  'SS31 10MG',
  'peptides',
  'SS31 10MG Vial',
  2000.00,
  '[
    {"name": "Complete Set (Vial + Water + Syringes)", "price": 2000.00},
    {"name": "Disposable Pen (3 needles)", "price": 2300.00},
    {"name": "Reusable Pen (Cartridge + 3 needles)", "price": 2800.00}
  ]'::JSONB
);

-- SS31 50MG
SELECT add_product_with_variations(
  'SS31 50MG',
  'peptides',
  'SS31 50MG Vial',
  3600.00,
  '[
    {"name": "Complete Set (Vial + Water + Syringes)", "price": 3600.00},
    {"name": "Disposable Pen (3 needles)", "price": 3900.00},
    {"name": "Reusable Pen (Cartridge + 3 needles)", "price": 4400.00}
  ]'::JSONB
);

-- MOTS C 10MG
SELECT add_product_with_variations(
  'MOTS C 10MG',
  'peptides',
  'MOTS C 10MG Vial',
  1800.00,
  '[
    {"name": "Complete Set (Vial + Water + Syringes)", "price": 1800.00},
    {"name": "Disposable Pen (3 needles)", "price": 2100.00},
    {"name": "Reusable Pen (Cartridge + 3 needles)", "price": 2600.00}
  ]'::JSONB
);

-- MOTS C 40MG
SELECT add_product_with_variations(
  'MOTS C 40MG',
  'peptides',
  'MOTS C 40MG Vial',
  2700.00,
  '[
    {"name": "Complete Set (Vial + Water + Syringes)", "price": 2700.00},
    {"name": "Disposable Pen (3 needles)", "price": 3000.00},
    {"name": "Reusable Pen (Cartridge + 3 needles)", "price": 3500.00}
  ]'::JSONB
);

-- KLOW (Combination)
SELECT add_product_with_variations(
  'KLOW (CU50+TB10+BC10+KPV10)',
  'peptides',
  'Combination Peptide Vial',
  3000.00,
  '[
    {"name": "Complete Set (Vial + Water + Syringes)", "price": 3000.00},
    {"name": "Disposable Pen (3 needles)", "price": 3300.00},
    {"name": "Reusable Pen (Cartridge + 3 needles)", "price": 3800.00}
  ]'::JSONB
);

-- Lemon Bottle 10MG
SELECT add_product_with_variations(
  'Lemon Bottle 10MG',
  'peptides',
  'Lemon Bottle 10MG',
  1900.00,
  '[
    {"name": "Complete Set", "price": 1900.00}
  ]'::JSONB
);

-- KPV 10MG + GHKCu 50MG
SELECT add_product_with_variations(
  'KPV 10MG + GHKCu 50MG',
  'peptides',
  'Combination Peptide Vial',
  2200.00,
  '[
    {"name": "Complete Set (Vial + Water + Syringes)", "price": 2200.00},
    {"name": "Disposable Pen (3 needles)", "price": 2500.00},
    {"name": "Reusable Pen (Cartridge + 3 needles)", "price": 3000.00}
  ]'::JSONB
);

-- KPV 5MG
SELECT add_product_with_variations(
  'KPV 5MG',
  'peptides',
  'KPV 5MG Vial',
  1600.00,
  '[
    {"name": "Complete Set (Vial + Water + Syringes)", "price": 1600.00},
    {"name": "Disposable Pen (3 needles)", "price": 1900.00},
    {"name": "Reusable Pen (Cartridge + 3 needles)", "price": 2400.00}
  ]'::JSONB
);

-- KPV 10MG
SELECT add_product_with_variations(
  'KPV 10MG',
  'peptides',
  'KPV 10MG Vial',
  1700.00,
  '[
    {"name": "Complete Set (Vial + Water + Syringes)", "price": 1700.00},
    {"name": "Disposable Pen (3 needles)", "price": 2000.00},
    {"name": "Reusable Pen (Cartridge + 3 needles)", "price": 2500.00}
  ]'::JSONB
);

-- Tesamorelin 5MG
SELECT add_product_with_variations(
  'Tesamorelin 5MG',
  'peptides',
  'Tesamorelin 5MG Vial',
  2100.00,
  '[
    {"name": "Complete Set (Vial + Water + Syringes)", "price": 2100.00},
    {"name": "Disposable Pen (3 needles)", "price": 2400.00},
    {"name": "Reusable Pen (Cartridge + 3 needles)", "price": 2900.00}
  ]'::JSONB
);

-- Tesamorelin 10MG
SELECT add_product_with_variations(
  'Tesamorelin 10MG',
  'peptides',
  'Tesamorelin 10MG Vial',
  2600.00,
  '[
    {"name": "Complete Set (Vial + Water + Syringes)", "price": 2600.00},
    {"name": "Disposable Pen (3 needles)", "price": 2900.00},
    {"name": "Reusable Pen (Cartridge + 3 needles)", "price": 3400.00}
  ]'::JSONB
);

-- Epitalon 10MG
SELECT add_product_with_variations(
  'Epitalon 10MG',
  'peptides',
  'Epitalon 10MG Vial',
  1800.00,
  '[
    {"name": "Complete Set (Vial + Water + Syringes)", "price": 1800.00},
    {"name": "Disposable Pen (3 needles)", "price": 2100.00},
    {"name": "Reusable Pen (Cartridge + 3 needles)", "price": 2600.00}
  ]'::JSONB
);

-- Epitalon 50MG
SELECT add_product_with_variations(
  'Epitalon 50MG',
  'peptides',
  'Epitalon 50MG Vial',
  2200.00,
  '[
    {"name": "Complete Set (Vial + Water + Syringes)", "price": 2200.00},
    {"name": "Disposable Pen (3 needles)", "price": 2500.00},
    {"name": "Reusable Pen (Cartridge + 3 needles)", "price": 3000.00}
  ]'::JSONB
);

-- PT141 10MG
SELECT add_product_with_variations(
  'PT141 10MG',
  'peptides',
  'PT141 10MG Vial',
  1900.00,
  '[
    {"name": "Complete Set (Vial + Water + Syringes)", "price": 1900.00},
    {"name": "Disposable Pen (3 needles)", "price": 2200.00},
    {"name": "Reusable Pen (Cartridge + 3 needles)", "price": 2700.00}
  ]'::JSONB
);
