import { eq } from 'drizzle-orm';
import { userTable } from '../../schema/schema';
import { db, NewUser } from '../lib/database';

export class UserRepository {
  constructor() {}

  public async create(user: NewUser) {
    return db.insert(userTable).values(user);
  }

  public async find(id: number) {
    return db.query.userTable.findFirst({
      where: eq(userTable.id, id),
    });
  }

  public async findByEmail(email: string) {
    return db.query.userTable.findFirst({
      where: eq(userTable.email, email),
    });
  }
}
