import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Banknote, Check, CreditCard, MapPin, Wallet } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatRs } from '../data/restaurants';
import Reveal from '../components/Reveal';

export default function Checkout() {
  const { cart, subtotal, deliveryFee, discount, total, placeOrder } = useStore();
  const [form, setForm] = useState({ name: '', phone: '', address: '', note: '' });
  const [pay, setPay] = useState('card');
  const [touched, setTouched] = useState(false);
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <p className="font-display text-2xl font-bold">Nothing to check out yet</p>
        <Link to="/restaurants" className="mt-4 inline-block text-sm font-bold text-ember-600 hover:underline">Browse restaurants</Link>
      </div>
    );
  }

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const valid = form.name.trim() && form.phone.trim().length >= 10 && form.address.trim().length >= 8;

  const submit = () => {
    setTouched(true);
    if (!valid) return;
    const order = placeOrder({ ...form, pay });
    navigate(`/track/${order.id}`);
  };

  const input = 'w-full rounded-2xl border border-ink/10 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-ember-400 focus:ring-2 focus:ring-ember-200';
  const err = 'mt-1 text-xs font-semibold text-red-600';

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Reveal>
        <Link to="/cart" className="inline-flex items-center gap-1.5 text-sm font-bold text-ink/55 hover:text-ink"><ArrowLeft size={15} /> Back to cart</Link>
        <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight">Checkout</h1>
      </Reveal>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl bg-white p-6 shadow-card sm:p-8">
            <h2 className="flex items-center gap-2 font-display text-lg font-bold"><MapPin size={18} className="text-ember-500" /> Delivery details</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <input value={form.name} onChange={set('name')} placeholder="Full name" className={input} />
                {touched && !form.name.trim() && <p className={err}>Please enter your name.</p>}
              </div>
              <div>
                <input value={form.phone} onChange={set('phone')} placeholder="Phone (03xx xxxxxxx)" className={input} />
                {touched && form.phone.trim().length < 10 && <p className={err}>Enter a valid phone number.</p>}
              </div>
              <div className="sm:col-span-2">
                <textarea value={form.address} onChange={set('address')} placeholder="Street address, block, city" rows={2} className={input} />
                {touched && form.address.trim().length < 8 && <p className={err}>Please enter a complete address.</p>}
              </div>
              <div className="sm:col-span-2">
                <input value={form.note} onChange={set('note')} placeholder="Rider note (optional) — e.g. ring twice" className={input} />
              </div>
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="rounded-3xl bg-white p-6 shadow-card sm:p-8">
            <h2 className="flex items-center gap-2 font-display text-lg font-bold"><Wallet size={18} className="text-ember-500" /> Payment method</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                { id: 'card', icon: CreditCard, label: 'Card', sub: 'Visa · Mastercard' },
                { id: 'wallet', icon: Wallet, label: 'Wallet', sub: 'JazzCash · Easypaisa' },
                { id: 'cash', icon: Banknote, label: 'Cash', sub: 'Pay the rider' },
              ].map((m) => (
                <button key={m.id} onClick={() => setPay(m.id)}
                  className={`relative rounded-2xl border-2 p-4 text-left transition ${pay === m.id ? 'border-ember-500 bg-ember-50' : 'border-ink/10 hover:border-ink/25'}`}>
                  {pay === m.id && <span className="absolute right-3 top-3 grid h-5 w-5 place-items-center rounded-full bg-ember-500 text-white"><Check size={12} /></span>}
                  <m.icon size={20} className={pay === m.id ? 'text-ember-600' : 'text-ink/50'} />
                  <p className="mt-2 text-sm font-bold">{m.label}</p>
                  <p className="text-xs text-ink/45">{m.sub}</p>
                </button>
              ))}
            </div>
          </motion.section>
        </div>

        <div className="h-fit rounded-3xl bg-ink p-6 text-cream shadow-soft lg:sticky lg:top-24">
          <h3 className="font-display text-lg font-bold">Order summary</h3>
          <ul className="mt-4 max-h-56 space-y-2.5 overflow-y-auto text-sm">
            {cart.map((c) => (
              <li key={c.key} className="flex justify-between gap-3">
                <span className="text-cream/70"><span className="font-bold text-cream">{c.qty}×</span> {c.item.name}</span>
                <span className="shrink-0 font-semibold">{formatRs(c.item.price * c.qty)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2.5 border-t border-white/10 pt-4 text-sm">
            <div className="flex justify-between"><dt className="text-cream/60">Subtotal</dt><dd>{formatRs(subtotal)}</dd></div>
            {discount > 0 && <div className="flex justify-between text-emerald-300"><dt>Discount</dt><dd>−{formatRs(discount)}</dd></div>}
            <div className="flex justify-between"><dt className="text-cream/60">Delivery</dt><dd>{formatRs(deliveryFee)}</dd></div>
            <div className="flex justify-between font-display text-lg font-bold"><dt>Total</dt><dd>{formatRs(total)}</dd></div>
          </dl>
          <motion.button whileTap={{ scale: 0.97 }} onClick={submit}
            className="mt-6 w-full rounded-2xl bg-ember-500 py-4 text-sm font-bold text-white transition hover:bg-ember-400">
            Place order · {formatRs(total)}
          </motion.button>
          <p className="mt-3 text-center text-xs text-cream/40">This is a concept demo — no real payment is taken.</p>
        </div>
      </div>
    </div>
  );
}
