import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Flame, Heart, History, Menu, Search, ShoppingBag, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function Navbar() {
  const { itemCount, setCartOpen, lastAdded } = useStore();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const go = (e) => {
    e.preventDefault();
    navigate(query.trim() ? `/restaurants?q=${encodeURIComponent(query.trim())}` : '/restaurants');
    setOpen(false);
  };

  const linkCls = ({ isActive }) =>
    `text-sm font-semibold transition-colors ${isActive ? 'text-ember-600' : 'text-ink/70 hover:text-ink'}`;

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-2xl bg-ember-500 text-white shadow-card">
            <Flame size={20} strokeWidth={2.4} />
          </span>
          <span className="font-display text-xl font-bold tracking-tight">
            Crave<span className="text-ember-500">Hub</span>
          </span>
        </Link>

        <form onSubmit={go} className="hidden flex-1 items-center md:flex">
          <div className="relative w-full max-w-md">
            <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search biryani, pizza, sushi…"
              className="w-full rounded-full border border-ink/10 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-ember-400 focus:ring-2 focus:ring-ember-200"
            />
          </div>
        </form>

        <nav className="ml-auto hidden items-center gap-6 md:flex">
          <NavLink to="/restaurants" className={linkCls}>Restaurants</NavLink>
          <NavLink to="/favorites" className={linkCls}>Favourites</NavLink>
          <NavLink to="/orders" className={linkCls}>Orders</NavLink>
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <Link to="/favorites" className="grid h-10 w-10 place-items-center rounded-full transition hover:bg-ink/5" aria-label="Favourites">
            <Heart size={19} />
          </Link>
          <Link to="/orders" className="grid h-10 w-10 place-items-center rounded-full transition hover:bg-ink/5" aria-label="Orders">
            <History size={19} />
          </Link>
          <motion.button
            key={lastAdded}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 0.35 }}
            onClick={() => setCartOpen(true)}
            className="relative grid h-10 w-10 place-items-center rounded-full bg-ink text-cream transition hover:bg-ember-600"
            aria-label="Open cart"
          >
            <ShoppingBag size={19} />
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-ember-500 px-1 text-[11px] font-bold text-white"
                >
                  {itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
          <button onClick={() => setOpen(!open)} className="grid h-10 w-10 place-items-center rounded-full transition hover:bg-ink/5 md:hidden" aria-label="Menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-ink/10 md:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              <form onSubmit={go} className="relative mb-3">
                <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/40" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search cravings…"
                  className="w-full rounded-full border border-ink/10 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-ember-400"
                />
              </form>
              {[
                ['/restaurants', 'Restaurants'],
                ['/favorites', 'Favourites'],
                ['/orders', 'Orders'],
              ].map(([to, label]) => (
                <Link key={to} to={to} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-ink/5">
                  {label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
