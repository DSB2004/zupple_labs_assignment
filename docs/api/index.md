# API Documentation

This document outlines the available API endpoints and expected request/response structures

---

## API Status Codes Reference

This section explains common HTTP status codes used across the backend.

| Status Code          | Meaning              | Description                                                                   |
| -------------------- | -------------------- | ----------------------------------------------------------------------------- |
| **200 OK**           | Success              | The request was processed successfully and a valid response is returned.      |
| **201 Created**      | Resource Created     | The request was successful and a new resource has been created.               |
| **400 Bad Request**  | Invalid Input        | The request is malformed or required fields are missing/invalid.              |
| **401 Unauthorized** | Access Token Expired | Authentication failed due to missing or expired access token.                 |
| **403 Forbidden**    | Access Denied        | The request is understood but not allowed. The user lacks proper permissions. |

## Know More

- [Issuance API Documentation](./issuance.md)
- [Verification API Documentation](./verification.md)
