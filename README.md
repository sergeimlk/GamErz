# GamErz

## Environment Configuration

### Database Connection String

In the file `src/config/envConstants.ts`, there are two possible MongoDB connection string formats:

```typescript
// Simple connection string (default)
export const DB_URI = `mongodb://localhost:${DB_PORT}/${DB_NAME}`;

// Authentication-enabled connection string (commented)
export const DB_URI = `mongodb://${DB_USER}:${DB_PASSWORD}@localhost:${DB_PORT}/${DB_NAME}?authSource=admin`;
```

If you encounter connection issues with the default connection string, comment line 23 and uncomment line 24. This is typically needed when MongoDB authentication is enabled in your environment.
