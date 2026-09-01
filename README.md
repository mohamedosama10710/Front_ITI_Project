# E-Commerce Web Application

A modern e-commerce frontend application built as the final project for the **ITI (Information Technology Institute) scholarship**.

The project focuses on building a complete, user-facing shopping experience using React, TypeScript, Tailwind CSS, shadcn/ui, Redux Toolkit, RTK Query, and JSON Server.

> **Project Scope:** This is a frontend-focused e-commerce application. Authentication and backend functionality are simulated for the scope and timeline of the ITI final project.

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Project Objectives](#-project-objectives)
- [Features](#-features)
- [Application Pages](#-application-pages)
- [Tech Stack](#️-tech-stack)
- [Architecture](#️-architecture)
- [Project Structure](#-project-structure)
- [Routing](#-routing)
- [State Management](#-state-management)
- [API and Data Layer](#-api-and-data-layer)
- [Product Model](#-product-model)
- [Home Page](#-home-page)
- [Category Page](#-category-page)
- [Product Details](#-product-details)
- [Cart and Wishlist](#️-cart-and-wishlist)
- [Authentication](#-authentication)
- [Form Validation](#-form-validation)
- [Responsive Design](#-responsive-design)
- [Reusable Components](#-reusable-components)
- [Technical Decisions](#-technical-decisions)
- [Installation](#-installation)
- [Running the Project](#-running-the-project)
- [API Endpoints](#-api-endpoints)
- [Testing and QA](#-testing-and-qa)
- [Project Limitations](#-project-limitations)
- [Future Improvements](#-future-improvements)
- [Team](#-team)
- [Academic Context](#-academic-context)

---

## 📋 Project Overview

This project is a multi-category e-commerce web application designed to provide users with a clean and modern online shopping experience.

Users can:

- Browse products.
- Explore product categories.
- View product details.
- Filter and sort products.
- Navigate through products using server-side pagination.
- Add products to the cart.
- Add products to the wishlist.
- View and manage cart items.
- Proceed through the checkout UI.
- Register and log in through the authentication UI.
- Submit validated forms.
- Navigate between all major sections of the application.

The application is designed around reusable components and a centralized state-management approach.

---

## 🎯 Project Objectives

The main objectives of the project are:

1. Build a complete modern e-commerce frontend.
2. Apply React and TypeScript in a real-world application structure.
3. Practice reusable component development.
4. Implement centralized state management using Redux Toolkit.
5. Manage server state using RTK Query.
6. Implement realistic REST API interactions using JSON Server.
7. Implement server-side filtering, sorting, and pagination.
8. Build validated forms using React Hook Form and Zod.
9. Create responsive layouts for desktop, tablet, and mobile.
10. Produce a maintainable and scalable frontend architecture.

---

## ✨ Features

### Product Features

- Product listing.
- Product categories.
- Product details.
- Product images.
- Product pricing.
- Original price and discount information.
- Product ratings.
- Review counts where available.
- Stock information.
- Flash-sale products.
- Best-selling products.
- New-arrival products.

### Shopping Features

- Add to Cart.
- Remove from Cart.
- Update cart quantities.
- Wishlist functionality.
- Product quick actions.
- Checkout UI.

### Category Features

- Dynamic category pages.
- Category navigation.
- Price range filtering.
- Rating filtering.
- Stock filtering.
- Combined filters using AND logic.
- Product sorting.
- Server-side pagination.
- Responsive filter drawer on mobile.

### Form Features

- Login form.
- Signup form.
- React Hook Form integration.
- Zod schema validation.
- User-friendly validation messages.

### UI/UX Features

- Responsive layout.
- Reusable ProductCard.
- Hover interactions.
- Loading states.
- Error states.
- Empty states.
- Product Not Found page.
- Responsive mobile filters using shadcn/ui.
- Consistent navigation and footer.

---

# 📄 Application Pages

The application contains the following main pages:

| Page | Purpose |
|---|---|
| Home | Main storefront and product discovery |
| Category | Browse, filter, sort, and paginate products |
| Product Details | Display detailed information about a product |
| Login | User authentication UI |
| Signup | User registration UI |
| Cart | Manage selected products |
| Wishlist | Manage saved products |
| Checkout | Checkout/order UI |
| About | Information about the store/project |
| Contact | Contact form and contact information |
| Product Not Found | Handles unavailable products |

---

# 🛠️ Tech Stack

## Frontend

- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **shadcn/ui**

## State Management

- **Redux Toolkit**
- **RTK Query**

## Routing

- **React Router DOM**
- **createBrowserRouter**

## Forms and Validation

- **React Hook Form**
- **Zod**

## API / Backend Simulation

- **JSON Server**

## Development Tools

- Git
- GitHub
- npm

---

# 🏗️ Architecture

The project follows a component-based frontend architecture.

The main responsibility of each layer is:

```text
UI Components
      ↓
Pages
      ↓
RTK Query / Redux
      ↓
JSON Server REST API
      ↓
db.json
```

### UI Layer

Responsible for:

- Rendering the interface.
- User interactions.
- Forms.
- Product cards.
- Filters.
- Navigation.

### Pages Layer

Responsible for composing reusable components into complete pages.

### Redux Toolkit

Responsible primarily for client-side application state such as:

- Cart state.
- Wishlist state.
- Other global UI/application state where needed.

### RTK Query

Responsible for server state and API communication:

- Fetching products.
- Fetching product details.
- Fetching category products.
- Flash-sale products.
- Best-selling products.
- Loading states.
- Error states.
- API caching.

### JSON Server

Provides a lightweight REST API simulation backed by `db.json`.

---

# 📁 Project Structure

The exact structure may evolve during development, but the project follows a structure similar to:

```text
src/
├── components/
│   ├── common/
│   ├── layout/
│   ├── product/
│   └── ui/
│
├── pages/
│   ├── Home/
│   ├── Category/
│   ├── ProductDetails/
│   ├── Login/
│   ├── Signup/
│   ├── Cart/
│   ├── Wishlist/
│   ├── Checkout/
│   ├── About/
│   ├── Contact/
│   └── NotFound/
│
├── routes/
│
├── store/
│   ├── api/
│   │   ├── baseApi.ts
│   │   └── productsApi.ts
│   │
│   └── slices/
│
├── types/
│
├── layouts/
│
└── ...
```

> The structure above describes the architectural organization. Existing project conventions should remain the source of truth when adding new features.

---

# 🧭 Routing

The project uses React Router with `createBrowserRouter`.

The application contains routes for:

```text
/
├── Home
├── /category/:categoryName
├── /product/:id
├── /login
├── /signup
├── /cart
├── /wishlist
├── /checkout
├── /about
├── /contact
└── *
    └── Not Found
```

## Dynamic Category Route

Category pages use:

```text
/category/:categoryName
```

Examples:

```text
/category/gaming
/category/pets
/category/cameras
/category/laptops
/category/toys
/category/shoes
/category/clothing
```

The category is obtained from the URL and used to request the corresponding products.

---

# 🔄 State Management

## Redux Toolkit

Redux Toolkit is used for centralized client-side state.

Important examples include:

- Cart.
- Wishlist.

The goal is to avoid prop drilling and keep shared application state centralized.

## RTK Query

RTK Query is used for server state.

Existing product-related operations include:

- Get all products.
- Get product by ID.
- Get products by category.
- Get flash-sale products.
- Get best-selling products.
- Get category products with filters, sorting, and pagination.

This separation keeps:

```text
Client State → Redux Toolkit
Server State → RTK Query
```

---

# 🗄️ API and Data Layer

The project uses **JSON Server** as a lightweight REST API simulation.

Current dependency:

```json
"json-server": "^1.0.0-beta.15"
```

The database is stored locally in:

```text
db.json
```

The main resource is:

```text
/products
```

---

## Server-Side Filtering

The Category page is designed to perform filtering through the API rather than fetching the entire catalog and filtering it in React.

Supported filter concepts include:

### Category

```text
category=gaming
```

### Minimum Price

```text
price >= minimumPrice
```

### Maximum Price

```text
price <= maximumPrice
```

### Minimum Rating

```text
rating >= minimumRating
```

### Stock

In stock:

```text
stock > 0
```

Out of stock:

```text
stock = 0
```

All active filters are combined using **AND logic**.

Example conceptually:

```text
Category = gaming
AND
Price = 100–500
AND
Rating >= 4
AND
Stock > 0
```

---

# 📄 Server-Side Pagination

The Category page uses real server-side pagination.

The default page size is:

```text
9 products per page
```

The project uses JSON Server v1 pagination parameters:

```text
_page
_per_page
```

Example:

```text
/products?_page=1&_per_page=9
```

The paginated response provides metadata that can be used to build the pagination UI, including:

- Current/previous/next page information.
- Total pages.
- Total item count.
- Product data.

The UI uses this metadata rather than hardcoding the number of pages.

---

# ↕️ Server-Side Sorting

The Category page supports sorting options such as:

- Most Popular.
- Price: Low to High.
- Price: High to Low.
- Rating: High to Low.

Because the current product model does not contain a dedicated sales-count/popularity field, **Most Popular** is represented by the highest product rating.

Conceptually:

```text
Most Popular
→ rating DESC

Price: Low to High
→ price ASC

Price: High to Low
→ price DESC

Rating: High to Low
→ rating DESC
```

Sorting is performed by the API rather than locally in the browser.

---

# 📦 Product Model

The product data follows this structure:

```ts
export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  image: string;
  category: string;
  description: string;
  rating: number;
  reviewCount?: number;
  stock: number;
  isFlashSale?: boolean;
  isBestSelling?: boolean;
  isNewArrival?: boolean;
}
```

Example:

```json
{
  "id": "1",
  "title": "Havic HV G-92 Gamepad",
  "price": 192,
  "image": "products/controller.jpg",
  "category": "gaming",
  "description": "High quality gaming controller.",
  "rating": 5,
  "stock": 10,
  "originalPrice": 160,
  "discountPercentage": 40,
  "reviewCount": 88,
  "isFlashSale": true,
  "isBestSelling": false,
  "isNewArrival": false
}
```

---

# 🏠 Home Page

The Home page is divided into clear product-discovery sections.

## Main Sections

### Hero / Promotional Banners

Promotional banner areas are based on the provided Figma design.

Banner images are treated separately from product data and can be added manually.

### Categories

Categories are loaded from the available product data.

Current categories include:

```text
gaming
pets
cameras
laptops
toys
shoes
clothing
```

### Flash Sales

Products are selected using:

```text
isFlashSale = true
```

The section uses a carousel to display products.

### Best Selling

Products are selected using:

```text
isBestSelling = true
```

### New Arrivals

The Home page includes a New Arrivals section.

Products can be identified using:

```text
isNewArrival = true
```

### Explore Products

A product exploration section displays additional products.

The section uses a carousel where appropriate.

---

# 🛍️ Product Card

The application uses a reusable `ProductCard` component.

The same ProductCard is reused across product grids instead of creating separate cards for each page.

The ProductCard can display:

- Product image.
- Discount badge.
- Wishlist action.
- Quick actions.
- Product title.
- Current price.
- Original price.
- Rating.
- Review count.
- Add to Cart action.

## Hover Behavior

On desktop hover, the **Add To Cart** action appears as part of the product card interaction.

This behavior is shared between the Home and Category pages to maintain visual consistency.

---

# 📂 Category Page

The Category page is designed to support a general e-commerce catalog rather than a clothing-only store.

## Layout

Desktop:

```text
┌─────────────────────────────────────────────────┐
│ Breadcrumb                                      │
│                                                 │
│ Category Title                  Sort By         │
│                                                 │
├─────────────────┬───────────────────────────────┤
│ Filters         │ Product Grid                  │
│                 │                               │
│ Categories      │ Product Product Product       │
│ Price Range     │ Product Product Product       │
│ Rating          │ Product Product Product       │
│ Stock           │                               │
│                 │ Pagination                    │
└─────────────────┴───────────────────────────────┘
```

## Filters

The page supports:

- Categories.
- Price Range.
- Rating.
- Stock.

Clothing-specific filters such as:

- Color.
- Size.

are intentionally excluded because the store contains multiple product types.

## Combined Filtering

Filters use AND logic.

Example:

```text
Gaming
+
$100–$500
+
Rating >= 4
+
In Stock
```

returns only products satisfying all conditions.

## Filter Reset

A **Clear Filters** action resets:

- Price.
- Rating.
- Stock.

The current category remains selected unless the user navigates to another category.

Changing filters resets pagination to page 1.

---

# 📱 Responsive Category Filters

On desktop, filters are displayed in a sidebar.

On mobile, the sidebar becomes a filter button.

Example:

```text
[ Filters ] [ Sort ]
```

The filters open inside a **shadcn/ui Sheet/Drawer**.

The same filter logic is shared between desktop and mobile to avoid duplicated business logic.

---

# 🔎 Product Details

The Product Details page is responsible for displaying the complete information of a selected product.

Products are identified through the route:

```text
/product/:id
```

The page retrieves the product using the existing RTK Query API.

It displays relevant information such as:

- Product image.
- Title.
- Price.
- Original price.
- Discount.
- Rating.
- Reviews.
- Stock.
- Description.
- Add to Cart.
- Wishlist functionality where applicable.

If a product ID does not exist, the application provides a Product Not Found experience.

---

# 🛒 Cart and Wishlist

## Cart

The Cart page allows users to manage products selected for purchase.

Typical operations include:

- Add product.
- Remove product.
- Update quantity.
- Calculate totals.
- Continue to checkout.

Cart state is managed using Redux Toolkit.

## Wishlist

The Wishlist page allows users to save products for later.

Wishlist state is managed using Redux Toolkit.

The ProductCard provides the wishlist action so users can save products directly from product listings.

---

# 🔐 Authentication

The application includes:

- Login page.
- Signup page.

Authentication is implemented as a **UI-focused feature** for the current project scope.

The project does not currently implement a production authentication backend.

Therefore:

- No real user database.
- No real authentication server.
- No production session management.
- No real JWT authentication.

The forms and validation flow are implemented on the frontend.

---

# 📝 Form Validation

Forms use:

- React Hook Form.
- Zod.

This provides:

- Controlled form state.
- Validation schemas.
- Clear validation errors.
- Type-safe form data.

The approach can be extended later when a real authentication backend is introduced.

---

# 📱 Responsive Design

The project is designed to work across:

- Desktop.
- Tablet.
- Mobile.

The original Figma design is primarily desktop-focused, so responsive behavior is implemented based on the existing design system and component structure.

Examples:

### Product Grid

Desktop:

```text
3 columns
```

Tablet:

```text
2 columns
```

Mobile:

```text
1–2 columns depending on available space
```

### Category Filters

Desktop:

```text
Permanent sidebar
```

Mobile:

```text
Filter button
→
shadcn Sheet / Drawer
```

The responsive implementation aims to avoid:

- Horizontal overflow.
- Broken layouts.
- Distorted images.
- Unusable controls.
- Desktop-only fixed widths.

---

# 🧱 Reusable Components

The project emphasizes component reuse.

Important reusable components include:

- Navbar.
- Footer.
- ProductCard.
- Buttons.
- Form controls.
- UI primitives from shadcn/ui.
- Product grids.
- Loading/skeleton components.
- Error states.
- Empty states.

The ProductCard is intentionally shared across multiple pages.

The desktop and mobile Category filters also share the same filtering logic.

---

# 🧠 Technical Decisions

## Why React?

React provides a component-based architecture suitable for building a modern interactive e-commerce frontend.

## Why TypeScript?

TypeScript provides:

- Static type checking.
- Better developer experience.
- Safer API data handling.
- Better maintainability.
- Clear component contracts.

## Why Redux Toolkit?

Redux Toolkit is used for global client-side state such as Cart and Wishlist.

It reduces Redux boilerplate while providing predictable centralized state management.

## Why RTK Query?

RTK Query is used for server state because it provides:

- API data fetching.
- Caching.
- Loading states.
- Error states.
- Request lifecycle management.
- Generated React hooks.

This avoids unnecessary manual fetching logic.

## Why JSON Server?

The project is frontend-focused and had a limited implementation timeline.

JSON Server provides a lightweight REST API simulation that allows the frontend to practice:

- REST requests.
- Filtering.
- Sorting.
- Pagination.
- API integration.

without requiring a complete production backend.

## Why shadcn/ui?

shadcn/ui provides accessible, customizable UI primitives while allowing the project to maintain control over styling.

It is especially useful for:

- Sheet/Drawer.
- Slider.
- Form controls.
- Buttons.
- Skeletons.
- Other reusable UI elements.

## Why React Hook Form + Zod?

React Hook Form handles form state efficiently, while Zod provides schema-based validation and type-safe validation rules.

---

# ⚡ Performance Considerations

The project avoids unnecessary client-side processing where possible.

For product listing:

```text
Server
↓
Filtering
↓
Sorting
↓
Pagination
↓
Only required products
↓
React UI
```

This is preferred over:

```text
Server
↓
All products
↓
React
↓
Filter everything
↓
Sort everything
↓
Slice everything
```

RTK Query caching is also used to reduce unnecessary repeated requests where applicable.

For range filters, excessive requests while dragging the slider should be avoided through an appropriate interaction strategy such as debouncing or applying the range after interaction.

---

# 🧪 Testing and QA

Before final delivery, the application should be manually tested across the main user flows.

## Home

- [ ] Hero/banner sections render correctly.
- [ ] Categories navigate correctly.
- [ ] Flash Sales load correctly.
- [ ] Best Selling loads correctly.
- [ ] New Arrivals load correctly.
- [ ] Product cards work correctly.
- [ ] Add to Cart works.
- [ ] Wishlist works.
- [ ] Carousels work.

## Category

- [ ] Category route works.
- [ ] Products are loaded from API.
- [ ] Category filtering works.
- [ ] Price filtering works.
- [ ] Rating filtering works.
- [ ] Stock filtering works.
- [ ] Combined filters work.
- [ ] Sorting works.
- [ ] Pagination works.
- [ ] Pagination resets after filter changes.
- [ ] Mobile filter Sheet works.
- [ ] Empty results state works.
- [ ] Invalid category is handled.

## Product Details

- [ ] Correct product loads.
- [ ] Invalid product ID is handled.
- [ ] Add to Cart works.
- [ ] Wishlist works.

## Cart

- [ ] Products can be added.
- [ ] Quantities can be changed.
- [ ] Products can be removed.
- [ ] Totals update correctly.

## Wishlist

- [ ] Products can be added.
- [ ] Products can be removed.
- [ ] Wishlist state is preserved during navigation.

## Forms

- [ ] Login validation works.
- [ ] Signup validation works.
- [ ] Required fields are validated.
- [ ] Invalid input displays appropriate messages.

## Responsive

- [ ] Desktop layout.
- [ ] Tablet layout.
- [ ] Mobile layout.
- [ ] No horizontal overflow.
- [ ] Mobile filter Sheet works.

---

# 📌 Project Limitations

The current project intentionally has several limitations due to its frontend-focused scope and available development time.

### Authentication

Authentication is UI-only.

There is no production authentication service.

### Backend

JSON Server is used instead of a dedicated backend.

### Database

Product data is stored in a local JSON file.

### Payments

There is no real payment gateway.

The Checkout page is a frontend UI flow.

### User Accounts

There is no real persistent user account system.

### Production Deployment

The JSON Server setup is intended for development/demo purposes rather than production use.

These limitations are intentional and can be addressed in future versions.

---

# 🔮 Future Improvements

If the project is extended beyond the current ITI scope, the following improvements can be added:

## Backend

- Node.js / Express backend.
- MongoDB or PostgreSQL.
- Real product management.
- Real user management.
- Server-side authentication.

## Authentication

- JWT authentication.
- Password hashing.
- Protected routes.
- User sessions.
- Role-based authorization.

## E-Commerce

- Real checkout.
- Payment gateway integration.
- Order management.
- Order history.
- Product reviews.
- Product search.
- Advanced product recommendations.

## Admin Dashboard

- Product CRUD.
- Category management.
- Order management.
- User management.
- Inventory management.
- Sales analytics.

## Infrastructure

- Production database.
- API deployment.
- Frontend deployment.
- Environment variables.
- CI/CD.
- Automated testing.

---

# 🚀 Installation

## 1. Clone the Repository

```bash
git clone https://github.com/mohamedosama10710/Front_ITI_Project.git
```

## 2. Navigate to the Project

```bash
cd Front_ITI_Project
```

## 3. Install Dependencies

```bash
npm install
```

---

# ▶️ Running the Project

The project requires two processes:

1. React/Vite development server.
2. JSON Server API.

## Start JSON Server

Use the project's configured JSON Server command.

For example:

```bash
npx json-server db.json
```

If the project contains a dedicated npm script, use that script instead.

## Start React

In another terminal:

```bash
npm run dev
```

The Vite development server will provide the frontend URL shown in the terminal.

---

# 🔌 API Endpoints

The main resource is:

```text
/products
```

## Get All Products

```text
GET /products
```

## Get Product by ID

```text
GET /products/:id
```

Example:

```text
GET /products/1
```

## Get Products by Category

Conceptually:

```text
GET /products?category=gaming
```

## Flash Sales

Conceptually:

```text
GET /products?isFlashSale=true
```

## Best Selling

Conceptually:

```text
GET /products?isBestSelling=true
```

## Category Pagination

Conceptually:

```text
GET /products?category=gaming&_page=1&_per_page=9
```

## Category + Filters + Sorting

Conceptually:

```text
GET /products
?category=gaming
&price:gte=100
&price:lte=500
&rating:gte=4
&stock:gt=0
&_sort=-rating
&_page=1
&_per_page=9
```

> The exact query syntax should follow the behavior supported by the installed JSON Server v1 beta version.

---

# 📦 Development Dependencies

The project relies on the following major packages:

```text
react
typescript
vite
react-router-dom
@reduxjs/toolkit
react-redux
tailwindcss
shadcn/ui
react-hook-form
zod
json-server
```

Additional packages may be used for icons and other UI requirements.

---

# 👥 Team

This project is developed collaboratively as part of the ITI scholarship final project.

### Team Members

- **Mohamed Osama**
- **Abdallah**

> Update this section with the exact names and responsibilities before final submission.

---

# 🎓 Academic Context

This project was developed as the **final project for an ITI scholarship**.

The project demonstrates practical knowledge of:

- React development.
- TypeScript.
- Component-based architecture.
- Routing.
- State management.
- API integration.
- RTK Query.
- Form handling.
- Schema validation.
- Responsive UI development.
- Git/GitHub workflow.
- Frontend architecture and code organization.

The primary goal is to demonstrate the ability to design and implement a complete, maintainable e-commerce frontend using modern web development practices.

---

# 📄 Project Status

The project is being developed incrementally.

### Completed / Prepared

- [x] Project setup.
- [x] React + TypeScript.
- [x] Tailwind CSS.
- [x] shadcn/ui.
- [x] Redux Toolkit.
- [x] RTK Query.
- [x] JSON Server.
- [x] Product data structure.
- [x] Product API endpoints.
- [x] Navbar.
- [x] Footer.
- [x] ProductCard.
- [x] Main application routes.
- [x] Home page architecture.
- [x] Category API architecture.

### Final QA

- [ ] Complete cross-page testing.
- [ ] Final responsive testing.
- [ ] Final UI polish.
- [ ] Production-ready documentation.
- [ ] Final GitHub cleanup.

---

# 📜 License

This project was created for educational purposes as part of the ITI scholarship final project.

---

## ⭐ Final Note

This application demonstrates a frontend-first approach to building a modern e-commerce experience.

The architecture is intentionally designed so that the current JSON Server API can later be replaced with a real backend without requiring a complete rewrite of the frontend.
