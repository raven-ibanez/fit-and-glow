-- ============================================
-- UPDATE ORDER DETAILS FUNCTION
-- Run this in Supabase SQL Editor
-- ============================================

DROP FUNCTION IF EXISTS get_order_details(text);

CREATE OR REPLACE FUNCTION get_order_details(order_id_input TEXT)
RETURNS TABLE (
  id UUID,
  order_status TEXT,
  payment_status TEXT,
  tracking_number TEXT,
  shipping_provider TEXT,
  shipping_note TEXT,
  total_price DECIMAL(10,2),
  shipping_fee DECIMAL(10,2),
  order_items JSONB,
  created_at TIMESTAMPTZ,
  promo_code TEXT,
  discount_applied DECIMAL(10,2)
) 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    o.id,
    o.order_status,
    o.payment_status,
    o.tracking_number,
    o.shipping_provider,
    o.shipping_note,
    o.total_price,
    o.shipping_fee,
    o.order_items,
    o.created_at,
    o.promo_code,
    o.discount_applied
  FROM orders o
  WHERE 
    o.id::text ILIKE order_id_input || '%'
  LIMIT 1;
END;
$$;

GRANT EXECUTE ON FUNCTION get_order_details(TEXT) TO public;
