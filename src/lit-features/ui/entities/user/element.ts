/* Элемент пользователя * */
import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { W3CssElement } from '../../shared/ui/w3-css-element';
import { getRandomColor } from '../../shared/model/get-random-int';
import type { UserAttrs } from '../../../api/domain/user/params';

@customElement('user-element')
export class UserElement extends W3CssElement {
  static styles = css`
    :host {
      border: #999;
    }
  `;

  @property()
  private user?: UserAttrs;

  protected render(): unknown {
    return html`
      <div class=" w3-light-grey">
        <p class="${getRandomColor()}">Name: ${this.user?.name}</p>
        <p class="${getRandomColor()}">From: ${this.user?.city}</p>
        <p class="${getRandomColor()}">Age: ${this.user?.age}</p>
      </div>
    `;
  }
}
