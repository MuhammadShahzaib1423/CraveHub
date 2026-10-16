import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Bike, Clock, Flame, Heart, MapPin, Minus, Plus, Star } from 'lucide-react';
import { getRestaurant, formatRs } from '../data/restaurants';
import { useStore } from '../context/StoreContext';
import Reveal from '../components/Reveal';

function MenuItem({ restaurant, item, index }) {
  const { cart, addToCart, updateQty } = useStore();
  const key = `${restaurant.id}:${item.id}`;
  const inCart = cart.find((c) => c.key === key);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: (index % 4) * 0.06 }}
      className="flex gap-4 rounded-2xl bg-white p-4 shadow-card transition-shadow hover:shadow-soft"
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h4 className="text-sm font-bold">{item.name}</h4>
          {item.popular && (
            <span className="flex items-center gap-1 rounded-full bg-ember-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ember-600">
              <Flame size={10} /> Popular
            </span>
          )}
          {item.veg && <span className="grid h-4 w-4 place-items-center rounded border-2 border-leaf"><span className="h-1.5 w-1.5 rounded-full bg-leaf" /></span>}
          {item.spicy && <span className="text-xs" title="Spicy">🌶</span>}
        </div>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-ink/50">{item.desc}</p>
        <p className="mt-2 text-sm font-bold text-ember-600">{formatRs(item.price)}</p>
      </div>
      <div className="flex flex-col items-end justify-between">
        <img src={restaurant.dishImage} alt={item.name} loading="lazy" className="h-20 w-20 rounded-xl object-cover" />
        {inCart ? (
          <div className="flex items-center gap-2 rounded-full bg-ink px-1.5 py-1 text-cream">
            <button onClick={() => updateQty(key, inCart.qty - 1)} className="grid h-7 w-7 place-items-center rounded-full hover:bg-white/15" aria-label="Decrease">
              <Minus size={13} />
            </button>
            <motion.span key={inCart.qty} initial={{ scale: 0.6 }} animate={{ scale: 1 }} className="w-4 text-center text-xs font-bold">
              {inCart.qty}
            </motion.span>
            <button onClick={() => updateQty(key, inCart.qty + 1)} className="grid h-7 w-7 place-items-center rounded-full bg-ember-500 hover:bg-ember-400" aria-label="Increase">
              <Plus size={13} />
            </button>
          </div>
        ) : (
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => addToCart(restaurant, item)}
            className="rounded-full border-2 border-ember-500 px-5 py-1.5 text-xs font-bold text-ember-600 transition hover:bg-ember-500 hover:text-white">
            ADD
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

export default function RestaurantDetail() {
  const { id } = useParams();
  const restaurant = getRestaurant(id);
  const { favorites, toggleFavorite, itemCount, subtotal, setCartOpen } = useStore();
  const [activeCat, setActiveCat] = useState(0);

  if (!restaurant) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6">
        <p className="font-display text-2xl font-bold">Kitchen not found</p>
        <Link to="/restaurants" className="mt-4 inline-block text-sm font-bold text-ember-600 hover:underline">Back to restaurants</Link>
      </div>
    );
  }

  const fav = favorites.includes(restaurant.id);
  const cats = restaurant.menu.map((m) => m.category);

  return (
    <div>
      <div className="relative h-[340px] overflow-hidden sm:h-[420px]">
        <motion.img src={restaurant.image} alt={restaurant.name}
          initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-8 sm:px-6">
          <Link to="/restaurants" className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-2 text-xs font-bold text-white backdrop-blur transition hover:bg-white/25">
            <ArrowLeft size={14} /> All restaurants
          </Link>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">{restaurant.name}</h1>
                <p className="mt-1.5 text-white/70">{restaurant.tagline}</p>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-semibold text-white">
                  <span className="flex items-center gap-1 rounded-full bg-white/15 px-3 py-1.5 backdrop-blur"><Star size={12} className="fill-amber-400 text-amber-400" /> {restaurant.rating} ({restaurant.reviews.toLocaleString()})</span>
                  <span className="flex items-center gap-1 rounded-full bg-white/15 px-3 py-1.5 backdrop-blur"><Clock size={12} /> {restaurant.deliveryTime[0]}–{restaurant.deliveryTime[1]} min</span>
                  <span className="flex items-center gap-1 rounded-full bg-white/15 px-3 py-1.5 backdrop-blur"><Bike size={12} /> {formatRs(restaurant.deliveryFee)} fee</span>
                  <span className="flex items-center gap-1 rounded-full bg-white/15 px-3 py-1.5 backdrop-blur"><MapPin size={12} /> {restaurant.area}</span>
                </div>
              </div>
              <button onClick={() => toggleFavorite(restaurant.id)}
                className="grid h-12 w-12 place-items-center rounded-full bg-white/15 backdrop-blur transition hover:scale-110 hover:bg-white/25" aria-label="Save to favourites">
                <motion.span animate={fav ? { scale: [1, 1.5, 1] } : {}} transition={{ duration: 0.35 }}>
                  <Heart size={20} className={fav ? 'fill-ember-400 text-ember-400' : 'text-white'} />
                </motion.span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="sticky top-16 z-30 border-b border-ink/10 bg-cream/90 backdrop-blur-xl">
        <div className="no-scrollbar mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-6">
          {cats.map((c, i) => (
            <button key={c} onClick={() => setActiveCat(i)}
              className={`whitespace-nowrap rounded-full px-5 py-2.5 text-xs font-bold transition ${activeCat === i ? 'bg-ink text-cream shadow-card' : 'bg-white text-ink/60 hover:bg-ink/5'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <AnimatePresence mode="wait">
          <motion.div key={activeCat} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
            <h2 className="font-display text-2xl font-extrabold">{restaurant.menu[activeCat].category}</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {restaurant.menu[activeCat].items.map((item, i) => (
                <MenuItem key={item.id} restaurant={restaurant} item={item} index={i} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <Reveal className="mt-14">
          <div className="flex flex-col items-center gap-4 rounded-3xl bg-white p-8 text-center shadow-card sm:flex-row sm:text-left">
            <img src={restaurant.dishImage} alt="Signature dish" className="h-24 w-24 rounded-2xl object-cover shadow-card" />
            <div className="flex-1">
              <h3 className="font-display text-xl font-bold">Chef's signature, boxed with love</h3>
              <p className="mt-1 text-sm text-ink/55">Every order is packed in eco-friendly boxes and sealed for freshness.</p>
            </div>
          </div>
        </Reveal>
      </div>

      <AnimatePresence>
        {itemCount > 0 && (
          <motion.button
            initial={{ y: 90, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 90, opacity: 0 }}
            onClick={() => setCartOpen(true)}
            className="fixed inset-x-4 bottom-4 z-40 mx-auto flex max-w-lg items-center justify-between rounded-2xl bg-ink px-6 py-4 text-cream shadow-soft"
          >
            <span className="text-sm font-bold">{itemCount} item{itemCount > 1 ? 's' : ''} · {formatRs(subtotal)}</span>
            <span className="flex items-center gap-1.5 text-sm font-bold text-ember-400">View cart <Plus size={15} /></span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
