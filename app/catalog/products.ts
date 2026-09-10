export type Allergens = { contains?: string; mayContain?: string };

export type Product = {
  name: string;
  slug: string;
  shortDescription: string;
  keyIngredients?: string[];
  allergens?: Allergens;
  productCode?: string;
};

export type Category = { name: string; slug: string; items: Product[] };

export const catalog: Category[] = [
  {
    name: "World of Designer Desserts",
    slug: "world-of-designer-desserts",
    items: [
      {
        name: "Caprizzio",
        slug: "caprizzio",
        shortDescription:
          "An individually portioned dessert from our designer collection, finished with a delicate milk-based filling and a light, layered presentation.",
        allergens: {
          contains: "Milk",
          mayContain:
            "Egg, soya, gluten, nuts, peanuts (cross-contamination risk)",
        },
      },
      {
        name: "Cassatina",
        slug: "cassatina",
        shortDescription:
          "A miniature take on the classic Sicilian cassata, layering sponge with a ricotta-style cream and candied fruit for a traditional finish.",
        keyIngredients: ["Sponge", "Ricotta Cream", "Candied Fruit", "Marzipan"],
      },
      {
        name: "Fantastica",
        slug: "fantastica",
        shortDescription:
          "A caramel designer dessert with a soft, layered texture, finished in individual portions for an elegant presentation.",
        keyIngredients: ["Caramel", "Cream", "Biscuit Base"],
        allergens: { contains: "Milk, soya, nuts" },
      },
      {
        name: "Hazelnut Bliss",
        slug: "hazelnut-bliss",
        shortDescription:
          "A hazelnut dessert layered with milk chocolate and a crisp biscuit base, offering a classic pairing in individual portion form.",
        keyIngredients: ["Hazelnut", "Milk Chocolate", "Cream", "Biscuit"],
      },
      {
        name: "Luxe",
        slug: "luxe",
        shortDescription:
          "An individually portioned dessert from our designer range, presented with a smooth, layered finish.",
        allergens: { contains: "Milk", mayContain: "Traces of nuts" },
      },
      {
        name: "Mini Nordica",
        slug: "mini-nordica",
        shortDescription:
          "A Nordic-inspired individual dessert with a light, mousse-style texture, finished in our signature designer presentation.",
        allergens: {
          contains: "Milk",
          mayContain: "Egg, soya, nuts (cross-contamination risk)",
        },
      },
      {
        name: "Monte De Mint",
        slug: "monte-de-mint",
        shortDescription:
          "A mint and dark chocolate dessert layered with a rich cocoa filling, offering a classic mint-chocolate pairing in individual portion form.",
        keyIngredients: ["Mint", "Dark Chocolate", "Cocoa", "Cream"],
        allergens: { contains: "Milk, egg, soya, nuts" },
      },
      {
        name: "Pistachio Drop",
        slug: "pistachio-drop",
        shortDescription:
          "A pistachio dessert layered with cream and white chocolate, finished with a light, individually portioned presentation.",
        keyIngredients: ["Pistachio", "Cream", "White Chocolate"],
      },
      {
        name: "Rocky",
        slug: "rocky",
        shortDescription:
          "A rocky road-style dessert combining chocolate, biscuit and nuts in a layered, individually portioned format.",
        keyIngredients: ["Chocolate", "Marshmallow", "Biscuit", "Nuts"],
        allergens: { contains: "Milk, soya, gluten, egg, nuts" },
      },
    ],
  },
  {
    name: "Exotic Fruits",
    slug: "exotic-fruits",
    items: [
      {
        name: "Coco Choco",
        slug: "coco-choco",
        shortDescription:
          "A coconut and chocolate dessert with a light, creamy filling, finished in an individually portioned presentation.",
        keyIngredients: ["Coconut", "Chocolate", "Cream"],
        allergens: { contains: "Milk, soya" },
      },
      {
        name: "Lemon Delight",
        slug: "lemon-delight",
        shortDescription:
          "A refreshing lemon dessert made with lemon juice, glucose and coconut oil, finished with a smooth, chilled texture.",
        keyIngredients: ["Lemon Juice", "Sugar", "Glucose", "Coconut Oil"],
        allergens: {
          contains:
            "Water, sugar, lemon juice, glucose, milk powder, coconut oil",
          mayContain: "Milk",
        },
      },
      {
        name: "Orange Delight",
        slug: "orange-delight",
        shortDescription:
          "A refreshing orange sorbet-style dessert, made with orange and a light sugar syrup, finished with a smooth, chilled texture.",
        keyIngredients: ["Orange", "Sugar", "Glucose"],
        allergens: { mayContain: "Traces via cross-contamination" },
      },
      {
        name: "Pineapple Paradise",
        slug: "pineapple-paradise",
        shortDescription:
          "A pineapple-based dessert with a light sugar syrup, finished with a smooth, chilled texture for a refreshing fruit course.",
        keyIngredients: ["Pineapple", "Sugar", "Glucose"],
        allergens: { contains: "Milk" },
      },
      {
        name: "Quality Ice Cream",
        slug: "quality-ice-cream",
        shortDescription:
          "A classic milk and cream ice cream, finished with a smooth texture suited to a wide range of dessert menus.",
        keyIngredients: ["Milk", "Cream", "Sugar"],
      },
      {
        name: "Quality Sorbet",
        slug: "quality-sorbet",
        shortDescription:
          "A fruit-based sorbet made with a light sugar syrup, offering a refreshing, dairy-light option for the dessert menu.",
        keyIngredients: ["Fruit", "Sugar", "Water"],
      },
    ],
  },
  {
    name: "Ceramic",
    slug: "ceramic",
    items: [
      {
        name: "Honey Pot",
        slug: "honey-pot",
        shortDescription:
          "A honey-based dessert served in individual ceramic pots, layered with milk and cream for a smooth, comforting finish.",
        keyIngredients: ["Honey", "Milk", "Cream"],
        allergens: { contains: "Milk, egg, nuts" },
      },
      {
        name: "Matka Pot",
        slug: "matka-pot",
        shortDescription:
          "A traditional matka kulfi made with milk, almonds and pistachios, served in individual ceramic pots for a classic finish.",
        keyIngredients: ["Milk", "Almonds", "Pistachios"],
        allergens: {
          contains: "Milk, almonds, pistachios",
          mayContain: "Peanuts, gluten, soya, sulphites",
        },
      },
      {
        name: "Crème Catelena",
        slug: "creme-catelena",
        shortDescription:
          "A Catalan-style custard dessert finished with a caramelised sugar top, offering a classic contrast of smooth cream and crisp caramel.",
        keyIngredients: ["Custard", "Milk", "Caramelised Sugar"],
      },
      {
        name: "Royal Kulfi",
        slug: "royal-kulfi",
        shortDescription:
          "A traditional milk and cream kulfi, frozen in individual portions for a classic South Asian dessert course.",
        keyIngredients: ["Milk", "Cream", "Sugar"],
      },
      {
        name: "Copa Sea Salt",
        slug: "copa-sea-salt",
        shortDescription:
          "A salted caramel dessert layered with cream in an individual glass, balancing sweet caramel with a hint of sea salt.",
        keyIngredients: ["Sea Salt", "Caramel", "Cream"],
        allergens: { contains: "Milk, egg, soya, nuts, peanuts" },
      },
    ],
  },
  {
    name: "Glass Range",
    slug: "glass-range",
    items: [
      {
        name: "Berrichee",
        slug: "berrichee",
        shortDescription:
          "A mixed berry and cream cheese dessert with a biscuit base, layered in an individual glass presentation.",
        keyIngredients: ["Mixed Berries", "Cream Cheese", "Biscuit"],
        allergens: { contains: "Milk, egg, nuts" },
      },
      {
        name: "Cookies & Cream",
        slug: "cookies-and-cream",
        shortDescription:
          "A cookies and cream dessert layered with milk chocolate, finished in an individual glass for a classic combination.",
        keyIngredients: ["Cookies", "Cream", "Milk Chocolate"],
        allergens: { contains: "Milk, gluten", mayContain: "Traces of egg" },
      },
      {
        name: "Copa Tiramisu",
        slug: "copa-tiramisu",
        shortDescription:
          "A classic tiramisu made with mascarpone, coffee and cocoa over a sponge biscuit base, served in an individual glass.",
        keyIngredients: ["Mascarpone", "Coffee", "Cocoa", "Sponge Biscuit"],
        allergens: {
          contains: "Milk, egg, wheat/gluten",
          mayContain: "Traces of nuts",
        },
      },
      {
        name: "Fiorcaramel",
        slug: "fiorcaramel",
        shortDescription:
          "A caramel dessert with a smooth, creamy layer, served in an individual glass for an elegant finish.",
        keyIngredients: ["Caramel", "Cream", "Milk"],
      },
      {
        name: "Fiorentina",
        slug: "fiorentina",
        shortDescription:
          "A pistachio and caramel dessert layered with cream, served in an individual glass for a classic combination.",
        keyIngredients: ["Pistachio", "Caramel", "Cream"],
        allergens: {
          contains: "Milk, eggs, gluten/wheat, soya, pistachios (tree nuts)",
        },
      },
      {
        name: "Limoncello",
        slug: "limoncello",
        shortDescription:
          "A lemon-flavoured dessert layered with cream over a biscuit base, served in an individual glass for a refreshing finish.",
        keyIngredients: ["Lemon", "Cream", "Biscuit"],
        allergens: {
          contains: "Milk, soya, gluten, egg",
          mayContain: "Traces of nuts",
        },
      },
      {
        name: "Mango Delice Cup",
        slug: "mango-delice-cup",
        shortDescription:
          "A mango dessert layered with cream and a hint of nuts, served in an individual cup for a fruit-forward finish.",
        keyIngredients: ["Mango", "Cream", "Nuts"],
        allergens: { contains: "Nuts", mayContain: "Milk" },
      },
      {
        name: "Mango Magic",
        slug: "mango-magic",
        shortDescription:
          "A mango and cream dessert with a light, smooth texture, served in an individual glass presentation.",
        keyIngredients: ["Mango", "Cream", "Milk"],
        allergens: { contains: "Milk", mayContain: "Traces of nuts" },
      },
      {
        name: "Piñacolada",
        slug: "pinacolada",
        shortDescription:
          "A pineapple and coconut dessert layered with cream, served in an individual glass in the style of the classic combination.",
        keyIngredients: ["Pineapple", "Coconut", "Cream"],
        allergens: { contains: "Milk" },
      },
      {
        name: "Pistachio Serenata",
        slug: "pistachio-serenata",
        shortDescription:
          "A pistachio dessert layered with cream over a milk-based base, served in an individual glass for a classic finish.",
        keyIngredients: ["Pistachio", "Cream", "Milk"],
        allergens: {
          contains: "Milk, egg, soya, gluten, pistachios",
          mayContain: "Traces of nuts",
        },
      },
      {
        name: "The Ambassador",
        slug: "the-ambassador",
        shortDescription:
          "A hazelnut and almond dessert with a layered cream filling, served in an individual glass for an elegant finish.",
        keyIngredients: ["Hazelnut", "Almond", "Cream"],
        allergens: {
          contains: "Milk, soya, hazelnuts, wheat/gluten, almond",
          mayContain: "Peanuts, sulphites",
        },
      },
    ],
  },
  {
    name: "Premium Cakes",
    slug: "premium-cakes",
    items: [
      {
        name: "Berry Bavarege",
        slug: "berry-bavarege",
        shortDescription:
          "A Bavarian-style cream dessert layered with mixed berries over a light sponge base, finished as an individual portion cake.",
        keyIngredients: ["Mixed Berries", "Bavarian Cream", "Sponge"],
      },
      {
        name: "Double Decker",
        slug: "double-decker",
        shortDescription:
          "A two-tiered layered cake finished with a smooth cream filling, presented as an individual portion from our premium cake range.",
      },
      {
        name: "Pistachio Cloud",
        slug: "pistachio-cloud",
        shortDescription:
          "A pistachio dessert with a light, mousse-style texture over a soft sponge base, presented as an individual portion cake.",
        keyIngredients: ["Pistachio", "Cream", "Sponge"],
      },
      {
        name: "Toffee Tennessee",
        slug: "toffee-tennessee",
        shortDescription:
          "A toffee and caramel dessert with a rich, smooth filling, presented as an individual portion from our premium cake range.",
        keyIngredients: ["Toffee", "Caramel", "Cream"],
      },
    ],
  },
  {
    name: "Hand Made Cakes",
    slug: "hand-made-cakes",
    items: [
      {
        name: "Banana Caramel Cheesecake",
        slug: "banana-caramel-cheesecake",
        shortDescription:
          "Creamy banana cheesecake on a biscuit crumb base, layered with banana and finished with a rich caramel drizzle.",
        keyIngredients: ["Banana", "Cream Cheese", "Biscuit Crumb", "Caramel"],
      },
      {
        name: "Malteaser Cheesecake",
        slug: "malteaser-cheesecake",
        shortDescription:
          "A malted chocolate cheesecake over a biscuit base, finished with a creamy filling for a classic malt-chocolate pairing.",
        keyIngredients: ["Malted Chocolate", "Cream Cheese", "Biscuit Base"],
        allergens: {
          contains: "Milk, wheat/gluten, egg, soya",
          mayContain: "Peanuts, nuts, sulphites",
        },
      },
    ],
  },
  {
    name: "Luxury Mini Desserts",
    slug: "luxury-mini-desserts",
    items: [
      {
        name: "Black Forest Cube",
        slug: "black-forest-cube",
        shortDescription:
          "A Black Forest-style mini dessert layering chocolate sponge with cherry and cream, finished as an individual bite-sized portion.",
        keyIngredients: ["Chocolate Sponge", "Cherry", "Cream"],
      },
      {
        name: "Blueberry Custard Cube",
        slug: "blueberry-custard-cube",
        shortDescription:
          "A blueberry and custard mini dessert over a light sponge base, finished as an individual bite-sized portion.",
        keyIngredients: ["Blueberry", "Custard", "Sponge"],
      },
      {
        name: "Carrot Cube",
        slug: "carrot-cube",
        shortDescription:
          "A spiced carrot cake mini dessert finished with a cream cheese layer, presented as an individual bite-sized portion.",
        keyIngredients: ["Carrot", "Cream Cheese", "Spiced Sponge"],
      },
      {
        name: "Chocolate Brownie Cube",
        slug: "chocolate-brownie-cube",
        shortDescription:
          "A rich chocolate brownie mini dessert with a dense cocoa base, finished as an individual bite-sized portion.",
        keyIngredients: ["Chocolate", "Brownie", "Cocoa"],
      },
      {
        name: "Chocolate Truffle Cube",
        slug: "chocolate-truffle-cube",
        shortDescription:
          "A dark chocolate truffle mini dessert with a smooth cocoa cream filling, finished as an individual bite-sized portion.",
        keyIngredients: ["Dark Chocolate", "Cocoa", "Cream"],
      },
      {
        name: "Lemon Cheesecake Cube",
        slug: "lemon-cheesecake-cube",
        shortDescription:
          "A lemon cheesecake mini dessert over a biscuit base, finished as an individual bite-sized portion with a light, tangy filling.",
        keyIngredients: ["Lemon", "Cream Cheese", "Biscuit Base"],
      },
      {
        name: "Mango Cube",
        slug: "mango-cube",
        shortDescription:
          "A mango cream mini dessert over a light sponge base, finished as an individual bite-sized portion.",
        keyIngredients: ["Mango", "Cream", "Sponge"],
      },
      {
        name: "Strawberry Cheesecake Cube",
        slug: "strawberry-cheesecake-cube",
        shortDescription:
          "A strawberry cheesecake mini dessert over a biscuit base, finished as an individual bite-sized portion with a light, fruity filling.",
        keyIngredients: ["Strawberry", "Cream Cheese", "Biscuit Base"],
      },
      {
        name: "Tiramasu Cube",
        slug: "tiramasu-cube",
        shortDescription:
          "A classic tiramisu mini dessert made with mascarpone, coffee and cocoa, finished as an individual bite-sized portion.",
        keyIngredients: ["Mascarpone", "Coffee", "Cocoa"],
      },
      {
        name: "White Chocolate Raspberry Cube",
        slug: "white-chocolate-raspberry-cube",
        shortDescription:
          "A white chocolate and raspberry mini dessert with a light, creamy filling, finished as an individual bite-sized portion.",
        keyIngredients: ["White Chocolate", "Raspberry", "Cream"],
      },
    ],
  },
  {
    name: "After Dinner Chocolates",
    slug: "after-dinner-chocolates",
    items: [],
  },
  {
    name: "Kids Selection",
    slug: "kids-selection",
    items: [
      {
        name: "Barry",
        slug: "barry",
        shortDescription:
          "A children's frozen treat from our Kids Selection range, designed as a fun, individually portioned dessert for younger guests.",
        allergens: { contains: "Milk, egg, nuts" },
      },
      {
        name: "Friky",
        slug: "friky",
        shortDescription:
          "A playful frozen treat from our Kids Selection range, presented as an individually portioned dessert for younger guests.",
        allergens: { contains: "Milk" },
      },
      {
        name: "Kuaky",
        slug: "kuaky",
        shortDescription:
          "A fun frozen treat from our Kids Selection range, designed as an individually portioned dessert for younger guests.",
        allergens: {
          contains: "Milk",
          mayContain: "Egg, gluten (cross-contamination risk)",
        },
      },
      {
        name: "Leony",
        slug: "leony",
        shortDescription:
          "A children's frozen treat from our Kids Selection range, presented as a playful, individually portioned dessert for younger guests.",
        allergens: { contains: "Milk, egg, nuts" },
      },
      {
        name: "Punky",
        slug: "punky",
        shortDescription:
          "A playful frozen treat from our Kids Selection range, designed as an individually portioned dessert for younger guests.",
        allergens: { contains: "Milk" },
      },
      {
        name: "Vacky 1",
        slug: "vacky-1",
        shortDescription:
          "A frozen treat from our Kids Selection range, presented as a fun, individually portioned dessert for younger guests.",
        allergens: { contains: "Milk, egg, nuts" },
      },
      {
        name: "Vacky 2",
        slug: "vacky-2",
        shortDescription:
          "A second variation from our Kids Selection range, presented as a fun, individually portioned dessert for younger guests, distinct from Vacky 1.",
        allergens: { contains: "Milk, egg, nuts" },
      },
    ],
  },
];
