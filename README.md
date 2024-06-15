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
    "eventName": "hackathon",
    "ticketPrice": 69, // in A0GI
    "ticketsSold": 1,
    "maxTickets": 100,
    "date": "2024-06-16",
    "time": "13:00 PDT",
    "location": "JJ Lakes Business Center",
    "description": "A great learning experience!"
}
```

### GET /events/:id

Description:

Fetches a single event's details.

Example:

```bash
curl -X GET localhost:6969/events/1
```

Returns:

```json
{
    "eventName": "hackathon",
    "ticketPrice": 69, // in A0GI
    "ticketsSold": 1,
    "maxTickets": 100,
    "date": "2024-06-16",
    "time": "13:00 PDT",
    "location": "JJ Lakes Business Center",
    "description": "A great learning experience!"
}
```

If the `id` does not exist, a HTTP 404 status code is returned.

### GET /events/:id

Description:

Fetches details of all events.

Example:

```bash
curl -X GET localhost:6969/events
```

Returns:

```json
[
    {
        "eventName": "hackathon",
        "ticketPrice": 69, // in A0GI
        "ticketsSold": 1,
        "maxTickets": 100,
        "date": "2024-06-16",
        "time": "13:00 PDT",
        "location": "JJ Lakes Business Center",
        "description": "A great learning experience!"
    },
    {
        "eventName": "party",
        "ticketPrice": 0, // in A0GI
        "ticketsSold": 50,
        "maxTickets": 100,
        "date": "2024-06-17",
        "time": "10:30 PST",
        "location": "JJ Lakes Business Center",
        "description": "A great partying experience!"
    },
]
```

If there are no events, an empty list is returned.

### POST /tickets

Description:

TODO

## TODO

- [ ] add try-catch blocks with meaningful errors
- [ ] get list of attendees given eventID
- [ ] be able to show proof of ticket purchase (how?)