import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_BASE_API_URL:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3001'
        : 'https://api.suleymangunduz.me',
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
