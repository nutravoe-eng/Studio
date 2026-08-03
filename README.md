# Nutravoe Sanity Studio

CMS schemas and Studio config for Nutravoe (`projectId: jji9n3ik`, dataset: `production`).

Use this repo to edit content models (bowls, subscription plans, settings) and deploy Studio.

## Prerequisites

- Node.js 20+ (22 LTS recommended)
- Access to the Nutravoe Sanity project (invite in [manage.sanity.io](https://www.sanity.io/manage))
- GitHub access to this repo

## Setup

```bash
git clone git@github.com:nutravoe-eng/Studio.git
cd Studio
npm install
npx sanity login
npm run dev
```

Studio opens at [http://localhost:3333](http://localhost:3333).

Optional write token for seed/migration scripts only:

```bash
cp .env.example .env
# Set SANITY_TOKEN to a token with Editor (or higher) permissions
```

Never commit `.env`.

## Common workflows

### Edit schemas

1. Change files under `sanity/` (e.g. `bowl.ts`, `subscriptionPlan.ts`)
2. Register new document types in `sanity/schema.ts`
3. Run `npm run dev` and confirm the Studio UI looks right
4. Deploy so production Studio matches:

```bash
npm run deploy
```

Schema changes take effect for Studio after deploy. Existing documents may need a one-off migration if field names change.

### Deploy Studio (hosted)

```bash
npm run deploy
```

Uses `sanity.cli.ts` (`appId` already configured). You must be logged in with project access.

### Migrate subscription plan pricing fields

After renaming near/far zone prices to global standard/premium:

```bash
npm run migrate:subscription-pricing
```

Requires `sanity login` (uses the Sanity CLI client).

### Seed data (optional)

`seed-sanity.mjs` / `seed-plans.mjs` are one-off helpers. They need:

- `SANITY_TOKEN` in `.env`
- Bowl images from the Website repo at `../website/public/` (sibling checkout), or edit image paths first

```bash
# from a parent folder that contains both Studio and Website clones:
#   parent/
#     Studio/
#     Website/   (or website/)
npm run seed:bowls
npm run seed:plans
```

## Project layout

```
sanity/                 # Schema definitions
  bowl.ts
  subscriptionPlan.ts
  settings.ts
  schema.ts             # Registers all types
sanity.config.ts        # Studio app config
sanity.cli.ts           # CLI / deploy config
scripts/                # Data migrations
seed-*.mjs              # Optional seed scripts
```

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Local Studio |
| `npm run build` | Production build (sanity build) |
| `npm run deploy` | Deploy hosted Studio |
| `npm run migrate:subscription-pricing` | Migrate plan price fields |
| `npm run seed:bowls` | Seed bowls (needs token + images) |
| `npm run seed:plans` | Seed subscription plans |

## Notes

- Website (`nutravoe-eng/Website`) reads this content via the Sanity API; it does not import this repo at runtime.
- After schema changes that the website depends on, coordinate with a Website deploy if new fields are required in code.
