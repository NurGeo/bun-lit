import { LitElement } from 'lit';
import { copyW3Styles } from '../model/copy-w3-styles';

export class W3CssElement extends LitElement {
  connectedCallback(): void {
    super.connectedCallback();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    copyW3Styles(this.shadowRoot!); // Копируем стили W3.CSS при подключении компонента
  }
}
