import { Router } from "express";
import crawlDetail from "./crawl-detail";

const routes = Router();

routes.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to my API!" });
});
routes.use("/crawl-detail", crawlDetail);

export default routes;
