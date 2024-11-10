
# REST API APP

This project is simple REST API Example using nestjs and angular





## Requirements

Node,
NPM,
Nest,
Postgresql,
Angular

## Installation

Install project with npm


### BACKEND
```bash
  ** convert templateEnv.txt to .env (config file) and update database credentials
  npm install 
  npm run start
    -project running at PORT 3000
```

### FRONTEND
```bash
  ** backend url is saved in environment.ts(inside app folder), might need to update as per backend url PORT
  npm install 
  npm run start
    -project running at PORT 4200
```
    
## API Reference

#### Login User

```http
  POST /auth/login
```

| Parameter | Type     | Description  |
| :-------- | :------- | :----------- |
| `email`   | `string` | **Required** |
| `password`| `string` | **Required** |

```json
RESPONSE: {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJOYW1lIjoiamFtZXMiLCJ1c2VyRW1haWwiOiJqYW1lc0B5b3BtYWlsLmNvbSIsImlhdCI6MTczMTE3OTQ1NSwiZXhwIjoxNzMxMTgwMzU1fQ.S-ooJmw67-ikpn-C0zYe0WozihDTJyI0sv68gpiIpn8",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJOYW1lIjoiamFtZXMiLCJ1c2VyRW1haWwiOiJqYW1lc0B5b3BtYWlsLmNvbSIsImlhdCI6MTczMTE3OTQ1NSwiZXhwIjoxNzMxNzg0MjU1fQ.x4yBEiIUQeoj84y3Y07Qapqnq9zef5gai70-AGeGtx0",
    "userName": "james",
    "userId": 1
}
```
#### Sign Up 

```http
  POST /auth/signup
```

| Parameter     | Type     | Description  |
| :-------------| :------- | :------------|
| `name`        | `string` | **Required** |
| `email`       | `string` | **Required** |
| `password`    | `string` | **Required** |
| `organization`| `string` | Optional     |

```json
RESPONSE: {
    "message": "User created successfully",
    "userId": 1
}
```

#### Health Check

```http
  GET /health
```

```json
RESPONSE: {
    "status": "ok"
}
```

#### Dashboard (User List)
##### Required Token
##### List All the Users

```POST
  GET /dashboard/users
```
```json
RESPONSE: [
    {
        "id": 8,
        "name": "Jim ",
        "email": "jim@yopmail.com",
        "organization": "Org"
    },
    {
        "id": 1,
        "name": "tim",
        "email": "tim@yopmail.com",
        "organization": "org"
    }
]

```
#### Refresh Token

```http
  POST /auth/refresh
```

| Parameter     | Type     | Description   |
| :------------ | :------- | :------------ |
| `refreshToken`| `string` | **Required**. |

```json
RESPONSE: {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImphbWVzIiwidXNlckVtYWlsIjoiamFtZXNAeW9wbWFpbC5jb20iLCJpYXQiOjE3MzExODM3NzgsImV4cCI6MTczMTE4NDY3OH0.fMbbenSV6IZMaIb2WNfueruQAMqBveHa3xAJ0f95MFU"
}
```






## Tech Stack



**Server:** Node, Nest, TypeORM, Typescript, Javascript, Argon

**Database:** PostgreSQL

