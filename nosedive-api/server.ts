import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import {login, auth, guest} from './routes.ts'
import authMiddleware from './authMiddleware.ts';
import * as flags from "https://deno.land/std/flags/mod.ts";

const router = new Router();

router
  .post('/login', login)
  .get('/guest', guest)
  .get('/auth', authMiddleware,  auth) // Registering authMiddleware for /auth endpoint only
  ;

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

router.get('/test', ({response}: {response:any})=>{
  response.body = 'API is working';
});

const {args} = Deno;
const DEFAULT_PORT = 8000;
const argPort = flags.parse(args).port;
const port = argPort ? Number(argPort) : DEFAULT_PORT;

app.listen({port: port});
console.log(`Started on port: ${port}`);