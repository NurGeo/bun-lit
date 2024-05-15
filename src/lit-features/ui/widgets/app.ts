/** Главный компонент приложения. С него начинается компоноваться все приложение. */
import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { W3CssElement } from '../shared/ui/w3-css-element';
import type { User } from '../entities/user/attrs';
import { getRandomInt } from '../shared/model/get-random-int';

@customElement('app-widget')
export class AppWidget extends W3CssElement {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
      color: var(--my-element-text-color, black);
    }
  `;

  users: User[] = [
    { name: 'Bill', city: 'Vermont', age: 33 },
    { name: 'Jack', city: 'Washington', age: 54 },
    { name: 'Nurbolat', city: 'Uralsk', age: 45 },
  ];

  render() {
    return html`
      <h2>Hello, ${this.users[getRandomInt(0, 3)].name}!!!</h2>
      <users-widget .users=${this.users}></users-widget>
    `;
  }
}
