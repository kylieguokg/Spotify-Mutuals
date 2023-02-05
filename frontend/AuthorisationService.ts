import axios from "axios";

const client = axios.create({
    baseURL: "https://accounts.spotify.com"
});

const clientId = process.REACT_APP_SPOTIFY_CLIENT_ID || '';
const clientSecret = process.REACT_APP_SPOTIFY_CLIENT_SECRET;
const redirectUri = 'http://localhost:3000/callback/';

export type AccessToken = {
    access_token: string,
    token_type: string,
    scope: string,
    expires_in: number,
    refresh_token: string
};

console.log(clientSecret);

export const getAccessToken = async (code: string, state: string, abortController: AbortController) => {

    let response = await client.post('/api/token', {
            code,
            redirect_uri: redirectUri,
            grant_type: 'authorization_code', 
            state
    }, {
        headers : {
        'Authorization' : 'Basic ' + ((Buffer.from(clientId + ':' + clientSecret)).toString('base64')),
        'Content-Type' : 'application/x-www-form-urlencoded'
        },
        signal : abortController.signal
    }
    ).catch((err) => {
        return err;
    });

    return response;
};

export const getRefreshAccessToken = async (refresh_token: string) => {
    let response = await client.post('/api/token', {
            refresh_token,
            grant_type: 'refresh_token'
    }, {
        headers : {
        'Authorization' : 'Basic ' + ((Buffer.from(clientId + ':' + clientSecret)).toString('base64')),
        'Content-Type' : 'application/x-www-form-urlencoded'
        }
    }
    );

    return response;
};

const generateRandomString = (length: number) => {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

export const goToSpotifyAuthorisation = () => {
    const scope = 'user-read-private user-read-email';

    const state = generateRandomString(16);

    var url = 'https://accounts.spotify.com/authorize?';

    url += new URLSearchParams({
        response_type: 'code',
        client_id: clientId,
        scope: scope,
        redirect_uri: redirectUri,
        state: state
    });

    window.localStorage.setItem('state', state);
    console.log(state);

    window.location.href = url;
};
