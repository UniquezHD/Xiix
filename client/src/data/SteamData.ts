type Game = {
  name: string
  gameID: string
  publisher: string
  release: string
  cover: string
}

//https://www.steamgriddb.com/game/5255524

const SteamData: Game[] = [
  {
    name: 'Plants vs. Zombies™: Replanted',
    gameID: '765447',
    publisher: "",
    release: "",
    cover: 'https://cdn2.steamgriddb.com/thumb/ff4bf2b35971ab9136bf25f3419b9029.jpg',
  },
  {
    name: 'Plants vs. Zombies™: Fusion',
    gameID: '343252',
    publisher: "",
    release: "",
    cover: 'https://cdn2.steamgriddb.com/thumb/307b8fc74f2e4f2a963928b974ec7fec.jpg',
  },
  {
    name: 'S.T.A.L.K.E.R. 2: Heart of Chornobyl',
    gameID: '575434',
    publisher: "",
    release: "",
    cover: 'https://cdn2.steamgriddb.com/thumb/75c29ee64502c26c89759ae727e5ca1a.jpg',
  }
]

export { SteamData }