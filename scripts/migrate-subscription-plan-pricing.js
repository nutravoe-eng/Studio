/* eslint-disable no-console */
const { getCliClient } = require("sanity/cli");

const client = getCliClient({ apiVersion: "2025-01-01" });

function computeStandardPrice(doc) {
  return (
    doc.pricePerBowl ??
    doc.priceNearPerBowl ??
    doc.priceFarPerBowl ??
    doc.price_per_bowl ??
    null
  );
}

function computePremiumPrice(doc) {
  return (
    doc.pricePerBowlPremium ??
    doc.priceNearPerBowlPremium ??
    doc.priceFarPerBowlPremium ??
    null
  );
}

async function run() {
  const docs = await client.fetch(
    `*[_type == "subscriptionPlan"]{
      _id,
      name,
      pricePerBowl,
      pricePerBowlPremium,
      priceNearPerBowl,
      priceFarPerBowl,
      priceNearPerBowlPremium,
      priceFarPerBowlPremium,
      price_per_bowl
    }`
  );

  if (!docs.length) {
    console.log("No subscriptionPlan documents found.");
    return;
  }

  let updated = 0;
  let skipped = 0;
  const tx = client.transaction();

  for (const doc of docs) {
    const standard = computeStandardPrice(doc);
    const premium = computePremiumPrice(doc);

    if (standard == null) {
      skipped += 1;
      console.warn(
        `Skipping ${doc._id} (${doc.name ?? "Unnamed"}): no standard price available`
      );
      continue;
    }

    const patchOps = {
      set: {
        pricePerBowl: standard,
      },
      unset: [
        "priceNearPerBowl",
        "priceFarPerBowl",
        "priceNearPerBowlPremium",
        "priceFarPerBowlPremium",
      ],
    };

    if (premium != null) {
      patchOps.set.pricePerBowlPremium = premium;
    } else {
      patchOps.unset.push("pricePerBowlPremium");
    }

    tx.patch(doc._id, patchOps);
    updated += 1;
  }

  if (updated > 0) {
    await tx.commit();
  }

  console.log(`Migration complete. Updated: ${updated}, Skipped: ${skipped}`);
}

run().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});

