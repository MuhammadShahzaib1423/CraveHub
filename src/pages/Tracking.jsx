import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bike, Check, ChefHat, ClipboardCheck, House, MapPin, Phone } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatRs } from '../data/restaurants';

const STEPS = [
  { icon: ClipboardCheck, title: 'Order confirmed', text: 'The kitchen has your ticket.' },
  { icon: ChefHat, title: 'In the kitchen', text: 'Flames up — your food is being prepared.' },
  { icon: Bike, title: 'Rider on the way', text: 'Your rider picked up the order.' },
  { icon: House, title: 'Delivered', text: 'Enjoy every bite!' },
];

export default function Tracking() {
  const { orderId } = useParams();
  const { orders, setOrders } = useStore();
  const order = orders.find((o) => o.id === orderId);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!order || order.status >= 3) return;
    const t = setInterval(() => {
      setTick((x) => x + 1);
      setOrders((prev) => prev.map((o) => (o.id === orderId && o.status < 3 ? { ...o, status: o.status + 1 } : o)));
    }, 16000);
    return () => clearInterval(t);
  }, [orderId, order?.status]);

  const progress = useMemo(() => (order ? (order.status / 3) * 100 : 0), [order, tick]);

  if (!order) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <p className="font-display text-2xl font-bold">Order not found</p>
        <Link to="/orders" className="mt-4 inline-block text-sm font-bold text-ember-600 hover:underline">View your orders</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-ember-600">Live tracking</p>
        <h1 className="mt-1 font-display text-4xl font-extrabold tracking-tight">Order {order.id}</h1>
        <p className="mt-1 text-ink/55">Placed {new Date(order.placedAt).toLocaleTimeString()} · arriving in ~{order.eta} min</p>
      </motion.div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
        {/* animated route map */}
        <div className="relative overflow-hidden rounded-3xl bg-ink p-6 shadow-soft sm:p-8">
          <div className="texture-dots absolute inset-0 opacity-20" style={{ filter: 'invert(1)' }} />
          <div className="relative">
            <div className="flex items-center justify-between text-cream">
              <span className="flex items-center gap-2 text-sm font-bold"><MapPin size={15} className="text-ember-400" /> {order.details.address.slice(0, 34)}…</span>
              <span className="rounded-full bg-ember-500 px-3 py-1 text-xs font-bold">~{order.eta} min</span>
            </div>
            <div className="relative mt-10 h-56">
              <svg viewBox="0 0 400 200" className="absolute inset-0 h-full w-full">
                <path id="route" d="M30 160 C 110 160, 120 60, 200 70 S 300 140, 370 60" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="3" strokeDasharray="8 8" />
              </svg>
              <span className="absolute left-4 top-[132px] grid h-11 w-11 place-items-center rounded-2xl bg-ember-500 text-white shadow-card"><ChefHat size={20} /></span>
              <span className="absolute right-2 top-[32px] grid h-11 w-11 place-items-center rounded-2xl bg-leaf text-white shadow-card"><House size={20} /></span>
              <motion.div
                className="absolute left-0 top-0"
                animate={{ offsetDistance: `${progress}%` }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                style={{ offsetPath: 'path("M30 160 C 110 160, 120 60, 200 70 S 300 140, 370 60")' }}
              >
                <motion.span
                  className="grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-soft"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                >
                  <Bike size={22} className="text-ember-600" />
                </motion.span>
              </motion.div>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div className="h-full rounded-full bg-gradient-to-r from-ember-400 to-ember-500"
                animate={{ width: `${progress}%` }} transition={{ duration: 1.2, ease: 'easeInOut' }} />
            </div>
            <div className="mt-5 flex items-center gap-4 rounded-2xl bg-white/5 p-4">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-ember-500/20 font-display text-lg font-bold text-ember-300">A</span>
              <div className="flex-1">
                <p className="text-sm font-bold text-cream">Ahmed is your rider</p>
                <p className="text-xs text-cream/50">4.9 · 2,300+ deliveries</p>
              </div>
              <button className="grid h-11 w-11 place-items-center rounded-full bg-ember-500 text-white transition hover:bg-ember-400" aria-label="Call rider">
                <Phone size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* timeline */}
        <div className="rounded-3xl bg-white p-6 shadow-card sm:p-8">
          <h2 className="font-display text-lg font-bold">Journey</h2>
          <div className="mt-6 space-y-0">
            {STEPS.map((s, i) => {
              const done = i < order.status;
              const active = i === order.status;
              return (
                <div key={s.title} className="relative flex gap-4 pb-8 last:pb-0">
                  {i < STEPS.length - 1 && (
                    <span className="absolute left-[22px] top-12 h-[calc(100%-3rem)] w-0.5 bg-ink/10">
                      <motion.span className="block w-full bg-ember-500"
                        initial={{ height: '0%' }}
                        animate={{ height: done || active ? '100%' : '0%' }}
                        transition={{ duration: 0.8 }} />
                    </span>
                  )}
                  <motion.span
                    initial={false}
                    animate={active ? { scale: [1, 1.12, 1] } : { scale: 1 }}
                    transition={active ? { duration: 1.8, repeat: Infinity } : {}}
                    className={`z-10 grid h-11 w-11 shrink-0 place-items-center rounded-2xl transition-colors ${done ? 'bg-leaf text-white' : active ? 'bg-ember-500 text-white shadow-card' : 'bg-ink/5 text-ink/35'}`}
                  >
                    {done ? <Check size={19} /> : <s.icon size={19} />}
                  </motion.span>
                  <div className="pt-1">
                    <p className={`text-sm font-bold ${done || active ? '' : 'text-ink/40'}`}>{s.title}</p>
                    <p className="text-xs text-ink/50">{s.text}</p>
                    <AnimatePresence>
                      {active && (
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-1 text-xs font-bold text-ember-600">
                          Happening now…
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 rounded-2xl bg-cream p-4 text-sm">
            <div className="flex justify-between"><span className="text-ink/55">{order.items.reduce((s, c) => s + c.qty, 0)} items</span><span className="font-bold">{formatRs(order.total)}</span></div>
            <p className="mt-1 text-xs text-ink/45">{order.items.map((c) => `${c.qty}× ${c.item.name}`).join(' · ')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
