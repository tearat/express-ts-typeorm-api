import "reflect-metadata"
import { createConnection, getRepository } from "typeorm"
import { User } from "./entity/User"
import express from "express"

createConnection().then(async (connection) => {
  const app = express()
  app.get("/", async (req, res) => {
    const users = await User.all()
    return res.send(users)
  })
  app.get("/:id(\\d+)/", async (req, res) => {
    const id: number = parseInt(req.params.id)
    const user = await User.findOne({ id })
    return res.send(user)
  })
  app.get("/add", async (req, res) => {
    const { name = "Anonymous", age = 10 } = req.query as any
    await User.create({
      name,
      age,
    }).save()
    return res.send({ status: `Created` })
  })
  const port = process.env.PORT || 8000
  app
    .listen(port, () => console.log(`>>> Server starts (port ${port})`))
    .on("error", (error) => console.warn(error))
})
