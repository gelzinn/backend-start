import express, { json } from "express";
import routes from "./routes";

const app = express();

app.use(json());

app.use(routes);

app.listen(3333),
  () => {
    console.log("Server running. Listening commands and routes on port 3333.");
  };
