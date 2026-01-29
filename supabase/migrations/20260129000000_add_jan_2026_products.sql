-- Migration: Add January 2026 Products
-- Category Mapping: research, wellness, cosmetic
-- Based on the provided list (Jan 2026)

DO $$
DECLARE
  pid UUID;
  cat_research TEXT := 'research';
  cat_wellness TEXT := 'wellness';
  cat_cosmetic TEXT := 'cosmetic';
BEGIN
  
  -- ===========================================
  -- RESEARCH PEPTIDES
  -- ===========================================

  -- 1. TIRZEPATIDE (15mg, 30mg, 60mg)
  INSERT INTO products (name, description, category, base_price, purity_percentage, stock_quantity, available, featured)
  VALUES ('Tirzepatide (TIRZ)', 'Dual GIP/GLP-1 receptor agonist for weight management and metabolic research.', cat_research, 3300.00, 99.5, 300, true, true)
  RETURNING id INTO pid;
  
  INSERT INTO product_variations (product_id, name, quantity_mg, price, stock_quantity) VALUES
  (pid, '15mg', 15.0, 3300.00, 100),
  (pid, '30mg', 30.0, 4500.00, 100),
  (pid, '60mg', 60.0, 6000.00, 100);

  -- 2. RETATRUTIDE (RETA) (10mg, 30mg)
  INSERT INTO products (name, description, category, base_price, purity_percentage, stock_quantity, available, featured)
  VALUES ('Retatrutide (RETA)', 'Triple hormone receptor agonist (GLP-1, GIP, and glucagon receptors) for metabolic research.', cat_research, 4500.00, 99.0, 200, true, true)
  RETURNING id INTO pid;
  
  INSERT INTO product_variations (product_id, name, quantity_mg, price, stock_quantity) VALUES
  (pid, '10mg', 10.0, 4500.00, 100),
  (pid, '30mg', 30.0, 6000.00, 100);

  -- 3. EPITHALON (10mg)
  INSERT INTO products (name, description, category, base_price, purity_percentage, stock_quantity, available, featured)
  VALUES ('Epithalon', 'Synthetic peptide for telomere length and longevity research.', cat_research, 2800.00, 99.0, 100, true, false)
  RETURNING id INTO pid;
  
  INSERT INTO product_variations (product_id, name, quantity_mg, price, stock_quantity) VALUES
  (pid, '10mg', 10.0, 2800.00, 100);

  -- 4. KPV (10mg)
  INSERT INTO products (name, description, category, base_price, purity_percentage, stock_quantity, available, featured)
  VALUES ('KPV', 'Potent anti-inflammatory peptide (Lysine-Proline-Valine).', cat_research, 3000.00, 99.0, 100, true, false)
  RETURNING id INTO pid;
  
  INSERT INTO product_variations (product_id, name, quantity_mg, price, stock_quantity) VALUES
  (pid, '10mg', 10.0, 3000.00, 100);

  -- 5. THYMOSIN
  INSERT INTO products (name, description, category, base_price, purity_percentage, stock_quantity, available, featured)
  VALUES ('Thymosin', 'Peptide for immune system support and tissue repair research.', cat_research, 2900.00, 99.0, 100, true, false)
  RETURNING id INTO pid;
  
  INSERT INTO product_variations (product_id, name, quantity_mg, price, stock_quantity) VALUES
  (pid, 'Standard', 1.0, 2900.00, 100);

  -- 6. TESAMORELIN (10mg)
  INSERT INTO products (name, description, category, base_price, purity_percentage, stock_quantity, available, featured)
  VALUES ('Tesamorelin', 'GHRH analog for visceral fat reduction research.', cat_research, 3000.00, 99.0, 100, true, false)
  RETURNING id INTO pid;
  
  INSERT INTO product_variations (product_id, name, quantity_mg, price, stock_quantity) VALUES
  (pid, '10mg', 10.0, 3000.00, 100);

  -- 7. AHK (Copper Peptide)
  INSERT INTO products (name, description, category, base_price, purity_percentage, stock_quantity, available, featured)
  VALUES ('AHK-Cu', 'Copper peptide known for hair growth and skin health research.', cat_research, 2500.00, 99.0, 100, true, false)
  RETURNING id INTO pid;
  
  INSERT INTO product_variations (product_id, name, quantity_mg, price, stock_quantity) VALUES
  (pid, 'Standard', 1.0, 2500.00, 100);

  -- 8. AOD 9604
  INSERT INTO products (name, description, category, base_price, purity_percentage, stock_quantity, available, featured)
  VALUES ('AOD 9604', 'Anti-Obesity Drug peptide fragment for fat loss research.', cat_research, 1900.00, 99.0, 100, true, false)
  RETURNING id INTO pid;
  
  INSERT INTO product_variations (product_id, name, quantity_mg, price, stock_quantity) VALUES
  (pid, '5mg', 5.0, 1900.00, 100);

  -- ===========================================
  -- WELLNESS & SUPPORT
  -- ===========================================

  -- 9. GLUTATHIONE (GLUTA) (500mg, 1500mg)
  INSERT INTO products (name, description, category, base_price, purity_percentage, stock_quantity, available, featured)
  VALUES ('Glutathione (GLUTA)', 'Master antioxidant for cellular protection and detoxification.', cat_wellness, 1500.00, 99.0, 200, true, true)
  RETURNING id INTO pid;
  
  INSERT INTO product_variations (product_id, name, quantity_mg, price, stock_quantity) VALUES
  (pid, '500mg', 500.0, 1500.00, 100),
  (pid, '1500mg', 1500.0, 2500.00, 100);

  -- 10. NAD+
  INSERT INTO products (name, description, category, base_price, purity_percentage, stock_quantity, available, featured)
  VALUES ('NAD+', 'Nicotinamide Adenine Dinucleotide for cellular energy and anti-aging.', cat_wellness, 3000.00, 99.5, 100, true, true)
  RETURNING id INTO pid;
  
  INSERT INTO product_variations (product_id, name, quantity_mg, price, stock_quantity) VALUES
  (pid, '500mg', 500.0, 3000.00, 100);

  -- 11. GLOW
  INSERT INTO products (name, description, category, base_price, purity_percentage, stock_quantity, available, featured)
  VALUES ('GLOW', 'Premium Wellness Blend for skin radiance and vitality.', cat_wellness, 3000.00, 99.0, 100, true, true)
  RETURNING id INTO pid;
  
  INSERT INTO product_variations (product_id, name, quantity_mg, price, stock_quantity) VALUES
  (pid, 'Blend', 1.0, 3000.00, 100);

  -- 12. KLOW
  INSERT INTO products (name, description, category, base_price, purity_percentage, stock_quantity, available, featured)
  VALUES ('KLOW', 'Exclusive Wellness Formula for inner health and outer glow.', cat_wellness, 3500.00, 99.0, 100, true, true)
  RETURNING id INTO pid;
  
  INSERT INTO product_variations (product_id, name, quantity_mg, price, stock_quantity) VALUES
  (pid, 'Blend', 1.0, 3500.00, 100);

  -- 13. AMINO
  INSERT INTO products (name, description, category, base_price, purity_percentage, stock_quantity, available, featured)
  VALUES ('AMINO', 'Essential Amino Acid Complex for muscle recovery and performance.', cat_wellness, 3500.00, 99.0, 100, true, false)
  RETURNING id INTO pid;
  
  INSERT INTO product_variations (product_id, name, quantity_mg, price, stock_quantity) VALUES
  (pid, 'Standard', 1.0, 3500.00, 100);

  -- 14. FAT BLASTER
  INSERT INTO products (name, description, category, base_price, purity_percentage, stock_quantity, available, featured)
  VALUES ('Fat Blaster', 'Potent metabolic booster for weight management support.', cat_wellness, 2100.00, 99.0, 100, true, false)
  RETURNING id INTO pid;
  
  INSERT INTO product_variations (product_id, name, quantity_mg, price, stock_quantity) VALUES
  (pid, 'Vial', 1.0, 2100.00, 100);


  -- ===========================================
  -- COSMETIC & SKINCARE
  -- ===========================================

  -- 15. GHK-CU (50mg, 100mg)
  INSERT INTO products (name, description, category, base_price, purity_percentage, stock_quantity, available, featured)
  VALUES ('GHK-Cu', 'Copper peptide complex for skin regeneration and anti-aging.', cat_cosmetic, 2800.00, 99.0, 200, true, true)
  RETURNING id INTO pid;
  
  INSERT INTO product_variations (product_id, name, quantity_mg, price, stock_quantity) VALUES
  (pid, '50mg', 50.0, 2800.00, 100),
  (pid, '100mg', 100.0, 3500.00, 100);

  -- 16. SNAP-8
  INSERT INTO products (name, description, category, base_price, purity_percentage, stock_quantity, available, featured)
  VALUES ('SNAP-8', 'Octapeptide for reducing expression lines (Botox alternative).', cat_cosmetic, 1500.00, 99.0, 100, true, false)
  RETURNING id INTO pid;
  
  INSERT INTO product_variations (product_id, name, quantity_mg, price, stock_quantity) VALUES
  (pid, '10mg', 10.0, 1500.00, 100);

  -- 17. GHK + SNAP-8 SERUM
  INSERT INTO products (name, description, category, base_price, purity_percentage, stock_quantity, available, featured)
  VALUES ('GHK + SNAP-8 Serum', 'Powerful anti-aging serum combining GHK-Cu and SNAP-8.', cat_cosmetic, 900.00, 99.0, 100, true, true)
  RETURNING id INTO pid;
  
  INSERT INTO product_variations (product_id, name, quantity_mg, price, stock_quantity) VALUES
  (pid, 'Serum bottle', 1.0, 900.00, 100);

  -- 18. GHK TOPICAL
  INSERT INTO products (name, description, category, base_price, purity_percentage, stock_quantity, available, featured)
  VALUES ('GHK Topical', 'Topical solution of GHK-Cu for targeted skin repair.', cat_cosmetic, 2200.00, 99.0, 100, true, false)
  RETURNING id INTO pid;
  
  INSERT INTO product_variations (product_id, name, quantity_mg, price, stock_quantity) VALUES
  (pid, 'Standard', 1.0, 2200.00, 100);

  -- 19. LEMON BOTTLE
  INSERT INTO products (name, description, category, base_price, purity_percentage, stock_quantity, available, featured)
  VALUES ('Lemon Bottle', 'Premium Lipolysis solution for localized fat reduction.', cat_cosmetic, 1500.00, 99.0, 100, true, false)
  RETURNING id INTO pid;
  
  INSERT INTO product_variations (product_id, name, quantity_mg, price, stock_quantity) VALUES
  (pid, '10ml Vial', 10.0, 1500.00, 100);

  -- 20. LIPOLAB
  INSERT INTO products (name, description, category, base_price, purity_percentage, stock_quantity, available, featured)
  VALUES ('Lipolab', 'Effective PPC lipolysis solution for fat cell breakdown.', cat_cosmetic, 800.00, 99.0, 100, true, false)
  RETURNING id INTO pid;
  
  INSERT INTO product_variations (product_id, name, quantity_mg, price, stock_quantity) VALUES
  (pid, '1 Vial', 10.0, 800.00, 100);

  -- 21. AQUALYX (Per Vial, Per Box)
  INSERT INTO products (name, description, category, base_price, purity_percentage, stock_quantity, available, featured)
  VALUES ('Aqualyx', 'Compound solution from the deoxycholate family for localized fat reduction.', cat_cosmetic, 500.00, 99.0, 200, true, false)
  RETURNING id INTO pid;
  
  INSERT INTO product_variations (product_id, name, quantity_mg, price, stock_quantity) VALUES
  (pid, 'Per Vial', 8.0, 500.00, 100),
  (pid, 'Per Box Set', 80.0, 3500.00, 100);

END $$;
