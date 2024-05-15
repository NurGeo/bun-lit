/* Элемент пользователя * */
import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { W3CssElement } from '../../shared/ui/w3-css-element';
import { getRandomInt } from '../../shared/model/get-random-int';
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
        <p class="${this.getColour()}">Name: ${this.user?.name}</p>
        <p class="${this.getColour()}">From: ${this.user?.city}</p>
        <p class="${this.getColour()}">Age: ${this.user?.age}</p>
      </div>
    `;
  }

  getColour(): 'w3-green' | 'w3-blue' | 'w3-red' {
    return (['w3-green', 'w3-blue', 'w3-red'] as const)[getRandomInt(0, 3)];
  }
}
