import {
  Body,
  Delete,
  Get,
  JsonController,
  OnUndefined,
  Param,
  Patch,
  Post,
  QueryParam,
} from "routing-controllers"
import { getCustomRepository } from "typeorm"
import { User } from "../entity/User"
import { UserRepository } from "../repositories/UserRepository"

@JsonController()
export class UsersController {
  private repository: UserRepository

  constructor() {
    this.repository = getCustomRepository(UserRepository)
  }

  @Get("/users")
  async getAll(@QueryParam("limit") limit: number) {
    return this.repository.findAll({ limit })
  }

  @Get("/users/:id")
  @OnUndefined(404)
  getOne(@Param("id") id: number) {
    return this.repository.findOne(id)
  }

  @Post("/users")
  post(@Body() user: User) {
    return this.repository.insert(user)
  }

  @Patch("/users/:id")
  patch(@Param("id") id: number, @Body() user: User) {
    return this.repository.update(id, user)
  }

  @Delete("/users/:id")
  remove(@Param("id") id: number) {
    return this.repository.delete({ id })
  }
}
