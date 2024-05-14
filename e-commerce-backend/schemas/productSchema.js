const productSchema = `
    CREATE TABLE IF NOT EXISTS product (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        SKU VARCHAR(100) NOT NULL UNIQUE,
        category_id INT,
        inventory_id INT UNIQUE,
        price DECIMAL(10, 2) NOT NULL,
        discount_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL,
        FOREIGN KEY (category_id) REFERENCES product_category(id),
        FOREIGN KEY (inventory_id) REFERENCES product_inventory(id) ON DELETE CASCADE,
        FOREIGN KEY (discount_id) REFERENCES discount(id)
    );
`;

module.exports = productSchema;
