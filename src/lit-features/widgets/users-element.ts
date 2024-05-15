import { html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { W3CssElement } from '../shared/ui/w3-css-element';
import type { User } from '../entities/user/attrs';

@customElement('users-element')
export class UsersElement extends W3CssElement {
  @property() users?: User[];

  render() {
    return this.users
      ? html`<fieldset class="w3-border-red">
          <legend>Пользователи:</legend>
            ${this.users?.map((user) => html`
              <div class="w3-padding w3-cell-row">
                <user-element class="w3-cell w3-padding w3-border w3-border-green" style="width: 85%" .user=${user}></user-element>
                <div class="w3-cell w3-center w3-middle w3-padding w3-border w3-border-blue" style="vertical-align:middle">
                  <button class="w3-btn w3-round w3-pale-red">Remove</button>
                </div>
              </div>
            `)}
            <div class="w3-padding w3-cell-row">
              <div class="w3-cell w3-padding" style="width: 85%"></div>
              <div class="w3-cell w3-center w3-middle w3-padding" style="vertical-align:middle">
                <button class="w3-btn w3-round w3-light-green">Add</button>
              </div>
            </div>
        </fieldset>`
      : 'users not found';
  }
}
