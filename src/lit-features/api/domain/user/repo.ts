import type { UserAttrs } from './params';

export interface UserRepository {
  getUsers(): UserAttrs[]
  addUser(attrs: Omit<UserAttrs, 'id'>): void
}
