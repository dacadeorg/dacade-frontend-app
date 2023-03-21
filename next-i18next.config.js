const path = require("path");

module.exports = {
  i18n: {
    locales: ["en", "bg", "es", "hr"],
    defaultLocale: "en",
  },
  localePath: path.resolve("./public/locales"),
};