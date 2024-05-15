/** Главный компонент приложения. С него начинается компоноваться все приложение. */
import { html, css } from 'lit';
import { Task } from '@lit/task';
import { customElement, property } from 'lit/decorators.js';
import { W3CssElement } from '../shared/ui/w3-css-element';
import { getRandomInt } from '../shared/model/get-random-int';
import type { UserAttrs } from '../../api/domain/user/params';

@customElement('app-widget')
export class AppWidget extends W3CssElement {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
      color: var(--my-element-text-color, black);
    }
  `;

  @property()
  private users: UserAttrs[] = [];

  _getUsersTask = new Task(this, {
    task: async ([], { signal }) => {
      const response = await fetch('http://localhost:3000/users', { signal });
      if (!response.ok) { throw new Error(String(response.status)); }
      return response.json();
    },
    args: () => [],
  });

  render() {
    return this._getUsersTask.render({
      pending: () => html`<p>App loading...</p>`,
      complete: (users) => {
        this.users = users;
        return html`
          <h2>Hello, ${this.users[getRandomInt(0, 3)].name}!!!</h2>
          <users-widget .users=${this.users}></users-widget>
        `
      },
      error: (e) => html`<p>Error: ${e}</p>`
    });
  }

  render_() {
    return ;
  }
}
