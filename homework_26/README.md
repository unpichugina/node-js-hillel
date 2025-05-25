# Online Store API (MongoDB)

A Node.js + Express backend API for an online store, using MongoDB as the database.

---

## Description

This RESTful API allows you to manage:

- Products
- Categories
- Orders

It supports adding products, placing orders, and calculating store statistics.

---

## Tech Stack

- Node.js
- Express.js
- MongoDB (native driver)
- dotenv
- Docker & docker-compose

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/unpichugina/node-js-hillel.git
cd node-js-hillel/homework_26
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

```bash
cp .env.example .env
```

Edit `.env`:

```
PORT=5000
MONGO_URL=mongodb://localhost:27017/shop
```

---

## Docker Setup

```bash
docker-compose up -d
```

This will start MongoDB and the Node.js app.

---

## Seeding Data

To populate sample data:

```bash
npm run seed
```

This will insert categories, products, and orders.

---

## Running the Server

```bash
npm run dev
```

Visit `http://localhost:5000`

---

## Project Structure

```
homework_26/
├── Dockerfile
├── docker-compose.yml
├── .env.example
├── package.json
└── src/
    ├── server.js
    ├── db.js
    ├── seed.js
    ├── controllers/
    │   ├── categoriesController.js
    │   ├── productsController.js
    │   └── ordersController.js
    └── routes/
        ├── categories.js
        ├── orders.js
        └── products.js
```

---

## Example Queries

### Find all products in “Smartphones” category

```js
db.products.find({ category: "Smartphones" });
```

### Calculate total revenue from all orders

```js
db.orders.aggregate([
  { $group: { _id: null, total: { $sum: "$totalPrice" } } }
]);
```

### Update stock after order

```js
db.products.updateOne(
  { _id: ObjectId("...") },
  { $inc: { stock: -1 } }
);
```

### Get top-3 products by sales

```js
db.orders.aggregate([
  { $unwind: "$items" },
  { $group: { _id: "$items.productId", count: { $sum: "$items.quantity" } } },
  { $sort: { count: -1 } },
  { $limit: 3 }
]);
```

---

## License

MIT License

## Author

- [GitHub](https://github.com/unpichugina)
