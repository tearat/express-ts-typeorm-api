import { EntityRepository, Repository } from "typeorm"
import { User } from "../entity/User"

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findAll({ limit }) {
    const users = await this.createQueryBuilder().limit(limit).getMany()
    return users.map((user) => ({ ...user, link: `/users/${user.id}` }))
  }
}
