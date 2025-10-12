## Verification API

### Base URL

For local development: http://localhost:8001/verify

#### `POST /`

Allow user to verify their credentials
**Request Body:**

```json
{
  "userId": "3f8a3d7b-bb52-4c0e-9c12-18d7ac9a5e1d",
  "credentialSecret": "sample"
}
```

**Response Body:**

- Success (200 OK)

```json
{
  "message": "Issued by user 3f8a3d7b-bb52-4c0e-9c12-18d7ac9a5e1d",
  "status": 201
}
```

- Validation Failed (400 Bad Request)

```json
{
  "message": ["userId must be a UUID"],
  "error": "Bad Request",
  "statusCode": 400
}
```

- Invalid Credentials (400 Bad Request)

```json
{
  "message": "Invalid Credentials"
}
```

- Credentials are not assigned yet (404 Bad Request)

```json
{
  "message": "Credentials not assigned yet"
}
```


- Internal Server Error (500 Internal Server Error)

```json
{
  "message": "Internal Server Error"
}
```
