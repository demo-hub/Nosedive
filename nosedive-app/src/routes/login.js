import fetch from 'node-fetch';

/* const headers = {
    'Content-Type': 'application/json',
    'Authorization': `OAuth oauth_callback="http%3A%2F%2Flocalhost%3A3001", oauth_consumer_key="GOEOymyPCNn6YBnH9RhdbK90O", oauth_nonce="${'id' + (new Date()).getTime()}", oauth_signature_method="HMAC-SHA1", oauth_timestamp="${new Date().getTime()}", oauth_version="1.0"`
} */

const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
};

export async function post(req, res) {
    try {
        const { username, password } = req.body;

        const result = await fetch(`http://localhost:8000/login`, {
            method: "POST",
            headers,
            body: JSON.stringify({ username, password }),
        });

        const parsed = await result.json();

        if (!parsed.jwt) {
            throw new Error(parsed.message);
        }

        req.session.token = parsed.jwt;
        res.end(JSON.stringify({ token: parsed.jwt }));
    } catch (error) {
        res.end(JSON.stringify({ error: error.message }));
    }
}