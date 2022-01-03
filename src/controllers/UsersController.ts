import { IsOptional, IsPositive } from "class-validator"
import {
  Body,
  Delete,
  Get,
  JsonController,
  OnUndefined,
  Param,
  Patch,
  Post,
  QueryParams,
} from "routing-controllers"
import { getCustomRepository } from "typeorm"
import { User } from "../entity/User"
import { UserRepository } from "../repositories/UserRepository"

class GetAllUsersQuery {
  @IsOptional()
  @IsPositive()
  limit: number

  @IsOptional()
  @IsPositive()
  offset: number
}

@JsonController()
export class UsersController {
  private repository: UserRepository

  constructor() {
    this.repository = getCustomRepository(UserRepository)
  }

  @Get("/users")
  async getAll(@QueryParams() query: GetAllUsersQuery) {
    return this.repository.findAll(query)
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
