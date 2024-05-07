import { UserRepository } from "../repository/user";

export class UserService {
  private repo: UserRepository;

  constructor(userRepository: UserRepository) {
    this.repo = userRepository;
  }
}
