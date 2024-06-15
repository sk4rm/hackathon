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
  if (!req.body?.eventName || !req.body?.ticketPrice) {
    res.sendStatus(400)
    return
  }

  const tx = await Tick3t.createEvent("hackathon", 69)
  await tx.wait()
  const latestEventID = await Tick3t.numEvents()
  const event = await Tick3t.getEvent(latestEventID)

  res.status(200).json(event)
})


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})