/* Компонент группы пользователей получаемых с бекенда * */
import { html, type HTMLTemplateResult } from 'lit';
import { property, customElement, query } from 'lit/decorators.js';
import { W3CssElement } from '../shared/ui/w3-css-element';
import type { UserAttrs } from '../../api/domain/user/params';
import { loadShower } from '../shared/model/load-shower';
import type { AddUserFormElement } from '../features/add-user';

@customElement('users-widget')
export class UsersWidget extends W3CssElement {
  @property({ type: Array }) users: UserAttrs[] = [];

  @query('add-user-form')
  private addUserForm!: AddUserFormElement;

  render(): HTMLTemplateResult {
    return html`<fieldset class="w3-border-red">
        <legend>Пользователи:</legend>
          ${this.users?.map((user) => html`
            <div class="w3-padding w3-cell-row">
              <user-element
                class="w3-cell w3-padding w3-border w3-border-green"
                style="width: 85%" .user=${user}
              ></user-element>
              <div
                class="w3-cell w3-center w3-middle w3-padding w3-border w3-border-blue"
                style="vertical-align:middle"
              >
                <button
                  class="w3-btn w3-round w3-pale-red"
                  @click=${(): Promise<void> => this.removeUser(user.id)}
                >Remove</button>
              </div>
            </div>
          `)}
          <div class="w3-padding w3-right">
            <button
              class="w3-btn w3-round w3-light-green"
              @click=${this.openAddUserForm}
            >Add</button>
          </div>
      </fieldset>
      <!-- Привязка обработчика события 'user-added' к методу 'handleUserAdded' -->
      <add-user-form @user-added="${this.handleUserAdded}"></add-user-form>
    `;
  }

  private openAddUserForm(): void {
    this.addUserForm.openModal();
  }

  private handleUserAdded(event: CustomEvent<UserAttrs>): void {
    const newUser = event.detail;
    this.users = [...this.users, newUser];
  }

  private async removeUser(id: number): Promise<void> {
    loadShower.show();
    const response = await fetch(`/api/users/${id}`, { method: 'DELETE' });
    loadShower.hide();
    if (response.ok) {
      this.users = this.users.filter((user) => user.id !== id);
    } else {
      throw Error(`Filed to remove user by id: ${id}`);
    }
  }
}
