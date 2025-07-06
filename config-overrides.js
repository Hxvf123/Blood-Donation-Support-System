// config-overrides.js

module.exports = function override(config) {
  config.module.rules = config.module.rules.map((rule) => {
    if (
      rule.use &&
      rule.use.some((u) => typeof u.loader === "string" && u.loader.includes("source-map-loader"))
    ) {
      rule.exclude = [
        /node_modules\/react-datepicker/,
        /react-datepicker/ // Phòng trường hợp đường dẫn khác nhau giữa OS
      ];
    }
    return rule;
  });

  return config;
};
