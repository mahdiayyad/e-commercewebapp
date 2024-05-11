const userSchema = `
  CREATE TABLE IF NOT EXISTS users (
      id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255),
      access_token VARCHAR(255)
  )
`;

module.exports = userSchema;
