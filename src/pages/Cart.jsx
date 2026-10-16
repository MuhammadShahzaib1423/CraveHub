import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Minus, Plus, ShoppingBag, Tag, Trash2, X, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatRs, PROMOS } from '../data/restaurants';
import Reveal from '../components/Reveal';

export default function Cart() {
  const { cart, updateQty, subtotal, deliveryFee, discount, total, promoCode, setPromoCode, promoValid, promo } = useStore();
  const [code, setCode] = useState(promoCode);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const apply = () => {
    const c = code.trim().toUpperCase();
    if (!PROMOS[c]) { setError('That code does not exist.'); return; }
    if (subtotal < (PROMOS[c].min || 0)) { setError(`Needs a minimum order of ${formatRs(PROMOS[c].min)}.`); return; }
    setPromoCode(c);
    setError('');
  };

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <span className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-ember-50 text-ember-400">
          <ShoppingBag size={40} />
        </span>
        <h1 className="mt-6 font-display text-3xl font-extrabold">Your cart is empty</h1>
        <p className="mt-2 text-ink/55">Every great meal starts with a single craving.</p>
        <Link to="/restaurants" className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-ink px-7 py-3.5 text-sm font-bold text-cream transition hover:bg-ember-600">
          Find food <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Reveal>
        <h1 className="font-display text-4xl font-extrabold tracking-tight">Your order</h1>
        <p className="mt-1 text-ink/55">{cart.length} restaurant{cart.length > 1 ? 's' : ''} · review before checkout</p>
      </Reveal>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-3">
          {cart.map((c, i) => (
            <motion.div key={c.key} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-card">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold">{c.item.name}</p>
                <p className="text-xs text-ink/45">{c.restaurantName}</p>
                <p className="mt-1 text-sm font-bold text-ember-600">{formatRs(c.item.price * c.qty)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => updateQty(c.key, c.qty - 1)} className="grid h-9 w-9 place-items-center rounded-full bg-ink/5 transition hover:bg-ink/10" aria-label="Decrease">
                  {c.qty === 1 ? <Trash2 size={15} /> : <Minus size={15} />}
                </button>
                <span className="w-6 text-center font-bold">{c.qty}</span>
                <button onClick={() => updateQty(c.key, c.qty + 1)} className="grid h-9 w-9 place-items-center rounded-full bg-ink text-cream transition hover:bg-ember-600" aria-label="Increase">
                  <Plus size={15} />
                </button>
              </div>
            </motion.div>
          ))}

          <div className="rounded-2xl bg-white p-5 shadow-card">
            <p className="flex items-center gap-2 text-sm font-bold"><Tag size={15} className="text-ember-500" /> Promo code</p>
            {promoValid ? (
              <div className="mt-3 flex items-center justify-between rounded-xl bg-leaf/10 px-4 py-3">
                <span className="flex items-center gap-2 text-sm font-bold text-leaf"><Check size={15} /> {promoCode.toUpperCase()} — {promo.label}</span>
                <button onClick={() => { setPromoCode(''); setCode(''); }} aria-label="Remove promo"><X size={15} className="text-ink/40" /></button>
              </div>
            ) : (
              <>
                <div className="mt-3 flex gap-2">
                  <input value={code} onChange={(e) => { setCode(e.target.value); setError(''); }} placeholder="Try CRAVE20"
                    className="flex-1 rounded-xl border border-ink/10 px-4 py-2.5 text-sm uppercase outline-none focus:border-ember-400" />
                  <button onClick={apply} className="rounded-xl bg-ink px-5 text-sm font-bold text-cream transition hover:bg-ember-600">Apply</button>
                </div>
                {error && <p className="mt-2 text-xs font-semibold text-red-600">{error}</p>}
                <p className="mt-2 text-xs text-ink/45">Hint: CRAVE20 or FLAT200</p>
              </>
            )}
          </div>
        </div>

        <div className="h-fit rounded-3xl bg-ink p-6 text-cream shadow-soft lg:sticky lg:top-24">
          <h3 className="font-display text-lg font-bold">Summary</h3>
          <dl className="mt-4 space-y-2.5 text-sm">
            <div className="flex justify-between"><dt className="text-cream/60">Subtotal</dt><dd className="font-semibold">{formatRs(subtotal)}</dd></div>
            {discount > 0 && <div className="flex justify-between text-leaf"><dt>Promo discount</dt><dd className="font-semibold">−{formatRs(discount)}</dd></div>}
            <div className="flex justify-between"><dt className="text-cream/60">Delivery fee</dt><dd className="font-semibold">{formatRs(deliveryFee)}</dd></div>
            <div className="flex justify-between border-t border-white/10 pt-3 font-display text-lg font-bold"><dt>Total</dt><dd>{formatRs(total)}</dd></div>
          </dl>
          <button onClick={() => navigate('/checkout')} className="group mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-ember-500 py-4 text-sm font-bold text-white transition hover:bg-ember-400">
            Continue to checkout <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
