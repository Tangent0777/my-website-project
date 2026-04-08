// config/database.ts
export default ({ env }: { env: any }) => {
  const isProduction = env('NODE_ENV') === 'production';

  if (isProduction) {
    // PostgreSQL for production (Neon)
    return {
      connection: {
        client: 'postgres',
        connection: {
          host:     env('DATABASE_HOST'),
          port:     env.int('DATABASE_PORT', 5432),
          database: env('DATABASE_NAME'),
          user:     env('DATABASE_USERNAME'),
          password: env('DATABASE_PASSWORD'),
          ssl: {
            rejectUnauthorized: false,
          },
        },
        acquireConnectionTimeout: 60000,
      },
    };
  }

  // SQLite for local development
  return {
    connection: {
      client: 'sqlite',
      connection: {
        filename: env(
          'DATABASE_FILENAME',
          '.tmp/data.db'
        ),
      },
      useNullAsDefault: true,
    },
  };
};