import type { UserAttrs } from './params';
import type { UserRepository } from './repo';

export class UserRepoImpl implements UserRepository {
  private _users: UserAttrs[] | undefined;

  private get users(): UserAttrs[] {
    if (this._users === undefined) {
      throw Error('need open db');
    }
    return this._users;
  }

  async open() {
    const path = import.meta.dir + '/users.json';
    const file = Bun.file(path);
    this._users = await file.json();
  }

  getUsers(): UserAttrs[] {
    return this.users;
  }

  addUser(attrs: Omit<UserAttrs, 'id'>): void {
    this.users.push({
      id: this.users[this.users.length - 1].id + 1,
      ...attrs,
    });
  }
}
