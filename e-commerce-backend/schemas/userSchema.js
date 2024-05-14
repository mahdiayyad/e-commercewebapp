const userSchema = `
  CREATE TABLE IF NOT EXISTS users (
      id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      phone_number BIGINT NOT NULL,
      phone_code VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      access_token VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );
`;

module.exports = userSchema;