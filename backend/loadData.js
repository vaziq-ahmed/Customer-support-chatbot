const fs = require('fs');
const { parse } = require('csv-parse');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  // Create distribution_centers table
  db.run(`
    CREATE TABLE distribution_centers (
      id INTEGER PRIMARY KEY,
      name TEXT,
      latitude REAL,
      longitude REAL
    )
  `);

  // Create products table
  db.run(`
    CREATE TABLE products (
      id INTEGER PRIMARY KEY,
      cost REAL,
      category TEXT,
      name TEXT,
      brand TEXT,
      retail_price REAL,
      department TEXT,
      sku TEXT,
      distribution_center_id INTEGER
    )
  `);

  // Create inventory_items table
  db.run(`
    CREATE TABLE inventory_items (
      id INTEGER PRIMARY KEY,
      product_id INTEGER,
      created_at TEXT,
      sold_at TEXT,
      cost REAL,
      product_category TEXT,
      product_name TEXT,
      product_brand TEXT,
      product_retail_price REAL,
      product_department TEXT,
      product_sku TEXT,
      product_distribution_center_id INTEGER
    )
  `);

  // Create order_items table
  db.run(`
    CREATE TABLE order_items (
      id INTEGER PRIMARY KEY,
      order_id INTEGER,
      user_id INTEGER,
      product_id INTEGER,
      inventory_item_id INTEGER,
      status TEXT,
      created_at TEXT,
      shipped_at TEXT,
      delivered_at TEXT,
      returned_at TEXT
    )
  `);

  // Create orders table
  db.run(`
    CREATE TABLE orders (
      order_id INTEGER PRIMARY KEY,
      user_id INTEGER,
      status TEXT,
      gender TEXT,
      created_at TEXT,
      returned_at TEXT,
      shipped_at TEXT,
      delivered_at TEXT,
      num_of_item INTEGER
    )
  `);

  // Create users table
  db.run(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY,
      first_name TEXT,
      last_name TEXT,
      email TEXT,
      age INTEGER,
      gender TEXT,
      state TEXT,
      street_address TEXT,
      postal_code TEXT,
      city TEXT,
      country TEXT,
      latitude REAL,
      longitude REAL,
      traffic_source TEXT,
      created_at TEXT
    )
  `);

  // Load distribution_centers.csv
  fs.createReadStream('../ecommerce-dataset/distribution_centers.csv')
    .pipe(parse({ columns: true }))
    .on('data', (row) => {
      db.run(
        `INSERT INTO distribution_centers (id, name, latitude, longitude) VALUES (?, ?, ?, ?)`,
        [row.id, row.name, row.latitude, row.longitude]
      );
    });

  // Load products.csv
  fs.createReadStream('../ecommerce-dataset/products.csv')
    .pipe(parse({ columns: true }))
    .on('data', (row) => {
      db.run(
        `INSERT INTO products (id, cost, category, name, brand, retail_price, department, sku, distribution_center_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [row.id, row.cost, row.category, row.name, row.brand, row.retail_price, row.department, row.sku, row.distribution_center_id]
      );
    });

  // Load inventory_items.csv
  fs.createReadStream('../ecommerce-dataset/inventory_items.csv')
    .pipe(parse({ columns: true }))
    .on('data', (row) => {
      db.run(
        `INSERT INTO inventory_items (id, product_id, created_at, sold_at, cost, product_category, product_name, product_brand, product_retail_price, product_department, product_sku, product_distribution_center_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [row.id, row.product_id, row.created_at, row.sold_at, row.cost, row.product_category, row.product_name, row.product_brand, row.product_retail_price, row.product_department, row.product_sku, row.product_distribution_center_id]
      );
    });

  // Load order_items.csv
  fs.createReadStream('../ecommerce-dataset/order_items.csv')
    .pipe(parse({ columns: true }))
    .on('data', (row) => {
      db.run(
        `INSERT INTO order_items (id, order_id, user_id, product_id, inventory_item_id, status, created_at, shipped_at, delivered_at, returned_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [row.id, row.order_id, row.user_id, row.product_id, row.inventory_item_id, row.status, row.created_at, row.shipped_at, row.delivered_at, row.returned_at]
      );
    });

  // Load orders.csv
  fs.createReadStream('../ecommerce-dataset/orders.csv')
    .pipe(parse({ columns: true }))
    .on('data', (row) => {
      db.run(
        `INSERT INTO orders (order_id, user_id, status, gender, created_at, returned_at, shipped_at, delivered_at, num_of_item) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [row.order_id, row.user_id, row.status, row.gender, row.created_at, row.returned_at, row.shipped_at, row.delivered_at, row.num_of_item]
      );
    });

  // Load users.csv
  fs.createReadStream('../ecommerce-dataset/users.csv')
    .pipe(parse({ columns: true }))
    .on('data', (row) => {
      db.run(
        `INSERT INTO users (id, first_name, last_name, email, age, gender, state, street_address, postal_code, city, country, latitude, longitude, traffic_source, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [row.id, row.first_name, row.last_name, row.email, row.age, row.gender, row.state, row.street_address, row.postal_code, row.city, row.country, row.latitude, row.longitude, row.traffic_source, row.created_at]
      );
    });

  // Final callback when all data is loaded
  fs.createReadStream('../ecommerce-dataset/users.csv') // Using users.csv as the last file to trigger end
    .pipe(parse({ columns: true }))
    .on('end', () => {
      console.log('All data loaded into SQLite');
      db.close();
    });
});