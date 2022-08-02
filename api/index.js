const express = require("express");
const app = express();

const { v4: uuid } = require("uuid");

app.use(express.json());

app.get("/", (req, res) => {
  return res.json({
    message: "Error 404 on routing. Please try again later.",
  });
});

app.get("/teams", (req, res) => {
  return res.json({
    "barcelona-fc": {
      name: "Futbol Club Barcelona",
      bornAt: new Date("1955/02/12"),
      director: "Joan Laporta",
      manager: "Xavi Hernández",
      location: {
        country: "Spane",
        city: "Barcelona",
      },
    },
    "real-madrid": {},
  });
});

app.get("/events", (req, res) => {
  return res.json({
    id: uuid(),
  });
});

app.listen(3333),
  () => {
    console.log("Listening on port 3333");
  };
