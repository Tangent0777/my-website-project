// config/plugins.ts
export default ({ env }: { env: any }) => {
  const isProduction = env('NODE_ENV') === 'production';

  if (isProduction && env('CLOUDINARY_NAME')) {
    // Cloudinary only in production if credentials exist
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

  // Use local storage as fallback (develops or when Cloudinary not configured)
  return {};
};