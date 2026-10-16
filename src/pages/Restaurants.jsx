import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, Star, X } from 'lucide-react';
import { restaurants, CUISINES } from '../data/restaurants';
import RestaurantCard from '../components/RestaurantCard';

export default function Restaurants() {
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get('q') || '');
  const [cuisine, setCuisine] = useState('All');
  const [minRating, setMinRating] = useState(0);
  const [maxFee, setMaxFee] = useState(300);
  const [sort, setSort] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);

  const list = useMemo(() => {
    let out = restaurants.filter((r) => {
      const q = query.trim().toLowerCase();
      const matchQ = !q || r.name.toLowerCase().includes(q) || r.cuisines.join(' ').toLowerCase().includes(q) ||
        r.menu.some((m) => m.items.some((i) => i.name.toLowerCase().includes(q)));
      const matchC = cuisine === 'All' || r.cuisines.includes(cuisine);
      return matchQ && matchC && r.rating >= minRating && r.deliveryFee <= maxFee;
    });
    out = [...out].sort((a, b) => {
      if (sort === 'rating') return b.rating - a.rating;
      if (sort === 'time') return a.deliveryTime[0] - b.deliveryTime[0];
      if (sort === 'fee') return a.deliveryFee - b.deliveryFee;
      return 0;
    });
    return out;
  }, [query, cuisine, minRating, maxFee, sort]);

  const filters = (
    <div className="space-y-6">
      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-ink/45">Cuisine</p>
        <div className="flex flex-wrap gap-2">
          {['All', ...CUISINES].map((c) => (
            <button key={c} onClick={() => setCuisine(c)}
              className={`rounded-full px-4 py-2 text-xs font-bold transition ${cuisine === c ? 'bg-ink text-cream shadow-card' : 'bg-white text-ink/60 hover:bg-ink/5'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-ink/45">Minimum rating</p>
        <div className="flex gap-2">
          {[0, 4.5, 4.7, 4.8].map((r) => (
            <button key={r} onClick={() => setMinRating(r)}
              className={`flex items-center gap-1 rounded-full px-4 py-2 text-xs font-bold transition ${minRating === r ? 'bg-ink text-cream' : 'bg-white text-ink/60 hover:bg-ink/5'}`}>
              {r === 0 ? 'Any' : <><Star size={12} className="fill-amber-400 text-amber-400" /> {r}+</>}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-3 flex justify-between text-xs font-bold uppercase tracking-widest text-ink/45">
          Max delivery fee <span className="text-ember-600">Rs {maxFee}</span>
        </p>
        <input type="range" min={50} max={300} step={10} value={maxFee} onChange={(e) => setMaxFee(+e.target.value)}
          className="w-full accent-ember-500" />
      </div>
      <button onClick={() => { setCuisine('All'); setMinRating(0); setMaxFee(300); setQuery(''); }}
        className="text-xs font-bold text-ember-600 hover:underline">Reset all filters</button>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">All restaurants</h1>
        <p className="mt-2 text-ink/55">{list.length} kitchens delivering to you right now</p>
      </motion.div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search restaurants, cuisines or dishes…"
            className="w-full rounded-2xl border border-ink/10 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-ember-400 focus:ring-2 focus:ring-ember-200" />
        </div>
        <div className="flex gap-3">
          <select value={sort} onChange={(e) => setSort(e.target.value)}
            className="rounded-2xl border border-ink/10 bg-white px-4 py-3.5 text-sm font-semibold outline-none">
            <option value="rating">Top rated</option>
            <option value="time">Fastest</option>
            <option value="fee">Lowest fee</option>
          </select>
          <button onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 rounded-2xl bg-ink px-5 py-3.5 text-sm font-bold text-cream lg:hidden">
            {showFilters ? <X size={16} /> : <SlidersHorizontal size={16} />} Filters
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden lg:hidden">
            <div className="rounded-3xl bg-white p-6 shadow-card mt-4">{filters}</div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-3xl bg-white p-6 shadow-card">{filters}</div>
        </aside>
        <div>
          {list.length === 0 ? (
            <div className="rounded-3xl bg-white p-16 text-center shadow-card">
              <p className="font-display text-xl font-bold">No kitchens match those filters</p>
              <p className="mt-2 text-sm text-ink/50">Try loosening a filter or two — hunger waits for no one.</p>
            </div>
          ) : (
            <motion.div layout className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence>
                {list.map((r, i) => (
                  <motion.div key={r.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }}>
                    <RestaurantCard restaurant={r} index={i} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
