export const CUISINES = [
  'BBQ & Grill',
  'Desi',
  'Healthy',
  'Italian',
  'Chinese',
  'Burgers',
  'Desserts',
  'Seafood',
];

export const restaurants = [
  {
    id: 'ember-oak',
    name: 'Ember & Oak',
    tagline: 'Fire-kissed BBQ, smoked low and slow',
    cuisines: ['BBQ & Grill'],
    rating: 4.8,
    reviews: 2314,
    deliveryTime: [25, 40],
    deliveryFee: 149,
    priceLevel: 2,
    area: 'DHA Phase 5',
    image: '/images/cover-ember.jpg',
    dishImage: '/images/dish-ember.jpg',
    featured: true,
    offer: '20% off over Rs 1,500',
    menu: [
      {
        category: 'From the Grill',
        items: [
          { id: 'eo1', name: 'Chicken Tikka Skewers', desc: 'Char-grilled, smoked yoghurt marinade, mint chutney', price: 649, popular: true, spicy: true },
          { id: 'eo2', name: 'Smoked Beef Ribs', desc: '12-hour smoked, ember glaze, pickled onions', price: 1299, popular: true },
          { id: 'eo3', name: 'Seekh Kebab Platter', desc: 'Six hand-rolled kebabs, tandoori naan, raita', price: 899, spicy: true },
        ],
      },
      {
        category: 'Plates & Sides',
        items: [
          { id: 'eo4', name: 'Ember Mixed Grill', desc: 'Tikka, malai boti and wings on sizzling platter', price: 1149, popular: true },
          { id: 'eo5', name: 'Loaded Masala Fries', desc: 'Kebab crumble, cheese sauce, jalapeños', price: 499, veg: true, spicy: true },
          { id: 'eo6', name: 'Garlic Naan Basket', desc: 'Four tandoor-fresh naans, whipped butter', price: 349, veg: true },
        ],
      },
    ],
  },
  {
    id: 'saffron-route',
    name: 'Saffron Route',
    tagline: 'Royal desi recipes, handed down generations',
    cuisines: ['Desi'],
    rating: 4.9,
    reviews: 3120,
    deliveryTime: [30, 45],
    deliveryFee: 99,
    priceLevel: 2,
    area: 'F-7 Markaz',
    image: '/images/cover-saffron.jpg',
    dishImage: '/images/dish-saffron.jpg',
    featured: true,
    offer: 'Free delivery this week',
    menu: [
      {
        category: 'Handi & Biryani',
        items: [
          { id: 'sr1', name: 'Chicken Biryani Handi', desc: 'Saffron rice, crispy onions, served in copper handi', price: 549, popular: true, spicy: true },
          { id: 'sr2', name: 'Beef Nihari', desc: 'Slow-braised shank, ginger, green chillies, naan', price: 749, spicy: true },
          { id: 'sr3', name: 'Chicken Karahi (Half)', desc: 'Wok-tossed with tomatoes, black pepper, desi ghee', price: 899, popular: true },
        ],
      },
      {
        category: 'Kebabs & Breads',
        items: [
          { id: 'sr4', name: 'Chapli Kebab (4 pc)', desc: 'Peshawari style, pomegranate, tomato relish', price: 649 },
          { id: 'sr5', name: 'Roghni Naan (2 pc)', desc: 'Sesame-crusted, tandoor baked', price: 199, veg: true },
          { id: 'sr6', name: 'Kheer Shahi', desc: 'Slow-cooked rice pudding, pistachio, cardamom', price: 349, veg: true },
        ],
      },
    ],
  },
  {
    id: 'verde-bowl',
    name: 'Verde Bowl',
    tagline: 'Colourful bowls that love you back',
    cuisines: ['Healthy'],
    rating: 4.7,
    reviews: 1187,
    deliveryTime: [20, 35],
    deliveryFee: 149,
    priceLevel: 2,
    area: 'E-11',
    image: '/images/cover-verde.jpg',
    dishImage: '/images/dish-verde.jpg',
    featured: true,
    menu: [
      {
        category: 'Signature Bowls',
        items: [
          { id: 'vb1', name: 'Rainbow Buddha Bowl', desc: 'Quinoa, roasted veg, chickpeas, tahini drizzle', price: 749, veg: true, popular: true },
          { id: 'vb2', name: 'Grilled Chicken Power Bowl', desc: 'Herb chicken, brown rice, avocado, lime', price: 849, popular: true },
          { id: 'vb3', name: 'Mediterranean Mezze Bowl', desc: 'Falafel, hummus, olives, warm pita', price: 699, veg: true },
        ],
      },
      {
        category: 'Juices & More',
        items: [
          { id: 'vb4', name: 'Green Glow Smoothie', desc: 'Spinach, mango, banana, coconut water', price: 449, veg: true },
          { id: 'vb5', name: 'Overnight Oats Jar', desc: 'Chia, berries, almond butter, honey', price: 549, veg: true },
        ],
      },
    ],
  },
  {
    id: 'crust-culture',
    name: 'Crust Culture',
    tagline: 'Wood-fired pizza, 72-hour dough',
    cuisines: ['Italian'],
    rating: 4.8,
    reviews: 2043,
    deliveryTime: [25, 40],
    deliveryFee: 199,
    priceLevel: 2,
    area: 'Gulberg Greens',
    image: '/images/cover-crust.jpg',
    dishImage: '/images/dish-crust.jpg',
    featured: true,
    offer: 'Buy 1 get 1 on medium pizzas',
    menu: [
      {
        category: 'Wood-Fired Pizzas',
        items: [
          { id: 'cc1', name: 'Margherita Classica', desc: 'San Marzano tomato, fior di latte, basil', price: 999, veg: true, popular: true },
          { id: 'cc2', name: 'Pepperoni Blaze', desc: 'Double pepperoni, mozzarella, chilli honey', price: 1249, spicy: true, popular: true },
          { id: 'cc3', name: 'Truffle Funghi', desc: 'Wild mushrooms, truffle cream, parmesan', price: 1399, veg: true },
        ],
      },
      {
        category: 'Sides',
        items: [
          { id: 'cc4', name: 'Garlic Knots (6 pc)', desc: 'Wood-oven baked, parmesan snow', price: 449, veg: true },
          { id: 'cc5', name: 'Tiramisu Cup', desc: 'Espresso-soaked, mascarpone cloud', price: 549, veg: true },
        ],
      },
    ],
  },
  {
    id: 'dragon-wok',
    name: 'Dragon Wok',
    tagline: 'Wok hei flavour, lightning fast',
    cuisines: ['Chinese'],
    rating: 4.6,
    reviews: 1876,
    deliveryTime: [20, 35],
    deliveryFee: 149,
    priceLevel: 1,
    area: 'Bahria Town',
    image: '/images/cover-dragon.jpg',
    dishImage: '/images/dish-dragon.jpg',
    featured: false,
    menu: [
      {
        category: 'Wok Specials',
        items: [
          { id: 'dw1', name: 'Kung Pao Chicken', desc: 'Cashews, dried chillies, scallions, jasmine rice', price: 749, spicy: true, popular: true },
          { id: 'dw2', name: 'Dragon Hakka Noodles', desc: 'Smoky wok-tossed, julienned veg, sesame', price: 649, veg: true },
          { id: 'dw3', name: 'Sweet & Sour Fish', desc: 'Crispy fish, pineapple, bell peppers', price: 849 },
        ],
      },
      {
        category: 'Dim Sum & Rice',
        items: [
          { id: 'dw4', name: 'Chicken Momos (8 pc)', desc: 'Steamed, spicy sesame dip', price: 549, popular: true },
          { id: 'dw5', name: 'Egg Fried Rice', desc: 'Wok hei, spring onion, soy glaze', price: 449, veg: true },
        ],
      },
    ],
  },
  {
    id: 'burger-atelier',
    name: 'Burger Atelier',
    tagline: 'Smashed, stacked, seriously good',
    cuisines: ['Burgers'],
    rating: 4.7,
    reviews: 2654,
    deliveryTime: [20, 30],
    deliveryFee: 99,
    priceLevel: 1,
    area: 'Satellite Town',
    image: '/images/cover-burger.jpg',
    dishImage: '/images/dish-burger.jpg',
    featured: true,
    offer: 'Free fries with any double',
    menu: [
      {
        category: 'Smash Burgers',
        items: [
          { id: 'ba1', name: 'Double Smash Classic', desc: 'Two patties, cheddar, house sauce, brioche', price: 749, popular: true },
          { id: 'ba2', name: 'Shroom & Swiss', desc: 'Mushroom patty, swiss, truffle mayo', price: 849, veg: true },
          { id: 'ba3', name: 'Nashville Hot Stack', desc: 'Crispy chicken, hot glaze, pickles, slaw', price: 799, spicy: true, popular: true },
        ],
      },
      {
        category: 'Sides & Shakes',
        items: [
          { id: 'ba4', name: 'Truffle Parmesan Fries', desc: 'Skin-on fries, truffle oil, parmesan', price: 449, veg: true },
          { id: 'ba5', name: 'Lotus Biscoff Shake', desc: 'Thick vanilla shake, biscoff crumble', price: 549, veg: true, popular: true },
        ],
      },
    ],
  },
  {
    id: 'velvet-crumb',
    name: 'Velvet Crumb',
    tagline: 'Patisserie desserts, baked at dawn',
    cuisines: ['Desserts'],
    rating: 4.9,
    reviews: 1532,
    deliveryTime: [25, 40],
    deliveryFee: 149,
    priceLevel: 2,
    area: 'F-6 Super Market',
    image: '/images/cover-velvet.jpg',
    dishImage: '/images/dish-velvet.jpg',
    featured: false,
    menu: [
      {
        category: 'Signature Bakes',
        items: [
          { id: 'vc1', name: 'Molten Lava Cake', desc: '70% dark chocolate, flowing centre, sea salt', price: 649, veg: true, popular: true },
          { id: 'vc2', name: 'Pistachio Cheesecake', desc: 'Baked Basque style, pistachio praline', price: 749, veg: true },
          { id: 'vc3', name: 'Saffron Milk Cake', desc: 'Tres leches, saffron, rose petals', price: 599, veg: true, popular: true },
        ],
      },
      {
        category: 'Chilled',
        items: [
          { id: 'vc4', name: 'Belgian Chocolate Mousse', desc: 'Whipped ganache, cocoa nib crunch', price: 549, veg: true },
          { id: 'vc5', name: 'Mango Sticky Rice', desc: 'Coconut rice, honey mango, sesame', price: 499, veg: true },
        ],
      },
    ],
  },
  {
    id: 'ocean-pearl',
    name: 'Ocean Pearl',
    tagline: 'Coastal catch, grilled to perfection',
    cuisines: ['Seafood'],
    rating: 4.7,
    reviews: 987,
    deliveryTime: [30, 45],
    deliveryFee: 199,
    priceLevel: 3,
    area: 'Clifton Block 5',
    image: '/images/cover-ocean.jpg',
    dishImage: '/images/dish-ocean.jpg',
    featured: false,
    menu: [
      {
        category: 'From the Coast',
        items: [
          { id: 'op1', name: 'Grilled Jumbo Prawns', desc: 'Garlic lemon butter, charred lime', price: 1299, popular: true },
          { id: 'op2', name: 'Karahi Fish Masala', desc: 'River sole, coastal spices, steamed rice', price: 1099, spicy: true },
          { id: 'op3', name: 'Seafood Paella', desc: 'Saffron rice, mussels, prawns, calamari', price: 1499, popular: true },
        ],
      },
      {
        category: 'Starters',
        items: [
          { id: 'op4', name: 'Crispy Calamari', desc: 'Semolina crust, chilli aioli', price: 749 },
          { id: 'op5', name: 'Coconut Fish Curry Soup', desc: 'Lemongrass broth, herbs', price: 549 },
        ],
      },
    ],
  },
];

export const PROMOS = {
  CRAVE20: { label: '20% off (up to Rs 500)', type: 'percent', value: 20, cap: 500, min: 1000 },
  FLAT200: { label: 'Rs 200 off over Rs 1,200', type: 'flat', value: 200, min: 1200 },
};

export const getRestaurant = (id) => restaurants.find((r) => r.id === id);
export const formatRs = (n) => 'Rs ' + n.toLocaleString('en-PK');
