## Setup and run Express project

```
npm install
node index.js
```

## 0G project
https://github.com/0glabs/0g-ts-sdk

## API Endpoints

### POST /events

Description:

Creates a new event in the blockchain.

Example:

```bash
curl -H "Content-Type: application/json" \
     -d '{"eventName": "hackathon 2024", "ticketPrice": 1}' \
     -X POST \
     localhost:6969/events
```

Parameters:

```json
{
    "eventName": "hackathon 2024",
    "ticketPrice": 1 // in A0GI
}
```

Returns:

```json
{
    "id": 69,
    "name": "hackathon 2024",
    "ticketPrice": 1 // in A0GI
}
```

### GET /events/:id

Description:

Fetches the event details.

Example:

```bash
curl -X GET localhost:6969/events/1
```

Returns:

```json
{
    "id": 1,
    "name": "hackathon 2024",
    "ticketPrice": 1 // in A0GI
}
```

If the `id` does not exist, a HTTP 404 status code is returned.