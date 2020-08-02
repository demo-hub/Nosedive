import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';
import session from 'express-session';
import sessionFileStore from 'session-file-store';

const app = express();

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const FileStore = new sessionFileStore(session);

app.use(express.urlencoded());
app.use(express.json());

app.use(
        session({
            secret: 'SomeSecretStringThatIsNotInGithub',
            resave: true,
            saveUninitialized: true,
            cookie: {
                maxAge: 31536000
            },
            store: new FileStore({
                path: `.sessions`
            })
        }),
        compression({ threshold: 0 }),
        sirv('static', { dev }),
        sapper.middleware({
            session: (req, res) => {
                return ({
                    token: req.session.token
                })
            }
        })
    )
    .listen(PORT, err => {
        if (err) console.log('error', err);
    });