import { LitElement, html, css, type HTMLTemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { loadShower } from '../shared/model/load-shower';

const styles = css`
    .modal {
      display: none;
      position: fixed;
      z-index: 1;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgba(0,0,0,0.4);
    }

    .modal-content {
      background-color: #fefefe;
      margin: 15% auto;
      padding: 20px;
      border: 1px solid #888;
      width: 80%;
      max-width: 400px;
    }

    .close {
      color: #aaa;
      float: right;
      font-size: 28px;
      font-weight: bold;
    }

    .close:hover,
    .close:focus {
      color: black;
      text-decoration: none;
      cursor: pointer;
    }

    .modal[open] {
      display: block;
    }

    .form-container {
      padding: 16px;
      border-radius: 8px;
      background-color: #f9f9f9;
    }

    .form-field {
      margin-bottom: 16px;
    }
  `;

@customElement('add-user-form')
export class AddUserFormElement extends LitElement {
  static styles = styles;

  @property({ type: String }) name = '';

  @property({ type: String }) city = '';

  @property({ type: Number }) age = 0;

  @property({ type: Boolean, reflect: true }) open = false;

  render(): HTMLTemplateResult {
    return html`
      <div class="modal" ?open="${this.open}">
        <div class="modal-content w3-card-4">
          <span class="close" @click="${this.closeModal}">&times;</span>
          <div class="form-container w3-padding">
            <h2 class="w3-center">Добавить пользователя</h2>
            <form @submit="${this.handleSubmit}" class="w3-container">
              <div class="form-field w3-margin-bottom">
                <label class="w3-text-gray">Name:</label>
                <input
                  class="w3-input w3-border w3-focus"
                  type="text" .value="${this.name}"
                  @input="${this.handleInput('name')}" required
                >
              </div>
              <div class="form-field w3-margin-bottom">
                <label class="w3-text-gray">City:</label>
                <input
                  class="w3-input w3-border"
                  type="text" .value="${this.city}"
                  @input="${this.handleInput('city')}" required
                >
              </div>
              <div class="form-field w3-margin-bottom">
                <label class="w3-text-gray">Age:</label>
                <input
                  class="w3-input w3-border"
                  type="number" .value="${this.age}"
                  @input="${this.handleInput('age')}" required
                >
              </div>
              <button class="w3-button w3-blue w3-block" type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    `;
  }

  handleInput(field: 'name' | 'city' | 'age') {
    return (e: Event): void => {
      const { value } = (e.target as HTMLInputElement);
      // @ts-ignore
      this[field] = field === 'age'
        ? Number(value)
        : value;
    };
  }

  async handleSubmit(e: Event): Promise<void> {
    e.preventDefault();
    const userData = {
      name: this.name,
      city: this.city,
      age: this.age,
    };
    loadShower.show();
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const result = await res.json();
    loadShower.hide();
    if (res.ok) {
      this.dispatchEvent(new CustomEvent('user-added', {
        detail: { id: result, ...userData },
      }));
    } else {
      // eslint-disable-next-line no-alert
      alert(result);
    }
    this.closeModal();
  }

  closeModal(): void {
    this.open = false;
  }

  openModal(): void {
    this.open = true;
  }
}
