module.exports = {
  apps: [
    {
      name: 'project',
      script: 'dist/src/main.js',
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      env_production: {
        RUNNING_ENV: 'prod',
      },
      env_development: {
        RUNNING_ENV: 'dev',
      },
    },
  ],
};
