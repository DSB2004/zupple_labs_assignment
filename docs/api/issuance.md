## Issuance API

### Base URL

For local development: http://localhost:8000/issuance

#### `POST /`

Allow user to create new credentials
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

- Credentials already issued (400 Bad Request)

```json
{
  "message": "Credential have been already issued for this userId"
}
```

- Internal Server Error (500 Internal Server Error)

```json
{
  "message": "Internal Server Error"
}
```
