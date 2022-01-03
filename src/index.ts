import "reflect-metadata"
import { createConnection } from "typeorm"
import { createExpressServer } from "routing-controllers"
import { UsersController } from "./controllers/UsersController"

const port = process.env.PORT || 8000

createConnection()
  .then(async (connection) => {
    console.log("Connected. Now run express app")
    createExpressServer({
      controllers: [UsersController],
    }).listen(port)
    console.log(`Server is up and running on port ${port}`)
  })
  .catch((err) => {
    console.log("Error:", err)
  })
