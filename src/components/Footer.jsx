import { Link } from 'react-router-dom';
import { Flame, Globe, AtSign, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-24 bg-ink text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-2xl bg-ember-500 text-white">
              <Flame size={20} strokeWidth={2.4} />
            </span>
            <span className="font-display text-xl font-bold">Crave<span className="text-ember-400">Hub</span></span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/60">
            The city's most loved kitchens, delivered hot to your door in minutes. Craving solved.
          </p>
          <div className="mt-5 flex gap-3">
            {[Globe, AtSign, MessageCircle].map((Icon, i) => (
              <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition hover:bg-ember-500">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-widest text-cream/50">Explore</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/restaurants" className="text-cream/75 hover:text-ember-400">All restaurants</Link></li>
            <li><Link to="/favorites" className="text-cream/75 hover:text-ember-400">Favourites</Link></li>
            <li><Link to="/orders" className="text-cream/75 hover:text-ember-400">Track orders</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-widest text-cream/50">Cuisines</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-cream/75">
            <li>BBQ &amp; Grill</li>
            <li>Desi</li>
            <li>Italian</li>
            <li>Chinese</li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-widest text-cream/50">Get the app</h4>
          <p className="mt-4 text-sm text-cream/60">Live tracking, exclusive deals and one-tap reorders.</p>
          <div className="mt-4 flex gap-2">
            <button className="rounded-xl bg-white/10 px-4 py-2.5 text-xs font-bold transition hover:bg-ember-500">App Store</button>
            <button className="rounded-xl bg-white/10 px-4 py-2.5 text-xs font-bold transition hover:bg-ember-500">Google Play</button>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-cream/40">
        © {new Date().getFullYear()} CraveHub. A concept food-delivery experience.
      </div>
    </footer>
  );
}
