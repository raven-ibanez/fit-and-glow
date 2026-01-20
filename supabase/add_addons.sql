-- Add 'Add-ons' Category Products

-- Pen Cartridge
INSERT INTO products (name, description, price, category, image_url, available, featured, stock_quantity, purity_percentage)
VALUES 
('Pen Cartridge (Steam Sterilized)', 'Sterilized cartridge for peptide pens. Essential for safe and hygienic administration.', 30.00, 'Add-ons', NULL, true, false, 1000, 0);

-- Pen Needles 31g/6mm
WITH new_product AS (
  INSERT INTO products (name, description, price, category, image_url, available, featured, stock_quantity, purity_percentage)
  VALUES 
  ('Pen Needles 31g/6mm', 'High-quality pen needles for comfortable injection. Size: 31G x 6mm.', 70.00, 'Add-ons', NULL, true, false, 1000, 0)
  RETURNING id
)
INSERT INTO product_variations (product_id, name, quantity_mg, price, stock_quantity, discount_active)
SELECT id, '10pcs', 10, 70.00, 100, false FROM new_product
UNION ALL
SELECT id, '100pcs', 100, 450.00, 100, false FROM new_product;

-- Pen Needles 31g/8mm
WITH new_product AS (
  INSERT INTO products (name, description, price, category, image_url, available, featured, stock_quantity, purity_percentage)
  VALUES 
  ('Pen Needles 31g/8mm', 'High-quality pen needles for comfortable injection. Size: 31G x 8mm.', 70.00, 'Add-ons', NULL, true, false, 1000, 0)
  RETURNING id
)
INSERT INTO product_variations (product_id, name, quantity_mg, price, stock_quantity, discount_active)
SELECT id, '10pcs', 10, 70.00, 100, false FROM new_product
UNION ALL
SELECT id, '100pcs', 100, 450.00, 100, false FROM new_product;

-- Pen Needles 32g/4mm
WITH new_product AS (
  INSERT INTO products (name, description, price, category, image_url, available, featured, stock_quantity, purity_percentage)
  VALUES 
  ('Pen Needles 32g/4mm', 'Ultra-fine pen needles for comfortable injection. Size: 32G x 4mm.', 70.00, 'Add-ons', NULL, true, false, 1000, 0)
  RETURNING id
)
INSERT INTO product_variations (product_id, name, quantity_mg, price, stock_quantity, discount_active)
SELECT id, '10pcs', 10, 70.00, 100, false FROM new_product
UNION ALL
SELECT id, '100pcs', 100, 450.00, 100, false FROM new_product;
