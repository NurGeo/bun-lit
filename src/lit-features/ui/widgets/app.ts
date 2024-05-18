/* eslint-disable no-underscore-dangle */
/** Главный компонент приложения. С него начинается компоноваться все приложение. */
import { html, css, type HTMLTemplateResult } from 'lit';
import { Task, TaskStatus } from '@lit/task';
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

  private loadWhiteStatus: Array<number> = [TaskStatus.INITIAL, TaskStatus.PENDING];

  @property({ type: Array })
  private users: UserAttrs[] = [];

  _getUsersTask = new Task(this, {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, no-empty-pattern
    task: async ([], { signal }) => {
      const response = await fetch('/api/users', { signal });
      if (!response.ok) { throw new Error(String(response.status)); }
      return response.json();
    },
    args: (): [] => [],
    onComplete: (users: UserAttrs[]): void => {
      this.users = users;
    },
  });

  connectedCallback(): void {
    super.connectedCallback();
    this._getUsersTask.run();
  }

  render(): HTMLTemplateResult {
    return this.loadWhiteStatus.includes(this._getUsersTask.status)
      ? html`<loading-modal message="Загрузка"></loading-modal>`
      : this.users.length === 0
        ? html`<h2>Нет пользователей</h2>`
        : html`
          <h2>Hello, ${this.users[getRandomInt(0, this.users.length)].name}!!!</h2>
          <users-widget .users=${this.users}></users-widget>
        `;
  }
}
