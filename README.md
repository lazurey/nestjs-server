# Simply sever built with NestJS

[NestJS](https://nestjs.com/)

## Local setup

### requirements
`node >= 12.0`

### Run

```bash
npm install
npm run start:debug
```

Server is running at [http://localhost:3000](http://localhost:3000);

### Test

**Unit Test**

```bash
npm run test
# with coverage
npm run test:cov
```

**End to End test**

```bash
npm run test:e2e
```

**Authentication**

use JWT Token to authenticate

```bash
curl -X POST http://localhost:3000/auth/login -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json

{"access_token":"$token"}

curl -X GET http://localhost:3000/moments -H "Authorization: Bearer $token"

```
