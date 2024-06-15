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

### GET /events

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

### GET /events/:id/attendees

Description:

Fetches the list of attendees (wallet addresses) for a given event.

Example:

```bash
curl -X GET localhost:6969/events/1/attendees
```

Returns:

```json
[
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
]
```


### POST /tickets

Description:

Purchases a ticket to an event.

Parameters:

```json
{
    "eventID": 1,
    "amount": 2,
    "buyer": "0xcE2754e204b5c78D2dc34bA93A57c22B60A8F5CC"
}
```

Example:

```bash
curl -H "Content-Type: application/json" \
     -d '{"eventID": 1, "amount": 2, "buyer": "0xcE2754e204b5c78D2dc34bA93A57c22B60A8F5CC"}' \
     -X POST \
     localhost:6969/events
```

Returns:

None if successful. HTTP 400/404 otherwise (if invalid request body or invalid eventID does not exist).

### POST /users

Description:

Creates a new user with the specified wallet address.

Example:

```bash
curl -H "Content-Type: application/json" \
     -d '{"address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", "name": "Susan", "bio":  "sunshine and rainbows :)", "imageURL": "https://example.com"}' \
     -X POST \
     localhost:6969/events
```

Returns:

None

### GET /users/:address

Example:

```bash
curl -X GET localhost:6969/users/0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
```

Returns:

```json
[
    "Susan",
    "sunshine and rainbows :)",
    "https://example.com"
]
```


## TODO

- [/] add try-catch blocks with meaningful errors
- [x] get list of attendees given eventID
- [ ] be able to show proof of ticket purchase (how?)
- [ ] prevent dupes from showing up in list of attendees
- [x] POST /users
- [x] GET /users/:id
- [ ] POST /messages
- [ ] GET /messages/:userID