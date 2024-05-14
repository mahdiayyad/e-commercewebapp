const inventorySchema = `
    CREATE TABLE IF NOT EXISTS product_inventory (
        id INT AUTO_INCREMENT PRIMARY KEY,
        quantity INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL
    );
`;

module.exports = inventorySchema;
