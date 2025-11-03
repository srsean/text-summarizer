module.exports = {
  apps: [
    {
      name: "textsummarizer", // app name shown in `pm2 list`
      script: "npm",
      args: "start",
      cwd: "/var/www/text-summarizer", // path on your server
      instances: 1, // or "max" for multi-core
      exec_mode: "fork", // or "cluster" for multiple cores
      env: {
        NODE_ENV: "production",
        PORT: 3002, // your chosen port
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3002,
      },
      watch: false, // disable file watching on prod
      autorestart: true,
      max_memory_restart: "500M",
      error_file: "./logs/err.log",
      out_file: "./logs/out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
    },
  ],
};
