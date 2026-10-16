import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Bike, Clock, Search, ShieldCheck, Sparkles, Star, Wallet } from 'lucide-react';
import { restaurants, CUISINES } from '../data/restaurants';
import RestaurantCard from '../components/RestaurantCard';
import Reveal from '../components/Reveal';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] } }),
};

export default function Home() {
  const featured = restaurants.filter((r) => r.featured);

  return (
    <div>
      {/* HERO */}
      <section className="texture-dots relative overflow-hidden">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-ember-200/50 blur-3xl" />
        <div className="pointer-events-none absolute -left-40 top-64 h-[380px] w-[380px] rounded-full bg-amber-200/40 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-2 lg:pt-20">
          <div>
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold text-ember-700 shadow-card">
              <Sparkles size={14} /> 120+ kitchens near you
            </motion.div>
            <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1}
              className="mt-5 font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Craving it?<br />
              <span className="relative inline-block text-ember-500">
                It's on its way.
                <motion.svg viewBox="0 0 300 14" className="absolute -bottom-2 left-0 w-full" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.9 }}>
                  <motion.path d="M4 10 C 80 2, 220 2, 296 8" fill="none" stroke="#F9591B" strokeWidth="5" strokeLinecap="round"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, delay: 0.9 }} />
                </motion.svg>
              </span>
            </motion.h1>
            <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2} className="mt-6 max-w-md text-lg text-ink/60">
              Order from the city's most loved kitchens — tracked live from flame to doorstep.
            </motion.p>
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="mt-8 flex flex-wrap gap-3">
              <Link to="/restaurants" className="group flex items-center gap-2 rounded-2xl bg-ink px-7 py-4 text-sm font-bold text-cream shadow-soft transition hover:bg-ember-600">
                Order now <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/restaurants" className="rounded-2xl border-2 border-ink/10 bg-white px-7 py-4 text-sm font-bold transition hover:border-ember-400">
                Browse kitchens
              </Link>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4} className="mt-10 flex gap-8">
              {[
                ['4.8', 'avg. rating'],
                ['28 min', 'avg. delivery'],
                ['120+', 'restaurants'],
              ].map(([v, l]) => (
                <div key={l}>
                  <p className="font-display text-2xl font-extrabold">{v}</p>
                  <p className="text-xs uppercase tracking-widest text-ink/45">{l}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="relative hidden lg:block">
            <div className="relative mx-auto h-[520px] w-[420px]">
              <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember-400/25 blur-2xl" />
              <motion.img src="/images/dish-saffron.jpg" alt="Signature biryani"
                className="absolute left-8 top-4 h-64 w-64 rounded-[2rem] object-cover shadow-soft"
                animate={{ y: [0, -14, 0], rotate: [-4, -2, -4] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />
              <motion.img src="/images/dish-burger.jpg" alt="Smash burger"
                className="absolute bottom-10 right-0 h-56 w-56 rounded-[2rem] object-cover shadow-soft"
                animate={{ y: [0, 12, 0], rotate: [3, 5, 3] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }} />
              <motion.img src="/images/dish-velvet.jpg" alt="Molten dessert"
                className="absolute bottom-0 left-0 h-44 w-44 rounded-[2rem] object-cover shadow-soft"
                animate={{ y: [0, -10, 0], rotate: [-3, -5, -3] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.1 }} />
              <motion.div
                className="absolute right-10 top-8 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-soft"
                animate={{ y: [0, -8, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}>
                <span className="grid h-9 w-9 place-items-center rounded-full bg-leaf/10 text-leaf"><Bike size={18} /></span>
                <div><p className="text-xs font-bold">Rider nearby</p><p className="text-[11px] text-ink/50">Arriving in 12 min</p></div>
              </motion.div>
              <motion.div
                className="absolute left-0 top-1/2 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-soft"
                animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}>
                <span className="grid h-9 w-9 place-items-center rounded-full bg-amber-100 text-amber-600"><Star size={18} className="fill-amber-500 text-amber-500" /></span>
                <div><p className="text-xs font-bold">4.9 rating</p><p className="text-[11px] text-ink/50">12k happy reviews</p></div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* cuisine marquee */}
        <div className="relative border-y border-ink/10 bg-ink py-4">
          <div className="flex overflow-hidden">
            <div className="flex min-w-full shrink-0 animate-marquee items-center gap-10 pr-10">
              {[...CUISINES, ...CUISINES].map((c, i) => (
                <span key={i} className="flex items-center gap-10 whitespace-nowrap font-display text-sm font-bold uppercase tracking-[0.2em] text-cream/80">
                  {c} <span className="text-ember-400">✦</span>
                </span>
              ))}
            </div>
            <div aria-hidden className="flex min-w-full shrink-0 animate-marquee items-center gap-10 pr-10">
              {[...CUISINES, ...CUISINES].map((c, i) => (
                <span key={i} className="flex items-center gap-10 whitespace-nowrap font-display text-sm font-bold uppercase tracking-[0.2em] text-cream/80">
                  {c} <span className="text-ember-400">✦</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
        <Reveal>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-ember-600">Handpicked for you</p>
              <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Featured kitchens</h2>
            </div>
            <Link to="/restaurants" className="group hidden items-center gap-1.5 text-sm font-bold text-ember-600 sm:flex">
              View all <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.slice(0, 4).map((r, i) => (
            <RestaurantCard key={r.id} restaurant={r} index={i} />
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6">
        <Reveal className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-ember-600">Effortless</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">From craving to doorstep</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { icon: Search, title: 'Pick your craving', text: 'Browse 120+ kitchens, filter by cuisine, rating or delivery time.' },
            { icon: Wallet, title: 'Pay your way', text: 'Cards, wallets or cash on delivery — checkout takes under a minute.' },
            { icon: Bike, title: 'Track it live', text: 'Watch your rider glide across the map in real time until the knock.' },
          ].map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <div className="group h-full rounded-3xl bg-white p-8 shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-soft">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-ember-500 text-white shadow-card transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                  <s.icon size={24} />
                </span>
                <p className="mt-5 font-mono text-xs font-bold text-ink/30">0{i + 1}</p>
                <h3 className="mt-1 font-display text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/55">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-ink px-8 py-14 text-cream sm:px-14">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-ember-500/30 blur-3xl" />
            <motion.img src="/images/dish-dragon.jpg" alt="Wok special"
              className="absolute -right-8 top-1/2 hidden h-72 w-72 -translate-y-1/2 rotate-6 rounded-[2rem] object-cover shadow-soft md:block"
              animate={{ rotate: [6, 2, 6], y: [0, -10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} />
            <div className="relative max-w-lg">
              <p className="inline-flex items-center gap-2 rounded-full bg-ember-500/20 px-4 py-1.5 text-xs font-bold text-ember-300">
                <ShieldCheck size={14} /> Limited time
              </p>
              <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight sm:text-5xl">
                20% off your first three orders
              </h2>
              <p className="mt-3 text-cream/60">Use code <span className="rounded-lg bg-white/10 px-2.5 py-1 font-mono font-bold text-ember-300">CRAVE20</span> at checkout. Because first impressions should be delicious.</p>
              <Link to="/restaurants" className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-ember-500 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-ember-400">
                Claim the craving <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6">
        <Reveal className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-ember-600">Loved locally</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">12,000+ happy bellies</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { name: 'Areeba K.', area: 'DHA, Lahore', text: 'Ordered at 8:04, eating biryani by 8:31. The live tracking is weirdly addictive — I watched my rider the whole way.' },
            { name: 'Danish R.', area: 'F-7, Islamabad', text: 'The food arrives actually hot. Not warm — hot. CraveHub is now our Friday night ritual.' },
            { name: 'Mahnoor S.', area: 'Gulberg, Karachi', text: 'Finally an app that gets dessert delivery right. My lava cake arrived still molten. Still!' },
          ].map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <figure className="h-full rounded-3xl bg-white p-7 shadow-card">
                <div className="flex gap-1 text-amber-400">
                  {Array(5).fill(0).map((_, s) => <Star key={s} size={15} className="fill-amber-400" />)}
                </div>
                <blockquote className="mt-4 text-sm leading-relaxed text-ink/70">“{t.text}”</blockquote>
                <figcaption className="mt-5 border-t border-ink/5 pt-4">
                  <p className="text-sm font-bold">{t.name}</p>
                  <p className="flex items-center gap-1 text-xs text-ink/45"><Clock size={12} /> {t.area}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
