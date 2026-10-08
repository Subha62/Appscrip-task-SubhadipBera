# Appscrip Product Listing — Full-Stack E-Commerce Application

A full-stack product listing application built as part of the Appscrip Full-Stack Engineer take-home assignment.

The application provides a responsive e-commerce product listing experience with server-side rendering, search, filtering, sorting, pagination, REST APIs, PostgreSQL persistence, and production deployment.

## Live Application

- **Frontend:** https://appscrip-task-subhadip-bera.vercel.app
- **Backend API:** https://appscrip-product-api.onrender.com
- **GitHub Repository:** https://github.com/Subha62/Appscrip-task-SubhadipBera

---

## Features

### Product Listing

- Responsive product grid
- Product images, names, prices, ratings and categories
- Server-side rendered initial product listing
- Pagination
- Loading state
- Error state
- Empty state

### Search

Users can search products using the `q` query parameter.

Example:

`/products?q=shirt`

### Filtering

Products can be filtered by:

- Category
- Minimum price
- Maximum price

Examples:

`/products?category=Shoes`

`/products?minPrice=50&maxPrice=80`

### Sorting

Supported sorting options include:

- Recommended
- Price: Low to High
- Price: High to Low
- Rating
- Newest

Example:

`/products?sort=price-asc`

### Responsive Design

The UI is optimized for:

- Desktop
- Tablet
- Mobile

The mobile layout includes dedicated filter and sorting controls.

---

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- App Router
- CSS Modules
- Next Image

### Backend

- Node.js
- Express.js
- TypeScript
- Zod validation
- Prisma ORM

### Database

- PostgreSQL
- Neon

### Deployment

- Vercel — Frontend
- Render — Backend
- Neon — PostgreSQL database

---

## Why These Technologies?

### Next.js

Next.js was used because the assignment requires server-side rendering and the App Router provides a clean way to build server-rendered pages.

### TypeScript

TypeScript provides type safety across the frontend and backend and makes the application easier to maintain.

### Express.js

Express provides a lightweight REST API layer for handling product, category, filtering, sorting and pagination requests.

### Prisma

Prisma provides type-safe database access and makes database queries and migrations easier to manage.

### PostgreSQL

PostgreSQL was selected as a relational database because products and categories have structured relationships and the assignment recommends PostgreSQL.

### Neon

Neon provides a hosted PostgreSQL database suitable for production deployment.

---

## Project Structure

```text
Appscrip-task-SubhadipBera/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── lib/
│   │   └── server.ts
│   │
│   ├── prisma/
│   │   ├── migrations/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   │
│   ├── generated/
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   └── products/
│   │   ├── components/
│   │   │   ├── FilterSidebar/
│   │   │   ├── Footer/
│   │   │   ├── Header/
│   │   │   ├── Pagination/
│   │   │   ├── ProductCard/
│   │   │   ├── ProductGrid/
│   │   │   ├── ProductHero/
│   │   │   ├── ProductToolbar/
│   │   │   └── SearchBar/
│   │   ├── lib/
│   │   └── types/
│   │
│   ├── package.json
│   └── next.config.ts
│
├── .gitignore
└── README.md
```

---

## Architecture

The application follows a frontend → backend API → database architecture.

```text
User
  │
  ▼
Next.js Frontend
  │
  │ Server-side fetch
  ▼
Express REST API
  │
  ▼
Prisma ORM
  │
  ▼
PostgreSQL / Neon
```

### Frontend

Next.js receives URL query parameters and fetches the required products from the backend API.

### Backend

Express handles API requests, validates query parameters and performs database operations through Prisma.

### Database

PostgreSQL stores:

- Categories
- Products
- Product images
- Prices
- Ratings
- Stock
- Timestamps

---

## Database Schema

### Category

```text
id
name
```

### Product

```text
id
title
slug
description
price
categoryId
rating
stock
createdAt
updatedAt
```

### ProductImage

```text
id
url
altText
productId
```

Relationships:

```text
Category 1 ──────── * Product

Product 1 ──────── * ProductImage
```

Indexes are included for frequently queried fields such as:

- `categoryId`
- `price`

---

## API Documentation

### Base URL

```text
https://appscrip-product-api.onrender.com
```

### Health Check

```http
GET /health
```

Example response:

```json
{
  "status": "ok"
}
```

### Get Products

```http
GET /products
```

Supported query parameters:

| Parameter | Description |
|---|---|
| `page` | Page number |
| `limit` | Number of products per page |
| `category` | Filter by category |
| `minPrice` | Minimum product price |
| `maxPrice` | Maximum product price |
| `sort` | Sorting option |
| `q` | Product search |

Example:

```text
GET /products?page=1&limit=6
```

Example with filters:

```text
GET /products?category=Shoes&sort=price-asc
```

Example search:

```text
GET /products?q=shirt
```

### Get Product by ID

```http
GET /products/:id
```

Example:

```text
GET /products/1
```

### Get Categories

```http
GET /categories
```

### API Validation

The backend validates query parameters using Zod.

Invalid requests return consistent error responses.

Example:

```json
{
  "error": {
    "code": "INVALID_QUERY",
    "message": "Invalid query parameters"
  }
}
```

Invalid price ranges are also rejected.

Example:

```text
minPrice > maxPrice
```

returns:

```json
{
  "error": {
    "code": "INVALID_PRICE_RANGE",
    "message": "minPrice cannot be greater than maxPrice"
  }
}
```

---

## Server-Side Rendering

The products page is implemented as a Next.js Server Component.

The initial request reads the URL query parameters and fetches products from the backend on the server.

This means product information is included in the initial HTML response rather than being rendered only after client-side JavaScript execution.

