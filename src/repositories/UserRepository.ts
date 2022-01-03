import { EntityRepository, Repository } from "typeorm"
import { User } from "../entity/User"

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findAll({ limit, offset }) {
    const users = await this.createQueryBuilder()
      .limit(limit)
      .offset(offset)
      .getMany()
    return users.map((user) => ({ ...user, link: `/users/${user.id}` }))
  }
}
