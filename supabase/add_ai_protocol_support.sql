-- Add product_id column to protocols table for linking protocols to products
-- When a product is deleted, its protocol will also be deleted automatically

ALTER TABLE protocols ADD COLUMN IF NOT EXISTS product_id UUID;

-- Drop existing constraint if it exists and re-add with CASCADE
ALTER TABLE protocols DROP CONSTRAINT IF EXISTS protocols_product_id_fkey;

ALTER TABLE protocols 
ADD CONSTRAINT protocols_product_id_fkey 
FOREIGN KEY (product_id) 
REFERENCES products(id) 
ON DELETE CASCADE;

-- Add index for performance
CREATE INDEX IF NOT EXISTS idx_protocols_product_id ON protocols(product_id);
