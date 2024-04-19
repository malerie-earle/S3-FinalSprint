const { hashPassword, verifyPassword } = require('../server'); // Updated path to point directly to server.js

describe('Bcrypt Tests', () => {
  // Test hashing a password
  it('should hash a password', async () => {
    const password = 'password';
    const hashedPassword = await hashPassword(password);

    expect(hashedPassword).toBeDefined();
    expect(typeof hashedPassword).toBe('string');
    expect(hashedPassword.length).toBeGreaterThan(0);
  });

  // Test verifying a password
  it('should verify a valid password', async () => {
    const password = 'password';
    const hashedPassword = await hashPassword(password);

    const isValid = await verifyPassword(password, hashedPassword);

    expect(isValid).toBe(true);
  });

  it('should not verify an invalid password', async () => {
    const password = 'password';
    const invalidPassword = 'invalid_password';
    const hashedPassword = await hashPassword(password);

    const isValid = await verifyPassword(invalidPassword, hashedPassword);

    expect(isValid).toBe(false);
  });
});
