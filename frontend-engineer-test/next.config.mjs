import { createProxyMiddleware } from 'http-proxy-middleware';

const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://swapi.dev/api/:path*', // Proxy para a API do SWAPI
      },
    ];
  },
};

export default nextConfig;
