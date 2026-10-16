import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Heart, Star, Bike } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatRs } from '../data/restaurants';

export default function RestaurantCard({ restaurant, index = 0 }) {
  const { favorites, toggleFavorite } = useStore();
  const fav = favorites.includes(restaurant.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={`/restaurant/${restaurant.id}`}
        className="group block overflow-hidden rounded-3xl bg-white shadow-card transition-shadow duration-300 hover:shadow-soft"
      >
        <div className="relative h-52 overflow-hidden">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
          {restaurant.offer && (
            <span className="absolute left-3 top-3 rounded-full bg-ember-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow">
              {restaurant.offer}
            </span>
          )}
          <button
            onClick={(e) => { e.preventDefault(); toggleFavorite(restaurant.id); }}
            aria-label="Save to favourites"
            className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 backdrop-blur transition hover:scale-110"
          >
            <motion.span animate={fav ? { scale: [1, 1.4, 1] } : {}} transition={{ duration: 0.3 }}>
              <Heart size={17} className={fav ? 'fill-ember-500 text-ember-500' : 'text-ink/60'} />
            </motion.span>
          </button>
          <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-bold backdrop-blur">
            <Clock size={13} className="text-ember-500" />
            {restaurant.deliveryTime[0]}–{restaurant.deliveryTime[1]} min
          </span>
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-display text-lg font-bold leading-tight transition-colors group-hover:text-ember-600">
                {restaurant.name}
              </h3>
              <p className="mt-0.5 text-xs text-ink/50">{restaurant.cuisines.join(' · ')} · {restaurant.area}</p>
            </div>
            <span className="flex shrink-0 items-center gap-1 rounded-full bg-leaf/10 px-2.5 py-1 text-xs font-bold text-leaf">
              <Star size={12} className="fill-leaf" /> {restaurant.rating}
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-ink/5 pt-3 text-xs text-ink/55">
            <span className="flex items-center gap-1.5">
              <Bike size={14} className="text-ember-500" />
              {restaurant.deliveryFee === 0 ? 'Free delivery' : `${formatRs(restaurant.deliveryFee)} delivery`}
            </span>
            <span className="font-semibold tracking-wide">{Array(restaurant.priceLevel).fill('₨').join('')}<span className="text-ink/25">{Array(3 - restaurant.priceLevel).fill('₨').join('')}</span></span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
