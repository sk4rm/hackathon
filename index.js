const express = require('express')
const { ethers } = require('hardhat')
const app = express()
const port = 6969;

app.use(express.json())

// Deploy contract
let Tick3tABI, Tick3t;
(async () => {
  Tick3tABI = await ethers.getContractFactory("Tick3t")
  Tick3t = await Tick3tABI.deploy()
  console.log("Tick3t deployed at:", Tick3t.address)
})()


// Routing

app.get('/', (req, res) => {
  res.json({ endpoints: app._router.stack.map(r => r.route?.path).filter(p => p) })
})


app.post('/events', async (req, res) => {
  // Check for POST parameters
  console.log(req.body)
  if (
    !req.body?.eventName ||
    !req.body?.ticketPrice ||
    !req.body?.ticketsSold ||
    !req.body?.maxTickets ||
    !req.body?.date ||
    !req.body?.time ||
    !req.body?.location ||
    !req.body?.description
  ) {
    res.sendStatus(400)
    return
  }

  const tx = await Tick3t.createEvent(
    req.body.eventName,
    req.body.ticketPrice,
    req.body.ticketsSold,
    req.body.maxTickets,
    req.body.date,
    req.body.time,
    req.body.location,
    req.body.description
  )
  await tx.wait()
  const latestEventID = await Tick3t.numEvents()
  const event = await Tick3t.getEvent(latestEventID)

  res.status(200).json(event)
})


app.get('/events', async (req, res) => {
  const tx = await Tick3t.getAllEvents()
  res.status(200).json(tx)
})


app.get('/events/:id', async (req, res) => {
  const id = req.params.id

  // Check if valid ID (less than numEvents in contract)
  const numEvents = await Tick3t.numEvents()
  if (numEvents <= 0 || numEvents < id) {
    res.sendStatus(404)
    return
  }

  const tx = await Tick3t.getEvent(id)
  res.status(200).json(tx)
})


app.get('/events/:id/attendees', async (req, res) => {
  if (!req.body?.eventID) {
    res.status(400).send('expected eventID')
    return
  }

  const eventID = req.body.eventID

  const numEvents = await Tick3t.numEvents()
  if (numEvents <= 0 || numEvents < eventID) {
    res.sendStatus(404)
    return
  }

  try {
    const attendees = await Tick3t.getAttendees(eventID)
    res.status(200).json(attendees)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "unable to get list of attendees" })
  }
})


app.post('/tickets', async (req, res) => {
  if (!req.body?.eventID || !req.body?.amount || !req.body?.buyer) {
    res.sendStatus(400)
    return
  }

  // const buyer = req.body.buyer
  const eventID = req.body.eventID
  const amount = req.body.amount

  const event = await Tick3t.getEvent(eventID)
  // const totalCost = event.ticketPrice * amount

  try {
    const tx = await Tick3t.purchaseTicket(eventID, amount)
    await tx.wait()
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "an error occured while purchasing tickets (could be not out-of-stock or insufficient funds)" })
  }

  res.sendStatus(200)
})


app.post('/users', async (req, res) => {
  if (!req.body?.address || !req.body?.name || !req.body?.bio || !req.body?.imageURL) {
    res.sendStatus(400)
    return
  }

  const address = req.body.address
  const name = req.body.name
  const bio = req.body.bio
  const imageURL = req.body.imageURL

  try {
    const tx = await Tick3t.createUser(address, name, bio, imageURL)
    await tx.wait()
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "unable to create new user account" })
  }

  res.sendStatus(200)
})


app.get('/users/:address', async (req, res) => {
  const address = req.params.address

  try {
    const tx = await Tick3t.getUser(address)
    res.status(200).json(tx)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "unable to retrieve user information (might or might not exist)" })
  }
})


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})