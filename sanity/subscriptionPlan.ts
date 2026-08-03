import { defineField, defineType } from 'sanity';

export const subscriptionPlan = defineType({
  name: 'subscriptionPlan',
  title: 'Subscription Plan',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Plan Name',
      type: 'string',
      description: 'e.g. "3-Bowl / Week", "Daily Plan"',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (Plan ID)',
      type: 'slug',
      description: 'Used as plan_id in DB. e.g. "three-bowl", "five-bowl", "daily"',
      options: { source: 'name' },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'bowlsPerCycle',
      title: 'Bowls Per Billing Cycle',
      type: 'number',
      description: 'Total bowls delivered per billing cycle (e.g. 7 for weekly daily plan)',
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'billingCycle',
      title: 'Billing Cycle',
      type: 'string',
      options: {
        list: [
          { title: 'Weekly', value: 'weekly' },
          { title: 'Monthly', value: 'monthly' },
        ],
        layout: 'radio',
      },
      initialValue: 'weekly',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'pricePerBowl',
      title: 'Price per Bowl — Standard (Global)',
      type: 'number',
      description: 'Subscriber ₹ per bowl for standard bowls (same everywhere; delivery is calculated separately).',
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'pricePerBowlPremium',
      title: 'Price per Bowl — Premium (Global)',
      type: 'number',
      description:
        'Subscriber ₹ per bowl for premium bowls (e.g. ₹399 class). Leave empty to fall back to standard price.',
      validation: Rule => Rule.min(1),
    }),
    defineField({
      name: 'customisationChargePerBowl',
      title: 'Customisation Charge per Bowl (₹)',
      type: 'number',
      description: 'Extra charge per bowl when customer customises ingredients',
      initialValue: 0,
      validation: Rule => Rule.required().min(0),
    }),
    defineField({
      name: 'deliveryStyles',
      title: 'Available Delivery Styles',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Spread across the week', value: 'spread' },
          { title: 'Bulk delivery', value: 'bulk' },
          { title: 'Flexible — Wallet', value: 'flexible' },
        ],
      },
      description: 'Which delivery styles are available for this plan',
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'savingsBadge',
      title: 'Savings Badge',
      type: 'string',
      description: 'Badge text, e.g. "Save 5%", "Best Value"',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Only active plans are shown to customers',
      initialValue: true,
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 99,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrderAsc',
      by: [{ field: 'displayOrder', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'billingCycle',
      active: 'isActive',
    },
    prepare({ title, subtitle, active }) {
      return {
        title: `${active ? '' : '[INACTIVE] '}${title}`,
        subtitle: subtitle ?? '',
      };
    },
  },
});
