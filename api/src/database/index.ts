import { RefreshTokensStore, UsersStore, TeamStore } from "../@types"

// Iniciando um array vazio do tipo UsersStore
export const users: UsersStore = new Map()

// Iniciando um array vazio do tipo UsersStore
export const teams: TeamStore = new Map()

// Iniciando um array vazio do tipo RefreshTokensStore
export const tokens: RefreshTokensStore = new Map()

export function seedTeamStore() {
  // Team 1
  teams.set('barcelona-fc', {
    name: "Futbol Club Barcelona",
    bornAt: new Date("1955/02/12"),
    director: "Joan Laporta",
    manager: "Xavi Hernández",
    location: {
      country: "Spane",
      city: "Barcelona",
    }
  })

  // Team 2
  teams.set('corinthians', {
    name: "Corinthians",
    bornAt: new Date("1955/02/12"),
    director: "Cássio",
    manager: "Cássio",
    location: {
      country: "Brasil",
      city: "São Paulo",
    }
  })
}

export function seedUserStore() {
  // Team 1
  users.set('henrique', {
    password: "1234",
    id: "1",
    roles: [
      "ADMIN"
    ]
  })

  // Team 2
  users.set('marcelo', {
    password: "1234",
    id: "2",
    roles: [
      "FUNCIONARIO"
    ]
  })
}
