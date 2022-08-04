import { Router } from "express";
import { v4 as uuid } from "uuid";

import { hash } from "bcryptjs";

const routes = Router();

const teamsDb = [];

routes.get("/", (req, res) => {
  return res.status(404);
});

// routes.get("/teams", (req, res) => {
//   return res.json({
//     "barcelona-fc": {
//       name: "Futbol Club Barcelona",
//       bornAt: new Date("1955/02/12"),
//       director: "Joan Laporta",
//       manager: "Xavi Hernández",
//       location: {
//         country: "Spane",
//         city: "Barcelona",
//       },
//     },
//     "real-madrid": {},
//   });
// });

routes.get("/teams", (req, res) => {
  return res.json({
    teams: teamsDb,
  });
});

routes.post("/teams", async (req, res) => {
  const { slug, name, manager, password } = req.body;

  try {
    if (!slug || !name || !manager || !password) {
      throw Error("Informations missing.");
    }

    const findTeam = teamsDb.find((team) => {
      team.slug === slug;
    });

    if (findTeam) {
      throw Error("This team already exists.");
    }

    const passwordCrypto = await hash(password, 10, (errBcrypt, hash) => {
      if (errBcrypt) {
        return res.status(500).send({ error: errBcrypt });
      }
    });

    const team = {
      slug,
      name,
      manager,
      password: passwordCrypto,
    };

    teamsDb.push(team);

    return res.json(team);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

routes.get("/events", (req, res) => {
  return res.json({
    id: uuid(),
  });
});

export default routes;
