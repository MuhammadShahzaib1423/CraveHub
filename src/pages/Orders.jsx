import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, History, MapPin } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatRs } from '../data/restaurants';
import Reveal from '../components/Reveal';

const STATUS_LABELS = ['Confirmed', 'In the kitchen', 'On the way', 'Delivered'];

export default function Orders() {
  const { orders } = useStore();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Reveal>
        <h1 className="font-display text-4xl font-extrabold tracking-tight">Your orders</h1>
        <p className="mt-1 text-ink/55">{orders.length} order{orders.length === 1 ? '' : 's'} placed</p>
      </Reveal>
      {orders.length === 0 ? (
        <div className="mt-10 rounded-3xl bg-white p-16 text-center shadow-card">
          <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-ember-50 text-ember-400"><History size={32} /></span>
          <p className="mt-4 font-display text-xl font-bold">No orders yet</p>
          <p className="mt-1 text-sm text-ink/50">Your delicious history starts with the first bite.</p>
          <Link to="/restaurants" className="mt-6 inline-block rounded-2xl bg-ink px-7 py-3.5 text-sm font-bold text-cream transition hover:bg-ember-600">
            Order something
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {orders.map((o, i) => (
            <motion.div key={o.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="rounded-3xl bg-white p-6 shadow-card">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-display text-lg font-bold">{o.id}</p>
                  <p className="text-xs text-ink/45">{new Date(o.placedAt).toLocaleString()} · {o.items.reduce((s, c) => s + c.qty, 0)} items · {formatRs(o.total)}</p>
                </div>
                <span className={`rounded-full px-3.5 py-1.5 text-xs font-bold ${o.status >= 3 ? 'bg-leaf/10 text-leaf' : 'bg-ember-50 text-ember-700'}`}>
                  {STATUS_LABELS[o.status]}
                </span>
              </div>
              <p className="mt-3 flex items-start gap-1.5 text-xs text-ink/50"><MapPin size={13} className="mt-0.5 shrink-0" /> {o.details.address}</p>
              <p className="mt-2 line-clamp-1 text-xs text-ink/45">{o.items.map((c) => `${c.qty}× ${c.item.name}`).join(' · ')}</p>
              <Link to={`/track/${o.id}`} className="group mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-ember-600">
                {o.status >= 3 ? 'View receipt' : 'Track live'} <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
