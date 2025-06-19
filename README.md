# In-Memory User CRUD API

A complete REST API for user management with authentication, built using Node.js, Express, and TypeScript. User data is stored in memory with full CRUD operations and JWT authentication

## Tech Stack

- Node.js
- Express.js
- TypeScript
- JWT + bcryptjs
- Joi for validation 

## API Endpoints that can be tested  using curl command or via postman
**POST** `/api/users`  crate user

Request body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
Example: 
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User 2",
    "email": "test3@example.com",
    "password": "password123"
  }'
```
response
```bash
{"success":false,"error":"User with this email already exists"}
```



**GET** `/api/users`   get all user

Example:
```bash
curl http://localhost:3000/api/users

```
```bash
{"success":true,"data":[{"id":"229f350e-5150-4f15-9453-3fe793d9d82d","name":"Test User 2","email":"test3@example.com","createdAt":"2025-06-19T17:37:21.404Z","updatedAt":"2025-06-19T17:39:20.145Z"}]}
```


**GET** `/api/users/229f350e-5150-4f15-9453-3fe793d9d82d`   get user by id
Example:
```bash
curl http://localhost:3000/api/users/229f350e-5150-4f15-9453-3fe793d9d823

```
```bash
{"success":false,"error":"User not found"}% 
```

## To test All API follow this
- http://localhost:3000/api/auth/login
- http://localhost:3000/api/users/profile/me
- http://localhost:3000/api/users/profile/me


## Getting Started Locally

###  clone repo
```bash
git clone git@github.com:oliviertech212/inmemoryusermngt.git
```

### change directory
```bash
cd inmemoryusermngt
```


### Install dependencies
```bash
npm install
```

### Run in development mode
```bash
npm run dev
```

