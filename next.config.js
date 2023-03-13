module.exports = {
  swcMinify: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: Next already provide webpack above so I should not `require` it
    // Perform customizations to webpack config
    config.plugins.push(
      new webpack.DefinePlugin({
        __BASE_API_URL__: JSON.stringify(
          dev
            ? 'http://localhost:3001'
            : 'https://resume-app-backend.vercel.app/'
        ),
      })
    );

    // Important: return the modified config
    return config;
  },
};
