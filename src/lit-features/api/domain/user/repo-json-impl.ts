/* eslint-disable no-underscore-dangle */
import type { UserAttrs } from './params';
import type { UserRepository } from './repo';

export class UserRepoImpl implements UserRepository {
  private _users: UserAttrs[] | undefined;

  private get filePath(): string {
    return `${import.meta.dir}/users.json`;
  }

  private get users(): UserAttrs[] {
    if (this._users === undefined) {
      throw Error('need open db');
    }
    return this._users;
  }

  async open(): Promise<void> {
    if (this._users === undefined) {
      const file = Bun.file(this.filePath);
      this._users = await file.json();
    }
  }

  getUsers(): UserAttrs[] {
    return this.users;
  }

  async addUser(attrs: Omit<UserAttrs, 'id'>): Promise<number> {
    const newId = this.users[this.users.length - 1].id + 1;
    if (this.users.find((user) => user.id === newId)) {
      // eslint-disable-next-line no-console
      console.log('ERROR: user id calculated error');
      return -1;
    }
    this.users.push({
      id: this.users[this.users.length - 1].id + 1,
      ...attrs,
    });
    await this.saveToFile();
    return newId;
  }

  async removeUser(id: number): Promise<number> {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      this.users.splice(userIndex, 1);
      this.saveToFile();
      return id;
    }
    return -1;
  }

  protected async saveToFile(): Promise<number> {
    const usersAsJson = JSON.stringify(this.users, null, 2);
    return Bun.write(this.filePath, usersAsJson);
  }
}
