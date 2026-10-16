import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus, ShoppingBag, Trash2, X, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatRs } from '../data/restaurants';

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, updateQty, subtotal, itemCount } = useStore();

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-cream shadow-soft"
          >
            <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
              <h3 className="flex items-center gap-2 font-display text-lg font-bold">
                <ShoppingBag size={20} className="text-ember-500" /> Your cart
                <span className="rounded-full bg-ember-100 px-2.5 py-0.5 text-xs font-bold text-ember-700">{itemCount}</span>
              </h3>
              <button onClick={() => setCartOpen(false)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-ink/5" aria-label="Close cart">
                <X size={19} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <span className="grid h-20 w-20 place-items-center rounded-full bg-ember-50 text-ember-400">
                    <ShoppingBag size={32} />
                  </span>
                  <p className="mt-4 font-display text-lg font-bold">Your cart is craving</p>
                  <p className="mt-1 text-sm text-ink/50">Add something delicious to get started.</p>
                </div>
              ) : (
                <ul className="space-y-3">
                  <AnimatePresence initial={false}>
                    {cart.map((c) => (
                      <motion.li
                        key={c.key}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 60 }}
                        className="flex gap-3 rounded-2xl bg-white p-3 shadow-card"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-bold">{c.item.name}</p>
                          <p className="text-xs text-ink/45">{c.restaurantName}</p>
                          <p className="mt-1 text-sm font-bold text-ember-600">{formatRs(c.item.price * c.qty)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateQty(c.key, c.qty - 1)} className="grid h-8 w-8 place-items-center rounded-full bg-ink/5 transition hover:bg-ink/10" aria-label="Decrease">
                            {c.qty === 1 ? <Trash2 size={14} /> : <Minus size={14} />}
                          </button>
                          <span className="w-5 text-center text-sm font-bold">{c.qty}</span>
                          <button onClick={() => updateQty(c.key, c.qty + 1)} className="grid h-8 w-8 place-items-center rounded-full bg-ink text-cream transition hover:bg-ember-600" aria-label="Increase">
                            <Plus size={14} />
                          </button>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-ink/10 px-6 py-5">
                <div className="mb-4 flex items-center justify-between text-sm">
                  <span className="text-ink/55">Subtotal</span>
                  <span className="font-display text-lg font-bold">{formatRs(subtotal)}</span>
                </div>
                <Link
                  to="/cart"
                  onClick={() => setCartOpen(false)}
                  className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-ink py-3.5 text-sm font-bold text-cream transition hover:bg-ember-600"
                >
                  Review order
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
