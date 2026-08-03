export const bowl = {
  name: "bowl",
  title: "Bowl",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      description: "Which menu section this bowl appears under",
    },
    {
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "One evocative line",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    },
    {
      name: "price",
      title: "Price (INR)",
      type: "number",
      validation: (Rule: any) => Rule.required().min(0),
    },
    {
      name: "subscriptionPriceTier",
      title: "Subscription price tier",
      type: "string",
      options: {
        list: [
          { title: "Standard (e.g. ₹299 class — uses plan standard per-bowl price)", value: "standard" },
          { title: "Premium (e.g. ₹399 class — uses plan premium per-bowl price)", value: "premium" },
        ],
        layout: "radio",
      },
      initialValue: "standard",
      description:
        "Which subscription per-bowl rate applies for spread plans and wallet debits. Mark premium bowls (higher menu price) as Premium.",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Bestseller", value: "bestseller" },
          { title: "High Protein", value: "high-protein" },
          { title: "Seasonal", value: "seasonal" },
          { title: "Vegan Friendly", value: "vegan-friendly" },
        ],
      },
    },
    {
      name: "available",
      title: "Show on Menu",
      type: "boolean",
      initialValue: true,
      description:
        "Uncheck to permanently hide this bowl from the menu. Use for retired or seasonal bowls. Hidden bowls cannot be seen or ordered.",
    },
    {
      name: "inStock",
      title: "In Stock",
      type: "boolean",
      initialValue: true,
      hidden: ({ parent }: { parent?: { available?: boolean } }) => parent?.available === false,
      description:
        "Uncheck to mark this bowl as out of stock. Customers can still see it on the menu, but it will appear greyed out and cannot be added to cart. Re-check when stock is restored.",
    },
    {
      name: "displayOrder",
      title: "Display Order",
      type: "number",
    },
    {
      name: "ingredients",
      title: "Ingredients",
      description: "Display list of ingredients shown on the menu card",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "nutrition",
      title: "Nutrition",
      type: "object",
      fields: [
        { name: "calories", title: "Calories (kcal)", type: "number" },
        { name: "protein", title: "Protein (g)", type: "number" },
        { name: "fibre", title: "Fibre (g)", type: "number" },
      ],
    },
    {
      name: "customizableIngredients",
      title: "Customisable Ingredients",
      description: "Ingredients the customer can remove or add extra of. Set extraCost to 0 if no charge.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "id",
              title: "ID",
              type: "string",
              description: "Unique key, e.g. 'mango' or 'granola' (no spaces)",
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: "name",
              title: "Display Name",
              type: "string",
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: "extraCost",
              title: "Extra Cost (INR)",
              type: "number",
              description: "Charge when customer selects 'Extra'. Set to 0 if free.",
              initialValue: 30,
            },
            {
              name: "isBase",
              title: "Is Base Ingredient?",
              type: "boolean",
              description: "Base ingredients (e.g. yogurt oats) are shown but cannot be removed.",
              initialValue: false,
            },
          ],
          preview: {
            select: { title: "name", subtitle: "extraCost" },
            prepare({ title, subtitle }: any) {
              return { title, subtitle: subtitle ? `+₹${subtitle} for extra` : "no extra charge" };
            },
          },
        },
      ],
    },
  ],
};
