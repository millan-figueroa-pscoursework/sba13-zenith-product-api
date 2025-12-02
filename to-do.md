# Zenith Product API – To-Do List

## 1. Project Setup

- [x] Create project folder `zenith-product-api`
- [x] `cd` into folder
- [x] Initialize npm
  - [x] Run `npm init -y`
- [x] Install dependencies

  - [x] `npm install express mongoose dotenv`
  - [x] (Optional, helpful) `npm install --save-dev nodemon`

- [x] Create base files/folders

  - [x] `server.js`
  - [x] `config/connection.js` (or `db/connection.js`)
  - [x] `models/Product.js`
  - [x] `routes/productRoutes.js`
  - [x] `.env`
  - [x] `.gitignore`

- [x] Set up `.gitignore`

  - [x] Add `node_modules/`
  - [x] Add `.env`

- [x] Fill in `.env`
  - [x] `MONGO_URI=your_mongo_atlas_connection_string`
  - [x] `PORT=3000` (or whatever port)

---

## 2. Database Connection (config/connection.js)

- [ ] Import mongoose
- [ ] Use `mongoose.connect(process.env.MONGO_URI)` with options if needed
- [ ] Add `.then()` / `.catch()` or `async/await` with try/catch
  - [ ] Log success message on successful connection
  - [ ] Log error message on failure
- [ ] Export the connection (or just ensure it runs when required)

---

## 3. Product Schema & Model (models/Product.js)

- [ ] Import mongoose
- [ ] Create `productSchema` with fields:
  - [ ] `name`: `String`, `required: true`
  - [ ] `description`: `String`, `required: true`
  - [ ] `price`: `Number`, `required: true`, `min: 0` (or custom validator > 0)
  - [ ] `category`: `String`, `required: true`
  - [ ] `inStock`: `Boolean`, `default: true`
  - [ ] `tags`: `[String]`
  - [ ] `createdAt`: `Date`, `default: Date.now`
- [ ] Compile model: `const Product = mongoose.model('Product', productSchema);`
- [ ] Export `Product`

---

## 4. Express Server Setup (server.js)

- [ ] Import:
  - [ ] `express`
  - [ ] `dotenv`
  - [ ] DB connection (`./config/connection`)
  - [ ] product routes (`./routes/productRoutes`)
- [ ] Configure:
  - [ ] `dotenv.config()`
  - [ ] `const app = express();`
  - [ ] `app.use(express.json());`
- [ ] Mount routes:
  - [ ] `app.use('/api/products', productRoutes);`
- [ ] Start server:
  - [ ] `app.listen(process.env.PORT, () => console.log(...))`

---

## 5. Product Routes – Basic CRUD (routes/productRoutes.js)

- [ ] Import:
  - [ ] `express`
  - [ ] `Product` model
- [ ] Create router:
  - [ ] `const router = express.Router();`

### POST /api/products (Create)

- [ ] Route: `router.post('/')`
- [ ] Use `async`/`await` with `try/catch`
- [ ] Create product from `req.body`
- [ ] On success:
  - [ ] `res.status(201).json(newProduct)`
- [ ] On validation error:
  - [ ] `res.status(400).json({ error: 'message' })`

### GET /api/products/:id (Read Single)

- [ ] Route: `router.get('/:id')`
- [ ] Find by id: `Product.findById(req.params.id)`
- [ ] If found: return product
- [ ] If not found: `res.status(404).json({ error: 'Product not found' })`

### PUT /api/products/:id (Update)

- [ ] Route: `router.put('/:id')`
- [ ] Use `Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })`
- [ ] If updated product is null:
  - [ ] `res.status(404).json({ error: 'Product not found' })`
- [ ] Else return updated product

### DELETE /api/products/:id (Delete)

- [ ] Route: `router.delete('/:id')`
- [ ] Use `Product.findByIdAndDelete(req.params.id)`
- [ ] If deleted product is null:
  - [ ] `res.status(404).json({ error: 'Product not found' })`
- [ ] Else return `{ message: 'Product deleted successfully' }`

---

## 6. GET /api/products – Advanced Querying

- [ ] Route: `router.get('/')`
- [ ] Read query params:
  - [ ] `category`
  - [ ] `minPrice`
  - [ ] `maxPrice`
  - [ ] `sortBy` (e.g. `price_asc`, `price_desc`, `createdAt_desc`)
  - [ ] `page`
  - [ ] `limit`
- [ ] Build filter object:
  - [ ] If `category`: `filter.category = category`
  - [ ] If `minPrice` or `maxPrice`:
    - [ ] `filter.price = {}`
    - [ ] If `minPrice`: `filter.price.$gte = Number(minPrice)`
    - [ ] If `maxPrice`: `filter.price.$lte = Number(maxPrice)`
- [ ] Start query: `let query = Product.find(filter);`
- [ ] Sorting:
  - [ ] If `sortBy` present, map it to a sort object:
    - [ ] e.g., `price_asc` → `{ price: 1 }`, `price_desc` → `{ price: -1 }`
  - [ ] Apply `.sort(sortOptions)`
- [ ] Pagination defaults:
  - [ ] `page = Number(page) || 1`
  - [ ] `limit = Number(limit) || 10`
  - [ ] `skip = (page - 1) * limit`
- [ ] Apply pagination:
  - [ ] `query = query.skip(skip).limit(limit);`
- [ ] Execute query in try/catch:
  - [ ] `const products = await query;`
  - [ ] Return `res.json(products);`

---

## 7. Slightly-Extra (Nice, but still quick)

- [ ] Add a simple root route in `server.js`:
  - [ ] `app.get('/', (req, res) => res.send('Zenith Product API is running'));`
- [ ] Add a basic error message for invalid ObjectId (optional but nice):
  - [ ] Check in `/:id` routes if `mongoose.Types.ObjectId.isValid(id)` before querying
- [ ] Add a couple of test products manually (via POST in Postman) so GET routes show data
- [ ] Add a quick README:
  - [ ] How to install & run
  - [ ] Example requests for each endpoint
  - [ ] Example query params (category, minPrice, etc.)

---

## 8. Testing Checklist (Postman / Insomnia)

- [ ] Test `POST /api/products` with:
  - [ ] Valid data (should get 201 + product)
  - [ ] Missing required fields (should get 400)
- [ ] Test `GET /api/products`:
  - [ ] Without query params (all products, paginated)
  - [ ] With `category`
  - [ ] With `minPrice` and `maxPrice`
  - [ ] With `sortBy` (e.g. `price_asc`, `price_desc`)
  - [ ] With `page` & `limit`
- [ ] Test `GET /api/products/:id`:
  - [ ] Valid id
  - [ ] Non-existing id (404)
- [ ] Test `PUT /api/products/:id`:
  - [ ] Valid id (updates fields)
  - [ ] Non-existing id (404)
- [ ] Test `DELETE /api/products/:id`:
  - [ ] Valid id (success message)
  - [ ] Non-existing id (404)

---

## 9. Final GitHub Prep

- [ ] Confirm `.env` is NOT committed
- [ ] Confirm `node_modules/` is NOT committed
- [ ] Commit all source files
- [ ] Push to GitHub
- [ ] Copy repo link for submission
