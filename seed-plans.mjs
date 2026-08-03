import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env manually
try {
  const env = readFileSync(resolve(__dirname, ".env"), "utf8");
  for (const line of env.split("\n")) {
    const [key, ...rest] = line.split("=");
    if (key && rest.length) process.env[key.trim()] = rest.join("=").trim();
  }
} catch {}

const client = createClient({
  projectId: "jji9n3ik",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const plans = [
  {
    _id: "subscription-plan-three-bowl",
    name: "3-Bowl / Week",
    slug: "three-bowl",
    bowlsPerCycle: 3,
    billingCycle: "weekly",
    priceNearPerBowl: 284,
    priceFarPerBowl: 299,
    customisationChargePerBowl: 30,
    deliveryStyles: ["spread", "bulk", "flexible"],
    savingsBadge: "Save 5%",
    isActive: true,
    displayOrder: 1,
  },
  {
    _id: "subscription-plan-five-bowl",
    name: "5-Bowl / Week",
    slug: "five-bowl",
    bowlsPerCycle: 5,
    billingCycle: "weekly",
    priceNearPerBowl: 269,
    priceFarPerBowl: 284,
    customisationChargePerBowl: 30,
    deliveryStyles: ["spread", "bulk", "flexible"],
    savingsBadge: "Save 10%",
    isActive: true,
    displayOrder: 2,
  },
  {
    _id: "subscription-plan-daily",
    name: "Daily Plan",
    slug: "daily",
    bowlsPerCycle: 7,
    billingCycle: "weekly",
    priceNearPerBowl: 257,
    priceFarPerBowl: 271,
    customisationChargePerBowl: 30,
    deliveryStyles: ["spread", "bulk", "flexible"],
    savingsBadge: "Best Value",
    isActive: true,
    displayOrder: 3,
  },
];

async function seed() {
  console.log("Seeding 3 subscription plans...\n");
  for (const plan of plans) {
    process.stdout.write(`Creating "${plan.name}"... `);
    await client.createOrReplace({
      _type: "subscriptionPlan",
      _id: plan._id,
      name: plan.name,
      slug: { _type: "slug", current: plan.slug },
      bowlsPerCycle: plan.bowlsPerCycle,
      billingCycle: plan.billingCycle,
      priceNearPerBowl: plan.priceNearPerBowl,
      priceFarPerBowl: plan.priceFarPerBowl,
      customisationChargePerBowl: plan.customisationChargePerBowl,
      deliveryStyles: plan.deliveryStyles,
      savingsBadge: plan.savingsBadge,
      isActive: plan.isActive,
      displayOrder: plan.displayOrder,
    });
    console.log("done");
  }
  console.log("\nAll 3 subscription plans seeded!");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
