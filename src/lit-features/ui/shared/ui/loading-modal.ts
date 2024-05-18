import { LitElement, html, css, type HTMLTemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

const styles = css`
  :host {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  .spinner {
    margin: 0 auto;
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #4caf50;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin-bottom: 10px;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .message {
    margin-top: 10px;
    font-size: 16px;
    color: #333;
  }
`;

@customElement('loading-modal')
export class LoadingModal extends LitElement {
  @property({ type: String }) message = '';

  static styles = styles;

  render(): HTMLTemplateResult {
    return html`
      <div class="modal show">
        <div class="spinner"></div>
        ${this.message ? html`<div class="message">${this.message}</div>` : ''}
      </div>
    `;
  }
}
