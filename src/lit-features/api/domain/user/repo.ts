import type { UserAttrs } from './params';

export interface UserRepository {
  getUsers(): UserAttrs[]
  addUser(attrs: Omit<UserAttrs, 'id'>): Promise<number>
  removeUser(id: number): Promise<number>
}
