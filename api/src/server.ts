import express from "express";
import cors from 'cors';

import "./@types/express"
import routes from "./routes";

const app = express();

app.use(express.json());
app.use(cors())
app.use(routes);

app.listen(3333), () => {
  console.log("Server running. Listening commands and routes on port 3333.");
};
