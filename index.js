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


// app.get('/events', async (req, res) => {
//   const tx = await Tick3t.getAllEvents()
//   res.status(200).json(tx)
// })


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


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})