const path = require("path");

module.exports = {
  i18n: {
    locales: ["en", "bg", "es", "hr"],
    defaultLocale: "hr",
  },
  localePath: path.resolve("./public/locales"),
};