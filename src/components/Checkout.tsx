import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, Package, CreditCard, Activity, Copy, Check, MessageCircle, Tag, Upload, Database, Lock } from 'lucide-react';
import type { CartItem } from '../types';
import { usePaymentMethods } from '../hooks/usePaymentMethods';
import { useShippingLocations } from '../hooks/useShippingLocations';
import { supabase } from '../lib/supabase';
import { useImageUpload } from '../hooks/useImageUpload';

interface CheckoutProps {
  cartItems: CartItem[];
  totalPrice: number;
  onBack: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cartItems, totalPrice, onBack }) => {
  const { paymentMethods } = usePaymentMethods();
  const { locations: shippingLocations } = useShippingLocations();
  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details');

  // Customer Details
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Shipping Details
  const [address, setAddress] = useState('');
  const [barangay, setBarangay] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [shippingLocation, setShippingLocation] = useState<'LUZON' | 'VISAYAS' | 'MINDANAO' | 'MAXIM' | ''>('');

  // Payment
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [contactMethod, setContactMethod] = useState<'facebook' | 'viber' | ''>('facebook');
  const [notes, setNotes] = useState('');

  const [orderMessage, setOrderMessage] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [contactOpened, setContactOpened] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState<string>('');

  // Payment Proof
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const { uploadImage, uploading: isUploadingProof } = useImageUpload('payment-proofs');

  // Promo Code State
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<any>(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  React.useEffect(() => {
    if (paymentMethods.length > 0 && !selectedPaymentMethod) {
      setSelectedPaymentMethod(paymentMethods[0].id);
    }
  }, [paymentMethods, selectedPaymentMethod]);

  // Check if cart contains Tirzepatide (free shipping)
  const hasTirzepatide = cartItems.some(item => item.product.name === 'Tirzepatide');

  // Calculate shipping fee (Free if Tirzepatide, else flat 150)
  const shippingFee = hasTirzepatide ? 0 : 150;

  // Calculate final total (Subtotal + Shipping - Discount)
  const finalTotal = Math.max(0, totalPrice + shippingFee - discountAmount);

  // Handle Promo Code Application
  const handleApplyPromoCode = async () => {
    setPromoError('');
    setPromoSuccess('');
    setAppliedPromo(null);
    setDiscountAmount(0);

    const code = promoCode.trim().toUpperCase();
    if (!code) {
      setPromoError('Please enter a promo code');
      return;
    }

    setIsApplyingPromo(true);

    try {
      const { data: promo, error } = await supabase
        .from('promo_codes')
        .select('*')
        .eq('code', code)
        .eq('active', true)
        .single();

      if (error || !promo) {
        setPromoError('Invalid or inactive promo code');
        setIsApplyingPromo(false);
        return;
      }

      // Check date validity
      const now = new Date();
      if (promo.start_date && new Date(promo.start_date) > now) {
        setPromoError('Promo code is not yet valid');
        setIsApplyingPromo(false);
        return;
      }
      if (promo.end_date && new Date(promo.end_date) < now) {
        setPromoError('Promo code has expired');
        setIsApplyingPromo(false);
        return;
      }

      // Check usage limits
      if (promo.usage_limit && promo.usage_count >= promo.usage_limit) {
        setPromoError('Promo code usage limit reached');
        setIsApplyingPromo(false);
        return;
      }

      // Check minimum purchase
      if (totalPrice < promo.min_purchase_amount) {
        setPromoError(`Minimum purchase of ₱${promo.min_purchase_amount} required`);
        setIsApplyingPromo(false);
        return;
      }

      // Calculate discount
      let discount = 0;
      if (promo.discount_type === 'percentage') {
        discount = (totalPrice * promo.discount_value) / 100;
        if (promo.max_discount_amount) {
          discount = Math.min(discount, promo.max_discount_amount);
        }
      } else {
        discount = promo.discount_value;
      }

      discount = Math.min(discount, totalPrice);

      setDiscountAmount(discount);
      setAppliedPromo(promo);
      setPromoSuccess(`Promo code applied! You saved ₱${discount.toLocaleString()}`);
    } catch (err) {
      console.error('Error applying promo:', err);
      setPromoError('Failed to apply promo code');
    } finally {
      setIsApplyingPromo(false);
    }
  };

  const isDetailsValid =
    fullName.trim() !== '' &&
    email.trim() !== '' &&
    phone.trim() !== '' &&
    address.trim() !== '' &&
    barangay.trim() !== '' &&
    city.trim() !== '' &&
    state.trim() !== '' &&
    zipCode.trim() !== '' &&
    shippingLocation !== '';

  const handleProceedToPayment = () => {
    if (isDetailsValid) {
      setStep('payment');
    }
  };


  const handlePlaceOrder = async () => {
    if (!contactMethod) {
      alert('Please select your preferred contact method (Facebook or Viber).');
      return;
    }

    if (!shippingLocation) {
      alert('Please select your shipping location.');
      return;
    }

    if (!paymentProof) {
      alert('Please upload a screenshot of your payment proof to proceed.');
      return;
    }

    const paymentMethod = paymentMethods.find(pm => pm.id === selectedPaymentMethod);

    try {
      // 1. Upload Payment Proof First
      let paymentProofUrl = null;
      if (paymentProof) {
        try {
          paymentProofUrl = await uploadImage(paymentProof);
        } catch (uploadError: any) {
          console.error('Failed to upload payment proof:', uploadError);
          alert(`Failed to upload payment proof: ${uploadError.message}`);
          return;
        }
      }

      // Prepare order items for database
      const orderItems = cartItems.map(item => ({
        product_id: item.product.id,
        product_name: item.product.name,
        variation_id: item.variation?.id || null,
        variation_name: item.variation?.name || null,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity,
        purity_percentage: item.product.purity_percentage
      }));

      // Save order to database
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([{
          customer_name: fullName,
          customer_email: email,
          customer_phone: phone,
          shipping_address: address,
          shipping_barangay: barangay,
          shipping_city: city,
          shipping_state: state,
          shipping_zip_code: zipCode,
          order_items: orderItems,
          total_price: Math.max(0, totalPrice - discountAmount), // Store subtotal minus discount (not including shipping)
          shipping_fee: shippingFee,
          shipping_location: shippingLocation,
          payment_method_id: paymentMethod?.id || null,
          payment_method_name: paymentMethod?.name || null,
          payment_proof_url: paymentProofUrl,
          contact_method: contactMethod || null,
          notes: notes.trim() || null,
          order_status: 'new',
          payment_status: 'pending',
          promo_code_id: appliedPromo?.id || null,
          promo_code: appliedPromo?.code || null,
          discount_applied: discountAmount
        }])
        .select()
        .single();

      if (orderError) {
        console.error('❌ Error saving order:', orderError);

        let errorMessage = orderError.message;
        if (orderError.message?.includes('Could not find the table') ||
          orderError.message?.includes('relation "public.orders" does not exist') ||
          orderError.message?.includes('schema cache')) {
          errorMessage = `The orders table doesn't exist in the database. Please run the migration.`;
        }

        alert(`Failed to save order: ${errorMessage}\n\nPlease contact support if this issue persists.`);
        return;
      }

      // Update promo code usage count
      if (appliedPromo) {
        const { error: promoUpdateError } = await supabase
          .from('promo_codes')
          .update({ usage_count: appliedPromo.usage_count + 1 })
          .eq('id', appliedPromo.id);

        if (promoUpdateError) {
          console.error('Failed to update promo usage count:', promoUpdateError);
        }
      }

      console.log('✅ Order saved to database:', orderData);
      setCreatedOrderId(orderData.id);

      // Generate custom order number: RSPEP-XXXX (3-4 random digits)
      const randomDigits = Math.floor(Math.random() * 9000 + 1000); // 1000-9999
      const customOrderNumber = `RSPEP-${randomDigits}`;
      setOrderNumber(customOrderNumber);

      // Get current date and time
      const now = new Date();
      const dateTimeStamp = now.toLocaleString('en-PH', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });

      const orderDetails = `
✨RS PEPTIDES - NEW ORDER

📅 ORDER DATE & TIME
${dateTimeStamp}

👤 CUSTOMER INFORMATION
Name: ${fullName}
Email: ${email}
Phone: ${phone}

📦 SHIPPING ADDRESS
${address}
${barangay}
${city}, ${state} ${zipCode}

🛒 ORDER DETAILS
${cartItems.map(item => {
        let line = `• ${item.product.name}`;
        if (item.variation) {
          line += ` (${item.variation.name})`;
        }
        line += ` x${item.quantity} - ₱${(item.price * item.quantity).toLocaleString('en-PH', { minimumFractionDigits: 0 })}`;
        if (item.product.purity_percentage && item.product.purity_percentage > 0) {
          line += `\n  Purity: ${item.product.purity_percentage}%`;
        }
        return line;
      }).join('\n\n')}

💰 PRICING
Product Total: ₱${totalPrice.toLocaleString('en-PH', { minimumFractionDigits: 0 })}
Shipping Fee: ₱${shippingFee.toLocaleString('en-PH', { minimumFractionDigits: 0 })} (${shippingLocation.replace('_', ' & ')})
${discountAmount > 0 ? `Discount (${appliedPromo?.code}): -₱${discountAmount.toLocaleString('en-PH', { minimumFractionDigits: 0 })}\n` : ''}Grand Total: ₱${finalTotal.toLocaleString('en-PH', { minimumFractionDigits: 0 })}

💳 PAYMENT METHOD
${paymentMethod?.name || 'N/A'}
      ${paymentMethod ? `Account: ${paymentMethod.account_number}` : ''}

📸 PROOF OF PAYMENT
${paymentProofUrl ? 'Screenshot attached to order.' : 'Pending'}

📱 CONTACT METHOD
Instagram: https://ig.me/m/slimmetryph

📋 ORDER NUMBER: ${customOrderNumber}

Please confirm this order. Thank you!
      `.trim();

      setOrderMessage(orderDetails);

      // Auto-copy to clipboard
      try {
        await navigator.clipboard.writeText(orderDetails);
        setCopied(true);
      } catch (err) {
        console.error('Failed to auto-copy:', err);
      }

      // Open contact method based on selection
      const contactUrl = contactMethod === 'facebook'
        ? 'https://m.me/61585973522665'
        : contactMethod === 'viber'
          ? 'viber://chat?number=09665487151'
          : null;

      if (contactUrl) {
        setTimeout(() => {
          try {
            const contactWindow = window.open(contactUrl, '_blank');
            if (!contactWindow || contactWindow.closed || typeof contactWindow.closed === 'undefined') {
              console.warn('⚠️ Popup blocked or contact method failed to open');
              setContactOpened(false);
            } else {
              setContactOpened(true);
            }
          } catch (error) {
            console.error('❌ Error opening contact method:', error);
            setContactOpened(false);
          }
        }, 500);
      }

      // Show confirmation
      setStep('confirmation');
    } catch (error) {
      console.error('❌ Error placing order:', error);
      alert(`Failed to place order: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`);
    }
  };

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(orderMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (error) {
      console.error('Failed to copy:', error);
      // Fallback
      alert('Failed to copy. Please manually select and copy the message.');
    }
  };

  const handleOpenContact = () => {
    const contactUrl = contactMethod === 'facebook'
      ? 'https://m.me/61585973522665'
      : contactMethod === 'viber'
        ? 'viber://chat?number=09665487151'
        : null;

    if (contactUrl) {
      window.open(contactUrl, '_blank');
    }
  };

  if (step === 'confirmation') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-clinical-blue to-white flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded shadow-clinical p-8 md:p-12 text-center border border-gray-100">
            <div className="bg-bio-green-light w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <ShieldCheck className="w-12 h-12 text-bio-green" />
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-science-blue-900 mb-4 tracking-tight">
              Order Confirmed
            </h1>
            <p className="text-gray-600 mb-4 text-base md:text-lg leading-relaxed">
              Copy the order message below and send it via {contactMethod === 'facebook' ? 'Facebook Messenger' : 'Viber'} along with your payment screenshot to finalize your research order.
            </p>

            {/* Order ID Display */}
            {orderNumber && (
              <div className="bg-clinical-blue/20 border border-science-blue-100 rounded-lg p-4 mb-6">
                <p className="text-sm text-science-blue-700 mb-1 font-bold uppercase tracking-wider">Order Reference</p>
                <p className="text-2xl font-bold text-science-blue-900 font-mono">
                  {orderNumber}
                </p>
                <p className="text-xs text-gray-500 mt-2">Use this reference for tracking and support</p>
              </div>
            )}

            {/* Order Message Display */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-science-blue-900 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-tech-teal" />
                  Order Details
                </h3>
                <button
                  onClick={handleCopyMessage}
                  className="flex items-center gap-2 px-4 py-2 bg-science-blue-600 hover:bg-science-blue-700 text-white rounded font-medium transition-all text-sm shadow-sm"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <div className="bg-white rounded p-4 border border-gray-300 max-h-64 overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                  {orderMessage}
                </pre>
              </div>
              {copied && (
                <p className="text-bio-green text-sm mt-2 flex items-center gap-1 font-medium">
                  <Check className="w-4 h-4" />
                  Copied to clipboard! Ready to send.
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-8">
              <button
                onClick={handleOpenContact}
                className="w-full btn-primary py-4 text-base flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                {contactMethod === 'facebook' ? 'Open Facebook Messenger' : 'Open Viber'} & Send
              </button>

              {!contactOpened && (
                <p className="text-sm text-gray-500">
                  If it doesn't open automatically, please manually send the copied message to <span className="font-bold">{contactMethod === 'facebook' ? 'RS Peptides PH on Facebook' : 'Viber: 09665487151'}</span>
                </p>
              )}
            </div>

            <div className="bg-clinical-blue/20 rounded-lg p-6 mb-8 text-left border border-science-blue-100">
              <h3 className="font-bold text-science-blue-900 mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-tech-teal" />
                Next Steps
              </h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="font-bold text-science-blue-500">1.</span>
                  <span>Confirmation within 24 hours of payment receipt.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-science-blue-500">2.</span>
                  <span>Research-grade packaging and secure handling.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-science-blue-500">3.</span>
                  <span>Same-day shipping for verified payments before 11 AM.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-science-blue-500">4.</span>
                  <span>Tracking details sent via {contactMethod === 'facebook' ? 'Messenger' : 'Viber'} after dispatch.</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                window.location.href = '/';
              }}
              className="w-full btn-secondary py-3 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Catalog
            </button>
          </div>
        </div>
      </div >
    );
  }

  // Payment Step
  if (step === 'payment') {
    return (
      <div className="min-h-screen bg-cool-gray py-6 md:py-8">
        <div className="container mx-auto px-4 max-w-5xl">
          <button
            onClick={() => setStep('details')}
            className="text-gray-500 hover:text-science-blue-600 font-medium mb-6 flex items-center gap-2 transition-colors group text-sm"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Details</span>
          </button>

          <h1 className="font-heading text-2xl md:text-3xl font-bold text-science-blue-900 mb-8 flex items-center gap-3">
            Payment & Verification
            <Lock className="w-6 h-6 text-tech-teal" />
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">

              {/* Payment Methods */}
              <div className="bg-white rounded shadow-clinical p-6 border border-gray-100">
                <h2 className="font-heading text-lg font-bold text-science-blue-900 mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-tech-teal" />
                  Select Payment Method
                </h2>
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`block p-4 rounded border cursor-pointer transition-all ${selectedPaymentMethod === method.id
                        ? 'border-science-blue-500 bg-clinical-blue/20 ring-1 ring-science-blue-500'
                        : 'border-gray-200 hover:border-science-blue-300'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={selectedPaymentMethod === method.id}
                          onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                          className="text-science-blue-600 focus:ring-science-blue-500"
                        />
                        <div className="flex-1">
                          <p className="font-bold text-science-blue-900">{method.name}</p>
                          <p className="text-sm text-gray-600 font-mono mt-1">{method.account_number}</p>
                          {method.account_name && (
                            <p className="text-xs text-gray-500 mt-0.5">Account Name: {method.account_name}</p>
                          )}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Payment Proof Upload */}
              <div className="bg-white rounded shadow-clinical p-6 border border-gray-100">
                <h2 className="font-heading text-lg font-bold text-science-blue-900 mb-4 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-tech-teal" />
                  Upload Proof of Payment
                </h2>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-science-blue-400 transition-colors bg-gray-50/50">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setPaymentProof(e.target.files[0]);
                      }
                    }}
                    className="hidden"
                    id="payment-proof-upload"
                  />
                  <label htmlFor="payment-proof-upload" className="cursor-pointer flex flex-col items-center">
                    {paymentProof ? (
                      <>
                        <Check className="w-12 h-12 text-bio-green mb-3" />
                        <p className="font-medium text-science-blue-900">{paymentProof.name}</p>
                        <p className="text-sm text-gray-500 mt-1">Click to change file</p>
                      </>
                    ) : (
                      <>
                        <Upload className="w-12 h-12 text-gray-400 mb-3" />
                        <p className="font-medium text-science-blue-900">Click to upload screenshot</p>
                        <p className="text-xs text-gray-500 mt-1">Gcash/Bank transfer receipt</p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Notes */}
              <div className="bg-white rounded shadow-clinical p-6 border border-gray-100">
                <h2 className="font-heading text-lg font-bold text-science-blue-900 mb-4">
                  Additional Notes (Optional)
                </h2>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-science-blue-500 transition-all text-sm h-24"
                  placeholder="Special instructions for delivery..."
                />
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={!paymentProof || isUploadingProof}
                className="w-full btn-primary py-4 text-base shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isUploadingProof ? 'Uploading Proof...' : 'Complete Order'}
              </button>
            </div>

            {/* Sidebar Summary (Reused logic, simplified UI) */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded shadow-clinical p-6 sticky top-24 border border-gray-100">
                <h3 className="font-heading font-bold text-science-blue-900 mb-4">Order Summary</h3>
                <div className="space-y-2 mb-4">
                  {cartItems.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.quantity}x {item.product.name}</span>
                      <span className="font-medium">₱{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-100 pt-3 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>₱{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>₱{shippingFee.toLocaleString()}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-bio-green font-medium">
                      <span>Discount</span>
                      <span>-₱{discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-science-blue-900 text-lg pt-2">
                    <span>Total</span>
                    <span>₱{finalTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // Details Step
  return (
    <div className="min-h-screen bg-cool-gray py-6 md:py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <button
          onClick={onBack}
          className="text-gray-500 hover:text-science-blue-600 font-medium mb-6 flex items-center gap-2 transition-colors group text-sm"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Cart</span>
        </button>

        <h1 className="font-heading text-2xl md:text-3xl font-bold text-science-blue-900 mb-8 flex items-center gap-3">
          Checkout Information
          <Activity className="w-6 h-6 text-tech-teal" />
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information */}
            <div className="bg-white rounded shadow-clinical p-6 border border-gray-100">
              <h2 className="font-heading text-lg font-bold text-science-blue-900 mb-6 flex items-center gap-2">
                <div className="bg-clinical-blue p-2 rounded text-science-blue-600">
                  <Package className="w-5 h-5" />
                </div>
                Customer Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-science-blue-700 uppercase tracking-wide mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="input-field"
                    placeholder="Juan Dela Cruz"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-science-blue-700 uppercase tracking-wide mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                    placeholder="juan@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-science-blue-700 uppercase tracking-wide mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="input-field"
                    placeholder="09XX XXX XXXX"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded shadow-clinical p-6 border border-gray-100">
              <h2 className="font-heading text-lg font-bold text-science-blue-900 mb-6 flex items-center gap-2">
                <div className="bg-clinical-blue p-2 rounded text-science-blue-600">
                  <Database className="w-5 h-5" />
                </div>
                Shipping Address
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-science-blue-700 uppercase tracking-wide mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="input-field"
                    placeholder="House/Unit, Street Name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-science-blue-700 uppercase tracking-wide mb-2">
                    Barangay *
                  </label>
                  <input
                    type="text"
                    value={barangay}
                    onChange={(e) => setBarangay(e.target.value)}
                    className="input-field"
                    placeholder="Brgy. Name"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-science-blue-700 uppercase tracking-wide mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="input-field"
                      placeholder="City"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-science-blue-700 uppercase tracking-wide mb-2">
                      Province *
                    </label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="input-field"
                      placeholder="Province"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-science-blue-700 uppercase tracking-wide mb-2">
                    ZIP/Postal Code *
                  </label>
                  <input
                    type="text"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="input-field"
                    placeholder="ZIP Code"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Contact Method Selection */}
            <div className="bg-white rounded shadow-clinical p-6 border border-gray-100">
              <h2 className="font-heading text-lg font-bold text-science-blue-900 mb-3 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-tech-teal" />
                Contact Method *
              </h2>
              <p className="text-xs text-gray-500 mb-4">
                Choose how you'd like to send your order details after checkout.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setContactMethod('facebook')}
                  className={`p-4 rounded border transition-all flex items-center gap-3 ${contactMethod === 'facebook'
                    ? 'border-science-blue-600 bg-clinical-blue ring-1 ring-science-blue-600'
                    : 'border-gray-200 hover:border-science-blue-300'
                    }`}
                >
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <div className="text-left">
                    <p className="font-bold text-science-blue-900 text-sm">Facebook Messenger</p>
                    <p className="text-xs text-gray-500">RS Peptides PH</p>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setContactMethod('viber')}
                  className={`p-4 rounded border transition-all flex items-center gap-3 ${contactMethod === 'viber'
                    ? 'border-science-blue-600 bg-clinical-blue ring-1 ring-science-blue-600'
                    : 'border-gray-200 hover:border-science-blue-300'
                    }`}
                >
                  <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.398.002C9.47.028 5.276.474 3.005 2.6 1.268 4.236.463 6.676.388 9.709c-.076 3.032-.172 8.73 5.31 10.279l.003.001h.004l-.002 2.343s-.04.946.586 1.14c.756.234 1.2-.486 1.922-1.264.396-.427.942-1.055 1.356-1.533 3.736.315 6.609-.405 6.934-.506.75-.233 4.996-.789 5.686-6.44.713-5.836-.343-9.53-2.263-11.193l.004-.003C18.397.564 14.968-.04 11.398.002zm.297 1.954c3.194-.038 6.14.38 7.497 1.563 1.552 1.402 2.236 4.578 1.618 9.603-.536 4.394-3.787 4.86-4.403 5.05-.267.083-2.75.702-5.863.476 0 0-2.322 2.803-3.048 3.535-.115.115-.249.16-.337.14-.124-.03-.158-.176-.156-.39l.026-3.828v-.002c-4.615-1.225-4.346-5.903-4.282-8.497.064-2.593.715-4.63 2.152-6.015 1.696-1.56 5.603-1.962 6.796-1.635z" />
                    <path d="M12.2 5.21c-.14 0-.26.115-.26.26s.116.26.26.26c1.88.012 3.404 1.548 3.415 3.428 0 .143.115.26.26.26.14 0 .26-.117.26-.26-.01-2.17-1.766-3.936-3.935-3.948zM8.638 7.098c-.134-.024-.28.016-.396.126l-.658.613c-.168.157-.23.39-.168.608.05.177.11.346.178.508.32.816.86 1.622 1.622 2.393.762.77 1.582 1.32 2.416 1.65.175.068.357.13.546.183.29.081.588-.018.755-.244l.552-.698c.12-.156.14-.37.04-.548l-.002-.002a1.5 1.5 0 00-.042-.068L12.55 9.92c-.178-.23-.43-.27-.642-.11l-.59.434a.42.42 0 01-.482.012 11.24 11.24 0 01-1.024-.77 11.24 11.24 0 01-.862-.95.42.42 0 01-.03-.487l.39-.62c.136-.213.114-.47-.064-.67l-1.21-1.422a.409.409 0 00-.398-.14zM12.2 6.584c-.14 0-.258.115-.258.26 0 .143.117.26.26.26 1.32.01 2.39 1.092 2.4 2.416 0 .143.117.26.26.26.144 0 .26-.117.26-.26-.01-1.614-1.316-2.926-2.922-2.936zm0 1.376c-.14 0-.258.115-.258.26-.002.143.115.26.258.26.605.004 1.094.5 1.1 1.104 0 .143.115.26.26.26.143 0 .26-.117.258-.26-.006-.893-.73-1.62-1.618-1.624z" />
                  </svg>
                  <div className="text-left">
                    <p className="font-bold text-science-blue-900 text-sm">Viber</p>
                    <p className="text-xs text-gray-500">09665487151</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Shipping Location Selection */}
            <div className="bg-white rounded shadow-clinical p-6 border border-gray-100">
              <h2 className="font-heading text-lg font-bold text-science-blue-900 mb-3 flex items-center gap-2">
                Choose Shipping Region *
              </h2>
              <p className="text-xs text-gray-500 mb-6 bg-blue-50 p-3 rounded border border-blue-100">
                Small pouch standard shipping (up to 3 pens). For bulk orders, manual adjustment may apply.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {shippingLocations.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => setShippingLocation(loc.id as 'LUZON' | 'VISAYAS' | 'MINDANAO' | 'MAXIM')}
                    className={`p-4 rounded border transition-all text-left ${shippingLocation === loc.id
                      ? 'border-science-blue-600 bg-clinical-blue ring-1 ring-science-blue-600'
                      : 'border-gray-200 hover:border-science-blue-300'
                      }`}
                  >
                    <p className="font-bold text-science-blue-900 text-sm mb-1">{loc.id.replace('_', ' & ')}</p>
                    <p className="text-xs text-tech-teal font-medium">{hasTirzepatide ? 'FREE' : '₱150'}</p>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleProceedToPayment}
              disabled={!isDetailsValid}
              className={`w-full py-4 rounded font-bold text-base transition-all transform shadow-md ${isDetailsValid
                ? 'btn-primary hover:scale-[1.01]'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
            >
              Proceed to Payment
            </button>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded shadow-clinical p-6 sticky top-24 border border-gray-100">
              <h2 className="font-heading text-lg font-bold text-science-blue-900 mb-6 flex items-center gap-2">
                Order Summary
                <Activity className="w-4 h-4 text-tech-teal" />
              </h2>

              <div className="space-y-4 mb-6">
                {cartItems.map((item, index) => (
                  <div key={index} className="pb-4 border-b border-gray-100">
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex-1">
                        <h4 className="font-bold text-science-blue-900 text-sm">{item.product.name}</h4>
                        {item.variation && (
                          <p className="text-xs text-gray-600 mt-0.5">{item.variation.name}</p>
                        )}
                      </div>
                      <span className="font-bold text-science-blue-900 text-sm">
                        ₱{(item.price * item.quantity).toLocaleString('en-PH', { minimumFractionDigits: 0 })}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                  </div>
                ))}
              </div>

              {/* Promo Code */}
              <div className="mb-6 pt-2">
                <p className="text-xs font-bold text-science-blue-700 uppercase mb-2 flex items-center gap-1">
                  <Tag className="w-3 h-3" /> Promo Code
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="ENTER CODE"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-science-blue-500 focus:border-science-blue-500 outline-none uppercase"
                    disabled={!!appliedPromo || isApplyingPromo}
                  />
                  {appliedPromo ? (
                    <button
                      onClick={() => {
                        setAppliedPromo(null);
                        setDiscountAmount(0);
                        setPromoCode('');
                        setPromoSuccess('');
                      }}
                      className="px-3 py-2 bg-red-50 text-red-600 rounded text-xs font-bold border border-red-100 hover:bg-red-100"
                    >
                      REMOVE
                    </button>
                  ) : (
                    <button
                      onClick={handleApplyPromoCode}
                      disabled={!promoCode || isApplyingPromo}
                      className="px-3 py-2 bg-science-blue-600 text-white rounded text-xs font-bold hover:bg-science-blue-700 disabled:opacity-50"
                    >
                      APPLY
                    </button>
                  )}
                </div>
                {promoError && <p className="text-red-500 text-xs mt-1">{promoError}</p>}
                {promoSuccess && <p className="text-bio-green text-xs mt-1 font-medium">{promoSuccess}</p>}
              </div>

              <div className="space-y-2 text-sm text-gray-600 border-t border-gray-100 pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₱{totalPrice.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-bio-green font-medium">
                    <span>Discount</span>
                    <span>-₱{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-science-blue-900 text-base pt-2">
                  <span>Total Estimate</span>
                  <span>₱{Math.max(0, totalPrice - discountAmount).toLocaleString()}</span>
                </div>
                <p className="text-xs text-gray-400 text-right italic">+ Shipping fee added at payment</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
