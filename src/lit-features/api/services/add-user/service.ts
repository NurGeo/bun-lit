import type { UserAttrs } from '../../domain/user/params';
import { UserRepoImpl } from '../../domain/user/repo-json-impl';

export class AddingUserService {
  async execute(attrs: Omit<UserAttrs, 'id'>): Promise<number> {
    const keys = ['name', 'city', 'age'] as const;
    const attrsKeys = Object.keys(attrs);
    if (
      keys.length === attrsKeys.length
      || keys.every((key) => attrsKeys.includes(key))
      || keys.every((key) => (
        key === 'age'
          ? typeof attrs[key] === 'number'
          : typeof attrs[key] === 'string'
      ))
    ) {
      const userRepo = new UserRepoImpl();
      await userRepo.open();
      return userRepo.addUser(attrs);
    }
    return -1;
  }
}
