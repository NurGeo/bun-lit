let w3StyleElement: HTMLLinkElement | null = null;

export function copyW3Styles(shadowRoot: ShadowRoot) {
  if (!w3StyleElement) {
    const originalStyleElement = document.querySelector('#w3-styles');
    if (originalStyleElement) {
      w3StyleElement = originalStyleElement.cloneNode(true) as HTMLLinkElement;
    } else {
      console.error('W3.CSS styles not found');
      return;
    }
  }
  
  // Клонируем элемент стиля и добавляем его в Shadow DOM
  shadowRoot.appendChild(w3StyleElement.cloneNode(true));
}
