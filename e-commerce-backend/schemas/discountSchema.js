const discountSchema = `
    CREATE TABLE IF NOT EXISTS discount (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        discount_percent DECIMAL(5, 2) NOT NULL,
        active TINYINT NOT NULL DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL
    );
`;

module.exports = discountSchema;