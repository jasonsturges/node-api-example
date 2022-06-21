const express = require("express");
const docsRoute = require("./docs");
const config = require("../../config/config");
const characterRoute = require("./character.route");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/characters",
    route: characterRoute,
  },
];

// routes available only in development mode
const devRoutes = [
  {
    path: "/docs",
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

if (config.env === "development") {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
