### Live Link:

### Application Routes:

#### User

- api/v1/auth/signup (POST)
- api/v1/auth/signin (POST)
- api/v1/users (GET)
- api/v1/users/81cecd5f-7699-4bd5-ae8a-c86f38730b5b (Single GET)
- api/v1/users/81cecd5f-7699-4bd5-ae8a-c86f38730b5b (PATCH)
- api/v1/users/81cecd5f-7699-4bd5-ae8a-c86f38730b5b (DELETE)
- api/v1/profile (GET)

### Category

- api/v1/categories/create-category (POST)
- api/v1/categories (GET)
- api/v1/categories/81cecd5f-7699-4bd5-ae8a-c86f38730b5b (Single GET)
- api/v1/categories/81cecd5f-7699-4bd5-ae8a-c86f38730b5b (PATCH)
- api/v1/categories/81cecd5f-7699-4bd5-ae8a-c86f38730b5b (DELETE)

### Books

- api/v1/books/create-book (POST)
- api/v1/books (GET)
- api/v1/books/:categoryId/category (GET)
- api/v1/books/:id (GET)
- api/v1/books/:id (PATCH)
- api/v1/books/:id (DELETE)

### Orders

- api/v1/orders/create-order (POST)
- api/v1/orders (GET)
- api/v1/orders/:orderId (GET)
