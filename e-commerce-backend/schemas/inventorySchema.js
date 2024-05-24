const inventorySchema = `
    CREATE TABLE IF NOT EXISTS product_inventory (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_id INT UNIQUE,
        quantity INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL,
        FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE
    );
`;

module.exports = inventorySchema;