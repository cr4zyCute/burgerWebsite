# BURGER CRAFT — Premium Burger Restaurant & Visual CMS

A production-grade, full-stack restaurant website and visual content management system built with **React**, **Vite**, **TypeScript**, **Tailwind CSS**, **Turso (libSQL)**, and **Drizzle ORM**.

Designed with authentic mid-century American diner craftsmanship and contemporary culinary editorial direction.

---

## Key Highlights & Design Principles

- **Zero Emojis**: Clean, professional restaurant typography with real SVG icons from Lucide React.
- **Zero Gradients**: Bold, solid color tokens with high-contrast editorial hierarchy:
  - Charcoal (`#171717`)
  - Warm Cream (`#F5F0E6`)
  - Off-White (`#FAF8F3`)
  - Deep Red (`#A82D24`)
  - Mustard Yellow (`#E9B949`)
  - Warm Brown (`#70452D`)
  - Muted Gray (`#77736E`)
- **Typography**: Display headings in *Barlow Condensed ExtraBold*, body text in *DM Sans*, editorial accents in *Fraunces*.
- **Authentic Photography**: Realistic food photography showing 28-day dry-aged beef textures, caramelized lace crusts, and warm restaurant lighting.
- **100% Functional**: Every button, form, filter, stepper, customizer, and admin control performs its intended function.

---

## Core Capabilities

