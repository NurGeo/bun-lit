// Замена randomInt на собственную реализацию с использованием Web Crypto API
export function getRandomInt(min: number, max: number) {
  const range = max - min;
  const randomBuffer = new Uint32Array(1);
  crypto.getRandomValues(randomBuffer);
  const randomNumber = randomBuffer[0] / (0xFFFFFFFF + 1);
  return Math.floor(randomNumber * range + min);
}
