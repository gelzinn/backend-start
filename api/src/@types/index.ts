export type CreateSessionDTO = {
  username: string;
  password: string;
}

type UserData = {
  password: string;
  id: string;
  roles: string[];
}

interface LocationTeam {
  country: string
  city: string
}

type Team = {
  name: string
  bornAt: Date
  director: string
  manager: string
  location: LocationTeam
}

// Declarando tipo dos users
export type UsersStore = Map<string, UserData>

// Declarando tipo dos times
export type TeamStore = Map<string, Team>

export type RefreshTokensStore = Map<string, string[]>

export type DecodedToken = {
  sub: string;
}