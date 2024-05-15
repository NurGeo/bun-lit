/* Файл запускает сам сервер. Его также можно назвать server.ts * */
import { join } from 'path';
import { serve } from 'bun';
import { cwd } from 'process';
import { GettingUsersService } from '../lit-features/api/services/get-users/service';

const PORT = 3000;
const distDir = join(cwd(), 'dist');

serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    let path = url.pathname;

    if (path === '/' || path == '/ui-index.js') {
      const filePath = path === '/' ? '/index.html' : path;
      try {
        return new Response(Bun.file(join(distDir, filePath)));
      } catch (error) {
        return new Response('Not Found', { status: 404 });
      }
    }
    if (path === '/users' || path === '/users/') {
      try {
        const service = new GettingUsersService();
        const users = await service.execute();
        return getJsonResponce(users);
      } catch (e) {
        return new Response('Error getting users', { status: 500 });
      }
    }
    return new Response('bad request', { status: 404 });
  },
});

function getJsonResponce(obj: Object): Response {
  const objJson = JSON.stringify(obj);
  return new Response(objJson, { status: 200, headers: { 'Content-Type': 'application/json' } });
}

console.log(`Server is running at http://localhost:${PORT}`);
