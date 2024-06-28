# Project

Uma breve descrição sobre o que esse projeto faz e para quem ele é

## Features

- Temas dark e light
- Preview em tempo real
- Modo tela cheia
- Multiplataforma

## Setup

Clone this repository with git

```bash
  git clone https://github.com/4-ANO-COMP-IMT/ac2.git
  cd ac2
```

## Folders

- **back**: Back-end folder | Node.js struct
- **front**: Front-end folder | React struct

## Backend Modules

### `create_event` (http://localhost:3000/event)

- POST request

#### Request
```
{
   "name":"Treino Popeye",
   "dates":[
      1719392400000
   ],
   "notEarlier":32400000,
   "notLater":75600000,
   "description":"Treino apenas de antebraço, para os braços ficarem fortes como os do Popeye"
}
```

#### Response
```
{
  "message": "event created",
  "data": {
    "id": "48291bd9-f10b-497a-a917-1349fe64530e",
    "name": "Treino Popeye",
    "dates": [
      1719392400000
    ],
    "notEarlier": 32400000,
    "notLater": 75600000,
    "members": [],
    "description": "Treino apenas de antebraço, para os braços ficarem fortes como os do Popeye"
  }
}
```


## Authors

- [Enzo Sakamoto - 21.00210-0](https://github.com/enzosakamoto)
- [Flavio Murata - 21.01192-3](https://github.com/flaviomurata)
- [Vinícius de Oliveira Berti - 21.01219-9](https://github.com/viniciusberti)
- [João Vitor Choueri Branco - 21.01075-7](https://github.com/JoaoVitorBranco)
- [Pedro Henrique de Sousa Matumoto - 21.00784-5](https://github.com/PedroMatumoto)
- [Vitor Guirão Soller - 21.01444-2](https://github.com/VgsStudio)