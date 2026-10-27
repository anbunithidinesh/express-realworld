/**
 * PM2 process file. Env vars come from the shell (scripts/deploy.sh sources .env).
 * Usage: pm2 start ecosystem.config.cjs
 */
module.exports = {
  apps: [
    {
      name: 'conduit-api',
      script: 'dist/api/main.js',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      max_memory_restart: '500M',
      watch: false,
    },
  ],
};
