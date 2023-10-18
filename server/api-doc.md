# API Doc of H&m

# Endpoint

list of available endpoint:

- `POST /register`
- `POST /login`
- `GET /auth/discord`
- `GET /movies`
- `GET /movies/:id`
- `GET /video/:movieId`

need authentication

- `POST /mymovies`
- `GET /mymovies`
- `POST /generate-midtrans-token`

## POST /register

### Request:

- `body:`

```json

  {
    "email": String,
    "password": String,
  }

```

### Response (201 - OK)

```json
{
    "id": Integer,
    "email": String
}
```

### Response (400 - Bad Request)

```json
{
    "message": "Email format is invalid"
}
OR
{
    "message": "Email is required"
}
OR
{
    "message": "Password is required"
}
OR
{
    "message": "Email alredy registered"
}
```

## POST /login

### Request:

- `body:`

```json

  {
    "email": String,
    "password": String,
  }

```

### Response (200 - OK)

```json
{
    "access_token": String
}
```

### Response (400 - Bad Request)

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

### Response (401 - Unauthorized)

```json
{
  "message": "Invalid email or password"
}
```

## POST /auth/discord

### Request:

- `query:`

```json

  {
    "code": String,
  }

```

### Response (200 - OK)

```json
{
    "access_token": String
}
```

## GET /movies

### Request:

- `query:`

```json
{
  "page": Integer,
  "title": String
}
```

### Response: (200 - OK)

```json
[
  {
    "id": Integer,
    "title": String,
    "release_date": String,
    "imageUrl":Integer,
  }
]
```

## GET /movies/:id

### Request:

- `params:`

```json
{
  "id": "integer(required)"
}
```

### Response (200 - OK)

```json
[
  {
    "id": Integer,
    "title": String,
    "rating": Integer,
    "synopsis": String,
    "imageUrl": Integer,
    "genre": String,
    "release_date": String,
  }
]
```

## GET /video/:movieId

### Request:

- `params:`

```json
{
  "movieId": "integer(required)"
}
```

### Response (200 - OK)

```json
[
  {
    "video": String,

  }
]
```

## POST /mymovies

### Request:

- `headers:`

```json
{
  "access_token": String
}
```

- `body:`

```json

  {
    "movieId": Integer,
    "title": String,
    "release_date": String,
    "imageUrl": Integer,
    "UserId": Integer,
  },

```

### Response (201 - OK)

```json
{
    "movieId": Integer,
    "title": String,
    "release_date": String,
    "imageUrl": Integer,
    "UserId": Integer,
}
```

### Response (400 - Bad Request)

```json
{
    "message": "Title is Required"
}
OR
{
    "message": "Release Date is Required"
}
OR
{
    "message": "movieId is Required"
}
OR
{
    "message": "ImageUrl is Required"
}
OR
{
    "message": "UserId is Required"
}
```

## GET /mymovies

### Request:

- `headers:`

```json
{
  "access_token": String
}
```

### Response (200 - OK)

```json
[
  {
    "id": Integer,
    "title": String,
    "release_date": String,
    "UserId": Integer,
    "movieId": Integer,
    "imageUrl": String,
    "createdAt": Date,
    "updatedAt": Date
  }
]
```

## POST /generate-midtrans-token

### Request:

- `headers:`

```json
{
  "access_token": String
}
```

### Response (201 - OK)

```json
{
    "token": String,
    "redirect_url": String,
}
```

## Global Error

### Response (401 - Unauthenticated)

```json
{
  "massage": "Invalid token"
}
```

### Response (500 - Internal Server Error)

```json
{
  "massage": "Internal server error"
}
```
