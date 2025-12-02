# Zenith Product API

A RESTful API built with **Node.js**, **Express**, and **Mongoose** to manage product data for an e-commerce inventory system. Supports full CRUD operations, filtering, sorting, and pagination.

---

## 🚀 Features

- Create, read, update, and delete products
- Filter by category and price range
- Sort results (e.g., price ascending/descending)
- Pagination for large product catalogs
- MongoDB Atlas connection using Mongoose

---

## 🤖 Technologies

- Node.js
- Express
- MongoDB + Mongoose
- dotenv

---

## 🗂️ Project Structure

├── server.js<br>
├── config/<br>
│ └── connection.js<br>
├── models/<br>
│ └── Product.js<br>
├── routes/<br>
│ └── productRoutes.js<br>
├── .env<br>
└── package.json<br>

---

## 🖳 Installation

1. Clone the repository

```bash
git clone <your-repo-url>
cd zenith-product-api
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file

```bash
MONGO_URI=your_mongodb_connection_string
```

4. Start the server

```bash
node server.js
```

---

## 🌐 API Endpoints

### Create Product

`POST /api/products`

Example body:

```json
{
  "name": "Wireless Mouse",
  "description": "Bluetooth ergonomic mouse",
  "price": 29.99,
  "category": "electronics",
  "tags": ["peripherals", "wireless"]
}
```

### Get All Products (Advanced)

`GET /api/products`

Supports query parameters:<br>

- category

- minPrice

- maxPrice

- sortBy (e.g. price_asc, price_desc)

- page (default 1)

- limit (default 10)

Example:

```bash
/api/products?category=electronics&minPrice=20&sortBy=price_desc&page=2&limit=5
```

### Get One Product

`GET /api/products/:id`

### Update Product

`PUT /api/products/:id`

### Delete Product

`DELETE /api/products/:id`

---

## 🧪 Testing

Use Postman, Insomnia, or Thunder Client to test:

- CRUD routes

- Various filter combinations

- Pagination and sorting

---

### 🛡️ Security

- Do not commit `.env` or `node_modules`

- Ensure MongoDB Atlas connection works before testing
