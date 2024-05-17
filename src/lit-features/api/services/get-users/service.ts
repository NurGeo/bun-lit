import type { UserAttrs } from '../../domain/user/params';
import { UserRepoImpl } from '../../domain/user/repo-json-impl';

export class GettingUsersService {
  async execute(): Promise<UserAttrs[]> {
    const repo = new UserRepoImpl();
    await repo.open();
    return repo.getUsers();
  }
}
