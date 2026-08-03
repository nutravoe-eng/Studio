import { createClient } from "@sanity/client";
import { createReadStream } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const client = createClient({
  projectId: "jji9n3ik",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const bowls = [
  {
    name: "Tropical Mango Oatmeal",
    slug: "tropical-mango-oatmeal",
    tagline: "Bright, fruity, refreshing",
    description: "Fresh mango, pomegranate, grated coconut, black grapes, yogurt oats, granola, almonds, walnuts, and seed mix.",
    price: 299,
    imagePath: "../website/public/tropical-mango.png",
    tags: ["bestseller"],
    displayOrder: 1,
    ingredients: [
      "Fresh mango chunks, pomegranate",
      "Grated coconut, black grapes",
      "Yoghurt-based oats",
      "Granola, almonds, walnuts & seed mix",
    ],
    nutrition: { calories: 510, protein: 20, fibre: 11 },
    customizableIngredients: [
      { id: "oats", name: "Oats", extraCost: 20, isBase: true },
      { id: "mango", name: "Mango", extraCost: 30, isBase: false },
      { id: "pomegranate", name: "Pomegranate", extraCost: 30, isBase: false },
      { id: "grated-coconut", name: "Grated Coconut", extraCost: 30, isBase: false },
      { id: "black-grapes", name: "Black Grapes", extraCost: 30, isBase: false },
      { id: "granola", name: "Granola", extraCost: 30, isBase: false },
      { id: "almonds", name: "Almonds", extraCost: 30, isBase: false },
      { id: "walnuts", name: "Walnuts", extraCost: 30, isBase: false },
      { id: "seed-mix", name: "Seed Mix", extraCost: 30, isBase: false },
    ],
  },
  {
    name: "Very Fruity Oatmeal",
    slug: "very-fruity-oatmeal",
    tagline: "Vibrant, colorful, nutrient-packed",
    description: "Mango, strawberry, banana, blueberry, pomegranate, yogurt oats, granola, nuts and seeds.",
    price: 299,
    imagePath: "../website/public/very-fruity.png",
    tags: ["high-protein"],
    displayOrder: 2,
    ingredients: [
      "Mango, strawberry, banana",
      "Blueberry, pomegranate",
      "Yoghurt-based oats",
      "Granola, nuts & seeds",
    ],
    nutrition: { calories: 480, protein: 19, fibre: 12 },
    customizableIngredients: [
      { id: "oats", name: "Oats", extraCost: 20, isBase: true },
      { id: "mango", name: "Mango", extraCost: 30, isBase: false },
      { id: "strawberry", name: "Strawberry", extraCost: 30, isBase: false },
      { id: "banana", name: "Banana", extraCost: 30, isBase: false },
      { id: "blueberry", name: "Blueberry", extraCost: 30, isBase: false },
      { id: "pomegranate", name: "Pomegranate", extraCost: 30, isBase: false },
      { id: "granola", name: "Granola", extraCost: 30, isBase: false },
      { id: "mixed-nuts", name: "Mixed Nuts", extraCost: 30, isBase: false },
      { id: "seeds", name: "Seeds", extraCost: 30, isBase: false },
    ],
  },
  {
    name: "Very Berry Oatmeal",
    slug: "very-berry-oatmeal",
    tagline: "Fresh, slightly indulgent, antioxidant-rich",
    description: "Strawberry, mulberry, blueberry, yogurt oats, granola, nuts and seeds, honey drizzle.",
    price: 299,
    imagePath: "../website/public/very-berry-bowl.png",
    tags: ["seasonal"],
    displayOrder: 3,
    ingredients: [
      "Strawberry, mulberry, blueberry",
      "Yoghurt-based oats",
      "Granola, nuts & seeds",
      "Honey drizzle",
    ],
    nutrition: { calories: 470, protein: 20, fibre: 11 },
    customizableIngredients: [
      { id: "oats", name: "Oats", extraCost: 20, isBase: true },
      { id: "strawberry", name: "Strawberry", extraCost: 30, isBase: false },
      { id: "mulberry", name: "Mulberry", extraCost: 30, isBase: false },
      { id: "blueberry", name: "Blueberry", extraCost: 30, isBase: false },
      { id: "granola", name: "Granola", extraCost: 30, isBase: false },
      { id: "mixed-nuts", name: "Mixed Nuts", extraCost: 30, isBase: false },
      { id: "seeds", name: "Seeds", extraCost: 30, isBase: false },
      { id: "honey", name: "Honey Drizzle", extraCost: 20, isBase: false },
    ],
  },
  {
    name: "Banana Peanut Butter Oatmeal",
    slug: "banana-peanut-butter-oatmeal",
    tagline: "Comforting, filling, protein-rich",
    description: "Banana, natural peanut butter, pomegranate, yogurt oats, granola, nuts and seeds.",
    price: 299,
    imagePath: "../website/public/banana-peanut-butter-bowl.png",
    tags: ["high-protein"],
    displayOrder: 4,
    ingredients: [
      "Banana, natural peanut butter",
      "Pomegranate",
      "Yoghurt-based oats",
      "Granola, nuts & seeds",
    ],
    nutrition: { calories: 530, protein: 23, fibre: 13 },
    customizableIngredients: [
      { id: "oats", name: "Oats", extraCost: 20, isBase: true },
      { id: "banana", name: "Banana", extraCost: 30, isBase: false },
      { id: "peanut-butter", name: "Peanut Butter", extraCost: 30, isBase: false },
      { id: "pomegranate", name: "Pomegranate", extraCost: 30, isBase: false },
      { id: "granola", name: "Granola", extraCost: 30, isBase: false },
      { id: "mixed-nuts", name: "Mixed Nuts", extraCost: 30, isBase: false },
      { id: "seeds", name: "Seeds", extraCost: 30, isBase: false },
      { id: "cinnamon", name: "Cinnamon Powder", extraCost: 20, isBase: false },
    ],
  },
  {
    name: "Very Nutty Oatmeal",
    slug: "very-nutty-oatmeal",
    tagline: "Rich, crunchy, satisfying",
    description: "Mixed nuts (cashews, almonds, walnuts), seed mix, yogurt oats, dates, pomegranate.",
    price: 299,
    imagePath: "../website/public/very-nutty-bowl.png",
    tags: ["high-protein"],
    displayOrder: 5,
    ingredients: [
      "Mixed nuts (cashews, almonds, walnuts)",
      "Seed mix",
      "Yoghurt-based oats",
      "Dates & pomegranate",
    ],
    nutrition: { calories: 550, protein: 21, fibre: 14 },
    customizableIngredients: [
      { id: "oats", name: "Oats", extraCost: 20, isBase: true },
      { id: "cashews", name: "Cashews", extraCost: 30, isBase: false },
      { id: "almonds", name: "Almonds", extraCost: 30, isBase: false },
      { id: "walnuts", name: "Walnuts", extraCost: 30, isBase: false },
      { id: "seed-mix", name: "Seed Mix", extraCost: 30, isBase: false },
      { id: "dates", name: "Dates", extraCost: 30, isBase: false },
      { id: "pomegranate", name: "Pomegranate", extraCost: 30, isBase: false },
      { id: "cinnamon", name: "Cinnamon Powder", extraCost: 20, isBase: false },
    ],
  },
];

async function uploadImage(imagePath) {
  const fullPath = resolve(__dirname, imagePath);
  const stream = createReadStream(fullPath);
  const asset = await client.assets.upload("image", stream, {
    filename: imagePath.split("/").pop(),
  });
  return asset._id;
}

async function seed() {
  console.log("Seeding Sanity with 5 bowls...\n");

  for (const bowl of bowls) {
    process.stdout.write(`Uploading image for "${bowl.name}"... `);
    const imageAssetId = await uploadImage(bowl.imagePath);
    console.log("done");

    process.stdout.write(`Creating document for "${bowl.name}"... `);
    await client.createOrReplace({
      _type: "bowl",
      _id: `bowl-${bowl.slug}`,
      name: bowl.name,
      slug: { _type: "slug", current: bowl.slug },
      tagline: bowl.tagline,
      description: bowl.description,
      price: bowl.price,
      image: { _type: "image", asset: { _type: "reference", _ref: imageAssetId } },
      tags: bowl.tags,
      available: true,
      displayOrder: bowl.displayOrder,
      ingredients: bowl.ingredients,
      nutrition: bowl.nutrition,
      customizableIngredients: bowl.customizableIngredients.map((ing) => ({
        _type: "object",
        _key: ing.id,
        id: ing.id,
        name: ing.name,
        extraCost: ing.extraCost,
        isBase: ing.isBase,
      })),
    });
    console.log("done");
  }

  console.log("\nAll 5 bowls seeded successfully!");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
