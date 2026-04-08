// config/plugins.ts
export default ({ env }: { env: any }) => {
  const isProduction = env('NODE_ENV') === 'production';

  if (isProduction) {
    // Cloudinary only in production
    return {
      upload: {
        config: {
          provider: 'cloudinary',
          providerOptions: {
            cloud_name: env('CLOUDINARY_NAME'),
            api_key:    env('CLOUDINARY_KEY'),
            api_secret: env('CLOUDINARY_SECRET'),
          },
          actionOptions: {
            upload:       {},
            uploadStream: {},
            delete:       {},
          },
        },
      },
    };
  }

  // Local dev — use default local storage
  return {};
};