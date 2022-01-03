import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Patch,
  Post,
} from "routing-controllers"
import { getConnectionManager, Repository } from "typeorm"
import { User } from "../entity/User"

@JsonController()
export class UsersController {
  private userRepository: Repository<User>

  constructor() {
    this.userRepository = getConnectionManager().get().getRepository(User)
  }

  @Get("/users")
  getAll() {
    return this.userRepository.find()
  }

  @Get("/users/:id")
  getOne(@Param("id") id: number) {
    return this.userRepository.findOne(id)
  }

  @Post("/users")
  post(@Body() user: User) {
    return this.userRepository.insert(user)
  }

  @Patch("/users/:id")
  patch(@Param("id") id: number, @Body() user: User) {
    return this.userRepository.save({ id, ...user })
  }

  // Another way
  // @Patch("/users")
  // patch(@Body() user1: User, @Body() user2: User) {
  //   return this.userRepository.save([user1, user2])
  // }

  @Delete("/users/:id")
  delete(@Param("id") id: number) {
    return this.userRepository.delete({ id })
  }
}
