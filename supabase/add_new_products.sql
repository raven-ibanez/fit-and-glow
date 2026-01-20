-- Add New Products: Snap-8, GHKCu Cosmetic Grade, Semax + Selank
-- Run this in Supabase SQL Editor

-- Get the category ID for Beauty or create appropriate category reference
-- Assuming categories exist, insert products

INSERT INTO products (name, description, base_price, category, image_url, featured, available) VALUES

-- Snap-8 (Botox in a Bottle)
('Snap-8 (Botox in a Bottle)', 
 'Argireline peptide complex - a powerful anti-wrinkle topical treatment. Also known as ''Botox in a Bottle''. Reduces the appearance of fine lines and wrinkles by relaxing facial muscle contractions.',
 1800.00, 
 'Beauty & Anti-Aging', 
 NULL, 
 true, 
 true),

-- GHKCu Cosmetic Grade (1 gram)
('GHKCu Cosmetic Grade (1 gram)', 
 'High-purity copper peptide powder for professional cosmetic formulations. Promotes collagen synthesis, skin elasticity, and tissue repair. Perfect for creating custom serums and creams.',
 1700.00, 
 'Beauty & Anti-Aging', 
 NULL, 
 false, 
 true),

-- Semax 10MG + Selank 10MG Combo
('Semax 10MG + Selank 10MG', 
 'Powerful nootropic combination stack. Semax for cognitive enhancement, focus, and memory. Selank for anxiety relief and stress reduction. Synergistic effects for optimal brain performance.',
 2200.00, 
 'Cognitive Enhancement', 
 NULL, 
 true, 
 true);
