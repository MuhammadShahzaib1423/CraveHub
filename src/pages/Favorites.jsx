import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { restaurants } from '../data/restaurants';
import { useStore } from '../context/StoreContext';
import RestaurantCard from '../components/RestaurantCard';
import Reveal from '../components/Reveal';

export default function Favorites() {
  const { favorites } = useStore();
  const list = restaurants.filter((r) => favorites.includes(r.id));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Reveal>
        <h1 className="font-display text-4xl font-extrabold tracking-tight">Your favourites</h1>
        <p className="mt-1 text-ink/55">{list.length} saved kitchen{list.length === 1 ? '' : 's'}</p>
      </Reveal>
      {list.length === 0 ? (
        <div className="mt-10 rounded-3xl bg-white p-16 text-center shadow-card">
          <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-ember-50 text-ember-400"><Heart size={32} /></span>
          <p className="mt-4 font-display text-xl font-bold">No favourites yet</p>
          <p className="mt-1 text-sm text-ink/50">Tap the heart on any restaurant to keep it here.</p>
          <Link to="/restaurants" className="mt-6 inline-block rounded-2xl bg-ink px-7 py-3.5 text-sm font-bold text-cream transition hover:bg-ember-600">
            Discover restaurants
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((r, i) => <RestaurantCard key={r.id} restaurant={r} index={i} />)}
        </div>
      )}
    </div>
  );
}
