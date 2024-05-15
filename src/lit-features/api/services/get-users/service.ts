import type { UserAttrs } from "../../domain/user/params";
import { UserRepoImpl } from "../../domain/user/repo-json-impl"

export class GettingUsersService {
  execute(): UserAttrs[] {
    const repo = new UserRepoImpl();
    repo.open();
    return repo.getUsers();
  }
}
