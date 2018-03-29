const config = {
  all: {
    env: process.env.NODE_ENV || "development",
    isDev: process.env.NODE_ENV !== "production",
    basename: process.env.PUBLIC_PATH,
    client_id:
      "2d560f384b7c70db95aad987e5e27bfc806a7e87927c911dd2f5fa2cf12da6fa"
  },
  test: {},
  development: {
    apiUrl: "http://connect.test"
  },
  production: {}
};

module.exports = { ...config.all, ...config[config.all.env] };
