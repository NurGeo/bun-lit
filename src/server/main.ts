/* Файл запускает сам сервер. Его также можно назвать server.ts * */
import { join } from 'path';
import { serve } from 'bun';
import { cwd } from 'process';
import { GettingUsersService } from '../lit-features/api/services/get-users/service';
import { RemovingUserService } from '../lit-features/api/services/remove-user/service';
import { AddingUserService } from '../lit-features/api/services/add-user/service';

const PORT = 3000;
const distDir = join(cwd(), 'dist');

serve({
  port: PORT,
  async fetch(req) {
    if (req.method === 'GET') return log(req, await get(req));
    if (req.method === 'DELETE') return log(req, await remove(req));
    if (req.method === 'POST') return log(req, await post(req));
    return getJsonResponce('Bad request', 404);
  },
});

async function get(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const path = url.pathname;

  if (path === '/' || path == '/ui-index.js' || path === '/favicon.ico') {
    const filePath = path === '/' ? '/index.html' : path;
    try {
      return new Response(Bun.file(join(distDir, filePath)));
    } catch (e) {
      console.log(e);
      return new Response('Not Found', { status: 404 });
    }
  }
  if (isUsersPath(path)) {
    try {
      const service = new GettingUsersService();
      const users = await service.execute();
      return getJsonResponce(users, 200);
    } catch (e) {
      console.log(e);
      return getJsonResponce('Error getting users', 500);
    }
  }
  return getJsonResponce('Bad request', 404);
}

async function post(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const path = url.pathname;

  if (isUsersPath(path)) {
    try {
      const attrs = await req.json();
      const service = new AddingUserService();
      const result = await service.execute(attrs);
      if (result !== -1) {
        return getJsonResponce(`user successfully added`, 200);
      }
      return getJsonResponce('validation error', 400);
    } catch (e) {
      console.log(e);
      return getJsonResponce('Error adding user', 500);
    }
  }
  return getJsonResponce('Bad request', 404);
}

async function remove(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const path = url.pathname;

  if (isUserPath(path)) {
    try {
      const id = getUserId(path);
      const service = new RemovingUserService();
      const result = await service.execute(Number(id));
      if (result !== -1) {
        return getJsonResponce(`user by id ${id} successfully removed`, 200);
      }
      return getJsonResponce(`fail to remove user`, 400);
    } catch (e) {
      console.log(e);
      return getJsonResponce('Error removing user', 500);
    }
  }
  return getJsonResponce('Bad request', 404);
}

function log(req: Request, resp: Response): Response {
  const date = `${new Date().toLocaleString()}:  `;
  const method = `${req.method}:`.padEnd(8)
  const path = `${new URL(req.url).pathname}:`.padEnd(18);
  console.log(`${date}${method}${path}${resp.status}`);
  return resp;
}

function isUserPath(path: string): boolean {
  const userIdRegex = /^\/api\/users\/(\d+)(?:\/)?$/;
  return userIdRegex.test(path);
}

function isUsersPath(path: string): boolean {
  const usersRegex = /^\/api\/users(?:\/)?$/;
  return usersRegex.test(path);
}

function getUserId(path: string): number {
  return Number(path.split('/')[3]);
}

function getJsonResponce(obj: Object, status: number): Response {
  const objJson = JSON.stringify(obj);
  return new Response(objJson, { status, headers: { 'Content-Type': 'application/json' } });
}

console.log(`Server is running at http://localhost:${PORT}`);
