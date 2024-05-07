import { UserRepository } from "../repository/user";
import {encrypt} from "../lib/encryption";

export class UserService {
  private repo: UserRepository;

  constructor(userRepository: UserRepository) {
    this.repo = userRepository;

    this.create = this.create.bind(this);
    this.findByEmail = this.findByEmail.bind(this);
  }

  public async create(name: string, email: string, password: string) {
    const hashedPassword = encrypt(password);
    await this.repo.create({
      name,
      email,
      password: hashedPassword,
    });
  }

  public async findByEmail(email: string) {
    return this.repo.findByEmail(email);
  }
}
