/* Файл запускает сам сервер. Его также можно назвать server.ts **/
import { join } from 'path';
import { serve } from 'bun';
import { cwd } from 'process';

const PORT = 3000;
const distDir = join(cwd(), 'dist');

serve({
  port: PORT,
  fetch(req) {
    const url = new URL(req.url);
    let path = url.pathname;

    if (path === '/') {
      path = '/index.html';
    }
    console.log(join(distDir, path))

    try {
      return new Response(Bun.file(join(distDir, path)));
    } catch (error) {
      return new Response('Not Found', { status: 404 });
    }
  },
});

console.log(`Server is running at http://localhost:${PORT}`);