The implementation supports URL parameters such as:

```text
/products
/products?q=shirt
/products?category=Shoes
/products?sort=price-asc
/products?page=2
```

This also makes filtered and sorted pages shareable through their URLs.

---

## SEO

The application includes:

- Page title
- Meta description
- Keywords
- Canonical URL
- Open Graph metadata
- Twitter metadata
- Robots metadata
- Semantic HTML
- Single primary H1
- Product image alt text
- JSON-LD structured data

JSON-LD uses the `ItemList` and `Product` schema structures to describe the product listing.

---

## Performance

The application uses several performance-focused practices:

- Next.js Server Components
- Next Image optimization
- Responsive image sizing
- Minimal dependencies
- Database indexes
- Pagination
- Server-side data fetching
- CSS Modules
- Avoidance of unnecessary client-side state

Product images use Next.js image optimization with responsive `sizes`.

---

## Accessibility

Accessibility considerations include:

- Semantic HTML elements
- Descriptive image `alt` text
- Form labels and accessible input placeholders
- Keyboard-accessible controls
- Responsive navigation/filter controls
- Logical heading structure
- Visible interactive controls

---

## Environment Variables

### Frontend

Create:

```text
frontend/.env.local
```

with:

```env
API_URL=http://localhost:5000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

For production, `API_URL` points to the deployed backend.

### Backend

Create:

```text
backend/.env
```

with:

```env
DATABASE_URL=your_postgresql_connection_string
FRONTEND_URL=http://localhost:3000
```

For production, `FRONTEND_URL` should point to the deployed frontend.

Environment files containing secrets are excluded from Git using `.gitignore`.

---

## Local Development

### 1. Clone the repository

```bash
git clone https://github.com/Subha62/Appscrip-task-SubhadipBera.git
cd Appscrip-task-SubhadipBera
```

### 2. Backend setup

```bash
cd backend
npm install
```

Configure the required environment variables.

Generate Prisma Client:

```bash
npx prisma generate
```

Run database migrations:

```bash
npx prisma migrate deploy
```

Seed the database:

```bash
npm run seed
```

Build the backend:

```bash
npm run build
```

Start the backend:

```bash
npm start
```

The API will run on:

```text
http://localhost:5000
```

### 3. Frontend setup

Open another terminal:

```bash
cd frontend
npm install
```

Configure:

```env
API_URL=http://localhost:5000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Start the development server:

```bash
npm run dev
```

The frontend will run on:

```text
http://localhost:3000
```

---

## Production Deployment

### Frontend

The Next.js application is deployed on Vercel.

Production URL:

```text
https://appscrip-task-subhadip-bera.vercel.app
```

The production frontend uses:

```env
API_URL=https://appscrip-product-api.onrender.com
```

### Backend

The Express API is deployed on Render.

Production URL:

```text
https://appscrip-product-api.onrender.com
```

### Database

The production PostgreSQL database is hosted on Neon.

---

## Dependencies

### Frontend

Main dependencies include:

- `next`
- `react`
- `react-dom`
- TypeScript
- ESLint

### Backend

Main dependencies include:

- `express`
- `cors`
- `zod`
- `prisma`
- `@prisma/adapter-pg`
- `pg`

Development tooling includes:

- TypeScript
- `tsx`
- `ts-node-dev`

---

## AI Usage

AI tools were used during development as an engineering assistance tool for:

- Understanding assignment requirements
- Debugging TypeScript and Prisma issues
- Reviewing API structure
- Improving component organization
- Troubleshooting deployment issues
- Reviewing SEO and SSR implementation
- Generating documentation drafts

AI-generated suggestions were reviewed and tested before being incorporated into the project.

### Example of AI-assisted output that required correction

During development, an AI-generated Prisma/TypeScript setup did not work correctly with the installed Prisma version and generated client configuration.

The generated setup resulted in a runtime module resolution error:

```text
Cannot find module './internal/class.js'
```

The implementation was investigated and corrected by using the generated Prisma client with the PostgreSQL adapter and adjusting the project configuration.

The final application was tested using the production build rather than relying on the initial generated development configuration.

### AI output that was rejected

Generic UI/code suggestions that did not match the assignment requirements were not directly used. The final implementation was adapted to the required Figma-inspired layout, API architecture, SSR requirement, database structure and deployment setup.

---

## Limitations

- Product detail pages are not included in the frontend because the assignment primarily requires the product listing page.
- Header icons such as account, wishlist and bag are currently presentation-level UI elements.
- Product images are seeded from remote image URLs.
- The backend is deployed on a free hosting plan, so the first request after inactivity may experience cold-start latency.
- The current application focuses on the product listing experience rather than checkout or authentication.

---

## Assignment Requirements Covered

| Requirement | Status |
|---|---|
| Product listing UI | ✅ |
| Responsive design | ✅ |
| Search | ✅ |
| Category filtering | ✅ |
| Price filtering | ✅ |
| Sorting | ✅ |
| Pagination | ✅ |
| REST API | ✅ |
| PostgreSQL database | ✅ |
| Prisma ORM | ✅ |
| API validation | ✅ |
| Server-side rendering | ✅ |
| SEO metadata | ✅ |
| JSON-LD | ✅ |
| Image optimization | ✅ |
| Loading state | ✅ |
| Error state | ✅ |
| Empty state | ✅ |
| Public deployment | ✅ |
| GitHub repository | ✅ |
| Documentation | ✅ |
| AI usage documentation | ✅ |

---

## Author

**Subhadip Bera**

B.Tech Computer Science & Engineering

GitHub: https://github.com/Subha62

LinkedIn: https://www.linkedin.com/in/subhadipbera62/