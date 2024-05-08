import http from "http";

import { getRouter as servicesRouter } from "./services/router.js";
import { getRouter as usersRouter } from "./users/router.js";

const routes = {
  ...servicesRouter(),
  ...usersRouter(),
  "/404": (req, res) => {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 - Not Found");
  },
};

export const server = http.createServer((req, res) => {
  const url = req.url.split("?")[0];
  const route = `[${req.method}]${url}`;

  const handler = routes[route] || routes["/404"];

  handler(req, res);
});
