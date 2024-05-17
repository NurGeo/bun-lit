import { UserRepoImpl } from '../../domain/user/repo-json-impl';

export class RemovingUserService {
  async execute(userId: number): Promise<number> {
    const userRepo = new UserRepoImpl();
    await userRepo.open();
    return userRepo.removeUser(userId);
  }
}
