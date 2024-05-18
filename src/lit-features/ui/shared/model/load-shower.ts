class LoadShower {
  private loadModal?: HTMLElement;

  show(): void {
    if (this.loadModal === undefined) {
      this.loadModal = document.createElement('loading-modal');
      document.body.appendChild(this.loadModal);
    }
  }

  hide(): void {
    if (this.loadModal) {
      this.loadModal.remove();
      this.loadModal = undefined;
    }
  }
}

export const loadShower = new LoadShower();