### 1. Customer Website
- **Homepage (14 Managed Sections)**: Announcement bar, hero with live stats, category showcase, signature smash burgers, promotional feature, why choose us pillars, best sellers, custom burger teaser, brand heritage story, customer reviews, restaurant locations, newsletter club, social gallery, and footer.
- **Menu Page**: Filter by categories (Burgers, Chicken, Sides, Combos, Drinks, Sweets), real-time search, dietary tags (Chef's Choice, Vegetarian, Spicy, Gluten-Conscious), and sorting (Popularity, Price, Rating).
- **Product Details Page**: Full-screen photo gallery, ingredient disclosures, allergen warnings, modifier upgrades, and running total price.
- **Interactive 9-Step Burger Builder (`/build-your-burger`)**:
  1. Base (Single, Double, Triple, Plant-Based Beyond)
  2. Sear Style (Crisp Lace, Thick Juicy, Peppercorn)
  3. Artisan Bun (Butter Brioche, Martin's Potato, Pretzel, Lettuce Wrap)
  4. Cheese (Wisconsin Sharp Cheddar, American, Swiss Emmental, Gouda)
  5. Farm Vegetables (Caramelized Onions, Dill Pickles, Jalapeños, Tomatoes, Arugula)
  6. Sauces (Craft Smash Sauce, Bourbon BBQ, Truffle Aioli, Comeback, Chipotle)
  7. Gourmet Extras (Applewood Bacon, Sunny Egg, Sautéed Mushrooms)
  8. Custom Burger Naming & Final Review
  9. Add to Order with live running price calculation
- **Deals & Combos (`/deals`)**: One-click coupon application (`SMASH20`, `FEAST5`) and combo meal deals.
- **Locations (`/locations`)**: Store directory with opening hours, direct phone links, and Google Maps directions.
- **Cart & Slide-in Drawer**: Quantity adjustments, modifiers breakdown, delivery fee economics, and instant coupon verification.
- **Checkout (`/checkout`)**: Courier Delivery vs Curbside Pickup, guest or account details, tip selection, payment methods (Card, Apple Pay, Cash, GCash/Maya), and order generation.
- **Order Tracking (`/orders/:id`)**: Live status tracker (*Confirmed → On Cast Iron → Ready → Completed*), itemized receipt, and printable receipt modal.
- **Customer Account (`/account`)**: Order history with reorder capabilities, saved addresses, and active role switcher for instant admin/customer testing.

---

### 2. Admin Console & Visual CMS (`/admin`)

- **Visual Homepage CMS (`/admin/homepage-editor`) — Critical Feature**:
  - **Shared Component Rendering**: Both the live website and visual editor render the exact same React components and design tokens.
  - **Left Dock**: Reorder sections (Move Up / Down), toggle visibility (Show / Hide), duplicate sections, delete, and add new sections.
  - **Center Canvas**: Interactive live preview supporting **Desktop (100%)**, **Tablet (768px)**, and **Mobile (375px)** viewport frames with click-to-edit highlighting.
  - **Right Inspector**: Contextual editing for headlines, descriptions, CTAs, solid color palettes, and photo selection.
  - **Top Toolbar**: Undo, Redo, Save Draft, Discard, and **Publish to Live** with instantaneous customer website updates.
- **Admin Analytics Dashboard (`/admin`)**:
  - Real calculations for Completed Revenue, Total Orders, Average Order Value (AOV), and Active Kitchen Queue.
  - Interactive Recharts: Daily Order Revenue Bar Chart, Sales by Category Pie Chart.
  - Date filtering (*Today, Last 7 Days, Last 30 Days, All Time*).
  - One-click **Export to CSV**.
- **Kitchen & Courier Orders Management (`/admin/orders`)**:
  - Search by order number, customer name, or email.
  - Filter by status (*Pending, Confirmed, Preparing, Ready, Completed, Refunded*).
  - Inspect Ticket modal with interactive status progression workflow.
  - Permitted refunds with recorded reason notes.
- **Product Catalog (`/admin/products`)**:
  - CRUD operations for menu items.
  - One-click *86'd / In Stock* availability toggling.
  - Homepage featured spotlight toggling.
- **Media Library (`/admin/media`)**:
  - Upload and catalog photography assets with metadata and alt text.
  - Category filtering and search.
  - **Safe Deletion Protection**: Assets actively used on the website cannot be deleted until replaced.
- **Promotions & Coupons (`/admin/promotions`)**: Create promo codes with percentage or fixed discounts, minimum cart requirements, and usage limits.
- **Reviews Moderation (`/admin/reviews`)**: Approve or reject customer reviews and toggle homepage featured status.
- **Restaurant Configuration (`/admin/settings`)**: Restaurant branding, store hours, address, phone, tax rate, and delivery fee thresholds.
- **Audit Logs (`/admin/audit-logs`)**: Immutable event logs tracking staff administrative actions, timestamps, and IP addresses.

---

## Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite 7, TypeScript, Tailwind CSS v4, React Router 7 |
| **State Management** | Zustand with `persist` middleware, TanStack Query |
| **Forms & Validation** | React Hook Form, Zod |
| **Data Visualization** | Recharts (ResponsiveContainer, BarChart, PieChart) |
| **Icons & Motion** | Lucide React, Framer Motion |
| **Database** | Turso (libSQL), Drizzle ORM |
| **Serverless API** | Vercel Serverless Functions (`api/`) |
| **Authentication** | Role-based authorization (*Super Admin, Order Manager, Customer*) |

---

## Local Development Instructions

### 1. Clone & Install Dependencies
```sh
npm install
```

### 2. Run the Development Server
```sh
npm run dev
```
The application will boot at `http://localhost:5173`.

### 3. Build & Typecheck
```sh
npm run typecheck
npm run build
npm run preview
```

---

## Database Configuration (Turso & Drizzle)

1. Create a free database on [Turso](https://turso.tech):
   ```sh
   turso db create burger-craft
   turso db tokens create burger-craft
   ```
2. Copy `.env.example` to `.env` and fill in your Turso credentials:
   ```env
   TURSO_DATABASE_URL=libsql://your-db-name.turso.io
   TURSO_AUTH_TOKEN=your-token
   ```
3. Run the database seed script:
   ```sh
   npx tsx src/db/seed.ts
   ```

*Note: In local development mode without remote database keys, the application uses local state persistence, ensuring all customer ordering and visual CMS features work out-of-the-box.*

---

## Vercel Deployment

1. Push your repository to GitHub.
2. Import the project into [Vercel](https://vercel.com).
3. Set the Framework Preset to **Vite**.
4. Add your environment variables in the Vercel Project Settings:
   - `TURSO_DATABASE_URL`
   - `TURSO_AUTH_TOKEN`
   - `BETTER_AUTH_SECRET`
   - `BLOB_READ_WRITE_TOKEN`
5. Deploy. Both the frontend and serverless API handlers in `api/` will be provisioned automatically.

---

## Demo Accounts

For immediate testing, use the built-in role switcher on `/account` or log in on `/login`:
- **Super Administrator**: `admin@burgercraft.com` (Full access to Visual CMS, Analytics, Catalog, Orders)
- **Order Manager**: `manager@burgercraft.com` (Kitchen dispatch & ticket workflow)
- **Customer**: `jordan.miller@example.com` (Guest ordering, order tracking, custom burger builder)
