// Замена randomInt на собственную реализацию с использованием Web Crypto API
export function getRandomInt(min: number, max: number): number {
  const range = max - min;
  const randomBuffer = new Uint32Array(1);
  crypto.getRandomValues(randomBuffer);
  const randomNumber = randomBuffer[0] / (0xFFFFFFFF + 1);
  return Math.floor(randomNumber * range + min);
}

export function getRandomColor(): 'w3-green' | 'w3-blue' | 'w3-red' {
  return (['w3-green', 'w3-blue', 'w3-red'] as const)[getRandomInt(0, 3)];
}
