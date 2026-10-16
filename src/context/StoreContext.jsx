import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { PROMOS } from '../data/restaurants';

const StoreContext = createContext(null);

const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => load('cravehub-cart', []));
  const [favorites, setFavorites] = useState(() => load('cravehub-favs', []));
  const [orders, setOrders] = useState(() => load('cravehub-orders', []));
  const [promoCode, setPromoCode] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState(0);

  useEffect(() => localStorage.setItem('cravehub-cart', JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem('cravehub-favs', JSON.stringify(favorites)), [favorites]);
  useEffect(() => localStorage.setItem('cravehub-orders', JSON.stringify(orders)), [orders]);

  const addToCart = (restaurant, item, qty = 1) => {
    setCart((prev) => {
      const key = `${restaurant.id}:${item.id}`;
      const existing = prev.find((c) => c.key === key);
      if (existing) {
        return prev.map((c) => (c.key === key ? { ...c, qty: c.qty + qty } : c));
      }
      return [...prev, { key, restaurantId: restaurant.id, restaurantName: restaurant.name, item, qty }];
    });
    setLastAdded(Date.now());
  };

  const updateQty = (key, qty) => {
    setCart((prev) =>
      qty <= 0 ? prev.filter((c) => c.key !== key) : prev.map((c) => (c.key === key ? { ...c, qty } : c)),
    );
  };

  const clearCart = () => {
    setCart([]);
    setPromoCode('');
  };

  const toggleFavorite = (restaurantId) => {
    setFavorites((prev) =>
      prev.includes(restaurantId) ? prev.filter((f) => f !== restaurantId) : [...prev, restaurantId],
    );
  };

  const subtotal = useMemo(() => cart.reduce((s, c) => s + c.item.price * c.qty, 0), [cart]);
  const itemCount = useMemo(() => cart.reduce((s, c) => s + c.qty, 0), [cart]);
  const deliveryFee = cart.length > 0 ? 149 : 0;

  const promo = PROMOS[promoCode.trim().toUpperCase()];
  const promoValid = promo && subtotal >= (promo.min || 0);
  const discount = promoValid
    ? promo.type === 'percent'
      ? Math.min(Math.round((subtotal * promo.value) / 100), promo.cap || Infinity)
      : promo.value
    : 0;

  const total = Math.max(0, subtotal - discount) + deliveryFee;

  const placeOrder = (details) => {
    const order = {
      id: 'CH-' + Math.random().toString(36).slice(2, 8).toUpperCase(),
      items: cart,
      subtotal,
      discount,
      deliveryFee,
      total,
      promoCode: promoValid ? promoCode.trim().toUpperCase() : null,
      details,
      status: 0,
      placedAt: Date.now(),
      eta: 35 + Math.floor(Math.random() * 15),
    };
    setOrders((prev) => [order, ...prev]);
    clearCart();
    return order;
  };

  const value = {
    cart, addToCart, updateQty, clearCart, cartOpen, setCartOpen, lastAdded,
    favorites, toggleFavorite,
    orders, setOrders, placeOrder,
    promoCode, setPromoCode, promo, promoValid, discount,
    subtotal, deliveryFee, total, itemCount,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export const useStore = () => useContext(StoreContext);
